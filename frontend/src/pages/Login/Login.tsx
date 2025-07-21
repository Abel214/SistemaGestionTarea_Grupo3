import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import institutionLogo from '../../assets/Common/UNL_logo.svg';
import './Login.css';

const { Title, Paragraph } = Typography;

function Login() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const [messageApi, contextHolder] = message.useMessage();

    // Reset body padding when component mounts
    useEffect(() => {
        document.body.style.paddingTop = '0';
        document.body.classList.remove('transparent-header');

        return () => {
            document.body.style.paddingTop = '';
        };
    }, []);

    const mockLogin = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Credenciales de prueba con diferentes roles
    const testUsers = [
        { email: 'admin@example.com', password: 'admin123', token: 'mock-token-admin', role: 'admin' },
        { email: 'docente@example.com', password: 'docente123', token: 'mock-token-docente', role: 'docente' },
        { email: 'estudiante@example.com', password: 'estudiante123', token: 'mock-token-estudiante', role: 'estudiante' }
    ];

    const user = testUsers.find(u => u.email === email && u.password === password);

    if (!user) {
        throw new Error('Credenciales incorrectas');
    }

    return {
        token: user.token,
        user: {
            email: user.email,
            role: user.role // Usamos el rol definido para cada usuario
        }
    };
};

   const onFinish = async (values: any) => {
    try {
        setLoading(true);
        const data = await mockLogin(values.email, values.password);

        // Usamos la función login del contexto de autenticación
        login(data);
        messageApi.success('¡Inicio de sesión exitoso!');

        // Redirigir según el rol del usuario
        switch(data.user.role) {
            case 'admin':
                navigate('/admin');
                break;
            case 'docente':
                navigate('/docente');
                break;
            case 'estudiante':
                navigate('/estudiante');
                break;
            default:
                navigate('/'); // Ruta por defecto si el rol no coincide
        }

    } catch (error) {
        console.error('Login error:', error);
        messageApi.error(error.message || 'Ocurrió un error al conectar con el servidor. Intente nuevamente más tarde.');
    } finally {
        setLoading(false);
    }
};

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <>
            {contextHolder}
            <div className="login-container">
                <div className="login-background"></div>


                <div className="login-card">
                    <div className="login-logo-container">
                        <img src={institutionLogo} alt="UNL Logo" className="login-logo" />
                    </div>

                    <Title level={2} className="login-title">Inicio de Sesión</Title>
                    <Paragraph className="login-subtitle">
                        Ingrese sus credenciales para acceder al sistema
                    </Paragraph>

                    <Divider />

                    <Form
                        form={form}
                        name="login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Por favor ingrese su correo electrónico' },
                                { type: 'email', message: 'Correo electrónico inválido' }
                            ]}
                        >
                            <Input
                                prefix={<MailOutlined />}
                                placeholder="Correo electrónico"
                                className="login-input"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Contraseña"
                                className="login-input"
                            />
                        </Form.Item>

                        <Form.Item className="login-links">
                            <Link className="login-forgot" to="/password-reset">¿Olvidó su contraseña?</Link>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-button"
                                loading={loading}
                            >
                                Iniciar Sesión
                            </Button>
                        </Form.Item>

                        <div className="login-register">
                            ¿No tiene una cuenta? <Link to="/register">Regístrese</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default Login;