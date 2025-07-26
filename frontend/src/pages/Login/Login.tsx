import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, Divider, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import institutionLogo from '../../assets/Common/UNL_logo.svg';
import './Login.css';
import { authService } from '../../services/authService';

const { Title, Paragraph } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [form] = Form.useForm<LoginFormValues>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin, user, isAuthenticated } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();

  // Redirección si ya está autenticado
  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPaths = {
        'ADM': '/admin',
        'DOC': '/docente',
        'EST': '/estudiante'
      };
      navigate(redirectPaths[user.role] || '/');
    }
  }, [user, isAuthenticated, navigate]);

  const handleLogin = async (values: LoginFormValues) => {
  try {
    setLoading(true);
    messageApi.destroy();

    // Limpia errores previos
    form.setFields([{ name: 'email', errors: [] }, { name: 'password', errors: [] }]);

    const result = await authService.login(values.email, values.password);

    if (!result.success) {
      throw new Error(result.error || 'Error de autenticación');
    }

    // Verificación más estricta de los datos de respuesta
    if (!result.email || !result.rol) {
      throw new Error('Datos de usuario incompletos en la respuesta');
    }

    authLogin({
      email: result.email,
      role: result.rol // Asegúrate que el contexto use 'role' consistentemente
    });

    messageApi.success(`¡Bienvenid@ ${result.email}!`);

    // Redirección con validación de rol
    const roleRoutes = {
      'ADM': '/admin',
      'DOC': '/docente',
      'EST': '/estudiante'
    };

    const redirectPath = roleRoutes[result.rol] || '/';
    navigate(redirectPath);

  } catch (error: any) {
    console.error('Error en login:', error);

    // Manejo específico de errores de red
    if (error.message.includes('Network Error')) {
      messageApi.error('Error de conexión con el servidor');
      return;
    }

    // Manejo de errores de credenciales
    if (error.response?.status === 400 || error.message.includes('credenciales')) {
      form.setFields([
        { name: 'email', errors: [' '] }, // Espacio para mantener el espacio de error
        { name: 'password', errors: ['Credenciales incorrectas'] }
      ]);
    } else {
      messageApi.error(error.message || 'Error desconocido durante el login');
    }
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
            initialValues={{ remember: true }}
            onFinish={handleLogin}
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
                prefix={<MailOutlined/>}
                placeholder="Correo electrónico"
                className="login-input"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
            >
              <Input.Password
                prefix={<LockOutlined/>}
                placeholder="Contraseña"
                className="login-input"
              />
            </Form.Item>

            <Form.Item className="login-links">
              <Link className="login-forgot" to="/password-reset">
                ¿Olvidó su contraseña?
              </Link>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button"
                loading={loading}
                disabled={loading}
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
};

export default Login;