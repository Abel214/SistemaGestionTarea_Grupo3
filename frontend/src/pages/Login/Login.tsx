import React, {useState, useEffect} from 'react';
import {Form, Input, Button, Typography, Divider, message} from 'antd';
import {MailOutlined, LockOutlined} from '@ant-design/icons';
import {useNavigate, Link} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';
import institutionLogo from '../../assets/Common/UNL_logo.svg';
import './Login.css';
import {getCookie} from '../../utils/cookies';

const {Title, Paragraph} = Typography;

function Login() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {login, user} = useAuth();  // Asegúrate de que `useAuth` devuelve `user`
    const [messageApi, contextHolder] = message.useMessage();

    // Redirigir si ya hay usuario autenticado
    useEffect(() => {
        if (user) {
            const role = user.role;
            switch (role) {
                case 'ADM':
                    navigate('/admin');
                    break;
                case 'DOC':
                    navigate('/docente');
                    break;
                case 'EST':
                    navigate('/estudiante');
                    break;
                default:
                    navigate('/');
            }
        }
    }, [user, navigate]);

    useEffect(() => {
        document.body.style.paddingTop = '0';
        document.body.classList.remove('transparent-header');

        return () => {
            document.body.style.paddingTop = '';
        };
    }, []);

    const realLogin = async (email: string, password: string) => {
        const csrfToken = getCookie('csrftoken');
        const response = await fetch('http://localhost:8000/api/tareas/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken ?? ''
            },
            credentials: 'include',
            body: JSON.stringify({email, password})
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al iniciar sesión');
        }

        const data = await response.json();

        return {
            token: 'session-based',
            user: {
                email,
                role: data.rol || 'EST'
            }
        };
    };

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const data = await realLogin(values.email, values.password);
            login(data);  // ✅ ya maneja almacenamiento y contexto
            messageApi.success('¡Inicio de sesión exitoso!');
        } catch (error: any) {
            console.error('Login error:', error);
            messageApi.error(error.message || 'Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {contextHolder}
            <div className="login-container">
                <div className="login-background"></div>

                <div className="login-card">
                    <div className="login-logo-container">
                        <img src={institutionLogo} alt="UNL Logo" className="login-logo"/>
                    </div>

                    <Title level={2} className="login-title">Inicio de Sesión</Title>
                    <Paragraph className="login-subtitle">
                        Ingrese sus credenciales para acceder al sistema
                    </Paragraph>

                    <Divider/>

                    <Form
                        form={form}
                        name="login"
                        className="login-form"
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {required: true, message: 'Por favor ingrese su correo electrónico'},
                                {type: 'email', message: 'Correo electrónico inválido'}
                            ]}
                        >
                            <Input
                                prefix={<MailOutlined/>}
                                placeholder="Correo electrónico"
                                className="login-input"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{required: true, message: 'Por favor ingrese su contraseña'}]}
                        >
                            <Input.Password
                                prefix={<LockOutlined/>}
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
