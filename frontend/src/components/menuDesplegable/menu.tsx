import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {ChevronDown, User} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import './menu.css';

const ProfileDropdown = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('Cerrar sesión');
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/';
    };

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="user-profile-button-menu">
                    <div className="user-profile-icon-menu">
                        <User className="w-5 h-5"/>
                    </div>
                    <ChevronDown className="w-4 h-4"/>
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    align="end"
                    sideOffset={8}
                    className="dropdown-content"
                >
                    <DropdownMenu.Item
                        className="dropdown-item"
                        onClick={() => navigate('/admin')}
                    >
                        Página Principal
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                        className="dropdown-item logout"
                        onClick={handleLogout}
                    >
                        Cerrar Sesión
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default ProfileDropdown;
