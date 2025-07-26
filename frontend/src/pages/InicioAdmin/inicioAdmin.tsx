import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {getCookie} from '../../utils/cookies';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
    Search, User, Plus, ChevronDown, ChevronUp, Pencil,
    UserRoundMinus
} from 'lucide-react';

import {getDashboardConfig} from '../../components/sidebar/sidebar';
import MenuDesplegable from '../../components/menuDesplegable/menu';

import './inicioAdmin.css';
import ModalAgregarUsuario from '../../components/admin/Usuarios/agregarUsuario';
import ModalEditarUsuario from '../../components/admin/Usuarios/editarUsuario';
import Asignaturas from '../../components/admin/materias/materias';
import Paralelos from '../../components/admin/Paralelos/paralelo';
import Ciclos from '../../components/admin/Ciclos/ciclos';
import PeriodosManager from '../../components/admin/Ciclos/periodoCiclo';

type UIUser = {
    id: number;
    name: string;
    lastname: string;
    email: string;
    role: string;
    status?: string;
    phone?: string;
    birthdate?: string;
};

    const AdminInterface: React.FC = () => {
        const navigate = useNavigate();

        const [activeMenuItem, setActiveMenuItem] = useState<'users' | 'subjects' | 'parallels' | 'cicles' | 'periods' | 'settings'>('users');
        const [searchQuery, setSearchQuery] = useState('');
        const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
        const [openDropdowns, setOpenDropdowns] = useState<Record<number, boolean>>({});
        const [closingDropdowns, setClosingDropdowns] = useState<Record<number, boolean>>({});
        const [addModal, setAddModal] = useState(false);
        const [newUser, setNewUser] = useState({
            name: '', lastname: '', email: '', role: '',
            status: '', phone: '', birthdate: ''
        });
        const [editModal, setEditModal] = useState<{ isOpen: boolean; user: UIUser | null }>({
            isOpen: false,
            user: null
        });
        const [users, setUsers] = useState<UIUser[]>([]);

        const handleLogout = () => {
            localStorage.clear();
            navigate('/');
        };

        useEffect(() => {
            const fetchUsers = async () => {
                try {
                    await axios.get('http://127.0.0.1:8000/api/tareas/csrf-cookie/', {withCredentials: true}).catch(() => {
                    });
                    const res = await axios.get('http://127.0.0.1:8000/api/tareas/users/', {
                        withCredentials: true
                    });

                    const formatted: UIUser[] = res.data.map((u: any) => ({
                        id: u.id,
                        name: u.nombre,
                        lastname: u.apellido,
                        email: u.correo,
                        role: u.rol,
                        status: '-',      // no vienen en tu serializer
                        phone: '-',       // idem
                        birthdate: '-'    // idem
                    }));
                    setUsers(formatted);
                } catch (e) {
                    console.error('Error al cargar usuarios:', e);
                }
            };

            fetchUsers();
        }, []);

        const toggleDropdown = (userId: number) => {
            setOpenDropdowns(prev => ({...prev, [userId]: true}));
            setClosingDropdowns(prev => ({...prev, [userId]: false}));
        };

        const toggleDropup = (userId: number) => {
            setClosingDropdowns(prev => ({...prev, [userId]: true}));
            setTimeout(() => {
                setOpenDropdowns(prev => ({...prev, [userId]: false}));
                setClosingDropdowns(prev => ({...prev, [userId]: false}));
            }, 100);
        };

        const handleUserSelection = (userId: number) => {
            setSelectedUsers(prev => prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]);
        };

        const handleSelectAll = () => {
            setSelectedUsers(selectedUsers.length === users.length ? [] : users.map(u => u.id));
        };

        const handleEditUser = (user: UIUser) => {
            setEditModal({isOpen: true, user: {...user}});
        };

        const handleCloseEditModal = () => setEditModal({isOpen: false, user: null});

        const handleInputChange = (field: string, value: string) => {
            setEditModal(prev => ({
                ...prev,
                user: prev.user ? {...prev.user, [field]: value} : prev.user
            }));
        };

        const renderUsersContent = () => (
            <div className="content-card">
                <div className="card-header">
                    <div className="card-header-content">
                        <div className="header-table-actions">
                            <div className="search-container">
                                <Search className="search-icon"/>
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    className="search-input"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button className="primary-button add-user-button" onClick={() => setAddModal(true)}>
                                <Plus className="w-4 h-4"/> Agregar Usuario
                            </button>
                        </div>
                    </div>
                </div>

                <div className="table-container">
                    <table className="user-table">
                        <thead className="table-header">
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.length === users.length}
                                    onChange={handleSelectAll}
                                    className="checkbox"
                                />
                            </th>
                            <th>Nombres Completos</th>
                            <th>Correo Institucional</th>
                            <th>Rol</th>
                            <th>Ciclo</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody className="table-body">
                        {users.map(user => (
                            <React.Fragment key={user.id}>
                                <tr className="table-row">
                                    <td className="table-cell">
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={() => handleUserSelection(user.id)}
                                            className="checkbox"
                                        />
                                    </td>
                                    <td className="table-cell user-name">{user.name} {user.lastname}</td>
                                    <td className="table-cell user-email">{user.email}</td>
                                    <td className="table-cell user-role">{user.role}</td>
                                    <td className="table-cell user-status">{user.status}</td>
                                    <td className="table-cell">
                                        <button
                                            className="user-profile-button"
                                            onClick={() => openDropdowns[user.id] ? toggleDropup(user.id) : toggleDropdown(user.id)}
                                        >
                                            {openDropdowns[user.id] ? <ChevronUp className="w-4 h-4"/> :
                                                <ChevronDown className="w-4 h-4"/>}
                                        </button>
                                    </td>
                                </tr>

                                {openDropdowns[user.id] && (
                                    <tr className="expanded-row">
                                        <td colSpan={6} className="expanded-cell">
                                            <div
                                                className={`dropdown-card-inline ${closingDropdowns[user.id] ? 'closing' : ''}`}>
                                                <div className="dropdown-header">
                                                    <div className="user-avatar-large">
                                                        <span className="element-symbol">User Photo</span>
                                                    </div>
                                                    <div className="user-details-single">
                                                        <h3 className="user-full-name-dropdown">{user.name} {user.lastname}</h3>
                                                        <div className="user-info-grid">
                                                            <p className="user-email-dropdown"><span
                                                                className="label">Correo: </span>{user.email}</p>
                                                            <p className="user-role-dropdown"><span
                                                                className="label">Rol: </span>{user.role}</p>
                                                            <p className="user-cycle-dropdown"><span
                                                                className="label">Ciclo: </span>{user.status}</p>
                                                            <p className="user-phone-dropdown"><span
                                                                className="label">Teléfono: </span>{user.phone}</p>
                                                            <p className="user-birthdate-dropdown"><span
                                                                className="label">Nacimiento: </span>{user.birthdate}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="dropdown-content">
                                                    <button className="primary-button edit-user-btn"
                                                            onClick={() => handleEditUser(user)}>
                                                        <Pencil className="w-4 h-4"/> Editar
                                                    </button>
                                                    <button className="primary-button unsubscribe-user-btn">
                                                        <UserRoundMinus className="w-4 h-4"/> Dar de baja
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );

        const getPageTitle = () => {
            switch (activeMenuItem) {
                case 'users':
                    return 'Gestor de Usuarios';
                case 'subjects':
                    return 'Gestor de Asignaturas';
                case 'parallels':
                    return 'Gestor de Paralelos';
                case 'cicles':
                    return 'Gestor de Ciclos';
                case 'periods':
                    return 'Gestor de Períodos';
                case 'settings':
                    return 'Configuración';
                default:
                    return 'Panel de Administración';
            }
        };

        const renderMainContent = () => {
            switch (activeMenuItem) {
                case 'users':
                    return renderUsersContent();
                case 'subjects':
                    return <Asignaturas/>;
                case 'parallels':
                    return <Paralelos/>;
                case 'cicles':
                    return <Ciclos/>;
                case 'periods':
                    return <PeriodosManager/>;
                case 'settings':
                    return (
                        <div className="content-card">
                            <div className="card-header">
                                <div className="card-header-content">
                                    <h2>Configuración</h2>
                                    <p>Configuración general del sistema.</p>
                                </div>
                            </div>
                            <div className="table-container">
                                <p>Panel de configuración en desarrollo...</p>
                            </div>
                        </div>
                    );
                default:
                    return (
                        <div className="content-card">
                            <div className="card-header">
                                <div className="card-header-content">
                                    <h2>Selecciona una opción del menú</h2>
                                    <p>Elige una opción del menú lateral para comenzar.</p>
                                </div>
                            </div>
                        </div>
                    );
            }
        };

        const SideMenu = ({activeItem, onItemClick}: { activeItem: string; onItemClick: (id: any) => void }) => {
            const adminConfig = getDashboardConfig('admin');
            return (
                <div className="side-menu">
                    <div className="side-menu-header">
                        <div className="header-content">
                            <div className="admin-icon"><User className="w-4 h-4"/></div>
                            <span className="admin-title">Administrador</span>
                        </div>
                    </div>
                    <nav className="side-menu-nav">
                        {adminConfig.menuItems.map((item: any) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => onItemClick(item.id)}
                                    className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
                                >
                                    <Icon/><span>{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                    <div className="side-menu-bottom">
                        {adminConfig.bottomItems.map((item: any) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => onItemClick(item.id)}
                                    className={`menu-item bottom-item ${activeItem === item.id ? 'active' : ''}`}
                                >
                                    <Icon className="w-5 h-5"/><span>{item.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            );
        };

        return (
            <div className="admin-interface">
                <SideMenu activeItem={activeMenuItem} onItemClick={setActiveMenuItem}/>
                <div className="main-content">
                    <header className="main-header">
                        <div className="header-content">
                            <h1 className="header-title">{getPageTitle()}</h1>
                            <div className="header-actions">
                                <div className="user-profile-container">
                                    <div className="user-profile-info">
                                        <p className="user-profile-name">Luis Medina</p>
                                        <p className="user-profile-email">admin@uni.com</p>
                                    </div>
                                    <MenuDesplegable/>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="main-section">
                        {renderMainContent()}
                    </main>

                    {/* Modales */}
                    <ModalAgregarUsuario
                        isOpen={addModal}
                        onClose={() => setAddModal(false)}
                        newUser={newUser}
                        setNewUser={setNewUser}
                        onUserCreated={() => {
                            console.log('Usuario creado:', newUser);
                            setAddModal(false);
                        }}
                    />

                    <ModalEditarUsuario
                        isOpen={editModal.isOpen}
                        user={editModal.user}
                        onClose={handleCloseEditModal}
                        onChange={handleInputChange}
                        onSave={() => {
                            console.log('Cambios guardados:', editModal.user);
                            setEditModal({isOpen: false, user: null});
                        }}
                    />
                </div>
            </div>
        );
    };

export default AdminInterface;
