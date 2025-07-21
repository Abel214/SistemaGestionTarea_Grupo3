import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, Divider, message, Select } from 'antd';
import { UserOutlined, LockOutlined, UserAddOutlined, GlobalOutlined, MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Register.css';
import institutionLogo from '../../assets/Common/UNL_logo.svg';

const { Title, Paragraph } = Typography;

function Register() {
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

    // Función para simular el registro
    const mockRegister = async (registerData: any) => {
        // Simulamos un retraso de red
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Validación básica de contraseña
        if (registerData.password !== registerData.password_confirm) {
            throw new Error('Las contraseñas no coinciden');
        }

        // Simulamos la creación de un usuario
        return {
            token: 'mock-token-' + Math.random().toString(36).substring(2),
            user: {
                email: registerData.email,
                first_name: registerData.first_name,
                last_name: registerData.last_name,
                country: registerData.country,
                role: 'user' // Rol por defecto para nuevos registros
            }
        };
    };

    const onFinish = async (values: any) => {
        try {
            setLoading(true);

            const registerData = {
                email: values.email,
                first_name: values.firstName,
                last_name: values.lastName,
                password: values.password,
                password_confirm: values.confirmPassword,
                country: values.country
            };

            const data = await mockRegister(registerData);

            // Inicia sesión automáticamente después del registro
            login(data);

            messageApi.success('¡Registro exitoso!');
            navigate('/');

        } catch (error) {
            console.error('Registration error:', error);
            messageApi.error(error.message || 'Ocurrió un error al registrarse. Intente nuevamente más tarde.');
        } finally {
            setLoading(false);
        }
    };

    const onCountrySearch = (value: string) => {
        console.log('Searching for country:', value);
    };

    const handleGoBack = () => {
        navigate('/');
    };

    const countryOptions = [
        { value: "", label: "Seleccione un país" },
        ...["Ecuador", "Colombia", "Perú", "Brasil", "Argentina",
            "Chile", "Bolivia", "Venezuela", "Uruguay", "Paraguay"].map(country => ({
                value: country,
                label: country
            }))
    ];

    return (
        <>
            {contextHolder}
            <div className="register-container">
                <div className="register-background"></div>

                <Button
                    className="back-button"
                    icon={<ArrowLeftOutlined />}
                    onClick={handleGoBack}
                >
                    Regresar al inicio
                </Button>

                <div className="register-card">
                    <div className="register-logo-container">
                        <img src={institutionLogo} alt="UNL Logo" className="register-logo" />
                    </div>

                    <Title level={2} className="register-title">Registro de Usuario</Title>
                    <Paragraph className="register-subtitle">
                        Complete el formulario para crear su cuenta
                    </Paragraph>

                    <Divider />

                    <Form
                        form={form}
                        name="register"
                        className="register-form"
                        initialValues={{ country: "" }}
                        onFinish={onFinish}
                        layout="vertical"
                        scrollToFirstError
                    >
                        <div className="register-form-row">
                            <Form.Item
                                name="firstName"
                                className="register-form-item-half"
                                rules={[{ required: true, message: 'Por favor ingrese sus nombres' }]}
                            >
                                <Input
                                    prefix={<UserAddOutlined />}
                                    placeholder="Nombres"
                                    className="register-input"
                                />
                            </Form.Item>

                            <Form.Item
                                name="lastName"
                                className="register-form-item-half"
                                rules={[{ required: true, message: 'Por favor ingrese sus apellidos' }]}
                            >
                                <Input
                                    prefix={<UserAddOutlined />}
                                    placeholder="Apellidos"
                                    className="register-input"
                                />
                            </Form.Item>
                        </div>

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
                                className="register-input"
                            />
                        </Form.Item>


                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: 'Por favor ingrese una contraseña' },
                                { min: 8, message: 'La contraseña debe tener al menos 8 caracteres' }
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Contraseña"
                                className="register-input"
                            />
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            rules={[
                                { required: true, message: 'Por favor confirme su contraseña' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Las contraseñas no coinciden'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Confirmar contraseña"
                                className="register-input"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="register-button"
                                loading={loading}
                            >
                                Registrarse
                            </Button>
                        </Form.Item>

                        <div className="register-login-link">
                            ¿Ya tiene una cuenta? <Link to="/login">Inicie sesión</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default Register;