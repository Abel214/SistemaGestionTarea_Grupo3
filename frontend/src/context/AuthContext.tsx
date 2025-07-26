import {createContext, useState, useContext, useEffect} from 'react';
import type {ReactNode} from 'react';

import api from "../services/api";
interface User {
    email: string;
    role: string;  // Asegúrate que coincida con 'rol' del backend
    token?: string; // Opcional si usas JWT
}

interface ApiAuthResponse {
    success: boolean;
    email: string;
    rol: string; // Nota: 'rol' en lugar de 'role'
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    // Verificar si el token sigue válido
                    const isValid = await verifyToken(); // Implementa esta función
                    if (isValid) {
                        setUser(JSON.parse(storedUser));
                    } else {
                        localStorage.removeItem('user');
                    }
                } catch (error) {
                    localStorage.removeItem('user');
                }
            }
            setLoading(false);
        };
        initializeAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post<ApiAuthResponse>('/api/login/', { email, password });

            if (response.data.success) {
                const userData: User = {
                    email: response.data.email,
                    role: response.data.rol // Mapea 'rol' a 'role'
                };

                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
            } else {
                throw new Error('Autenticación fallida');
            }
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Error de autenticación');
        }
    };

    const logout = async () => {
        try {
            await api.post('/api/logout/');
            setUser(null);
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const value = {
        user,
        isAuthenticated: !!user,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}