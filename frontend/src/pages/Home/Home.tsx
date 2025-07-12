import React, { useState } from "react";
import { Button, Input, Typography, message, Card, Divider, Space } from "antd";
import { UserOutlined, LockOutlined, LoginOutlined, TeamOutlined, GlobalOutlined } from '@ant-design/icons';
import "./Home.css";

const { Title, Text, Paragraph } = Typography;
import Layout from "../../layouts/Main_Layout";
function Home() {
  const [loading, setLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      message.error('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success(`¡Bienvenido, ${username}!`);
    }, 1000);
  };

  const handleAuthMethodSelect = (method) => {
    setAuthMethod(method);
  };

  return (
    <Layout>

    <div className="login-container">
      <Card className="login-card">
        {/* Header con logo */}
        <div className="login-header">
          <div className="login-logo">
            <LoginOutlined />
          </div>
          <Title level={2} className="login-title">
            INICIAR SESIÓN
          </Title>
        </div>

        {/* Información para usuarios */}
        <div className="auth-info">
          <Paragraph className="auth-description">
            <strong>Estimado usuario,</strong> por favor seleccione uno de los métodos de autenticación disponibles:
          </Paragraph>

          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Card
              size="small"
              className={`auth-method-card ${authMethod === 'institucional' ? 'active' : ''}`}
              onClick={() => handleAuthMethodSelect('institucional')}
              hoverable
            >
              <Space>
                <TeamOutlined className="auth-icon" />
                <div>
                  <Text strong className="auth-method-title">Usuario institucional</Text>
                  <br />
                  <Text className="auth-method-description">
                    Para docentes, estudiantes y administrativos de la UNL usando el Servicio de Autenticación Centralizada SAC.
                  </Text>
                </div>
              </Space>
            </Card>

            <Card
              size="small"
              className={`auth-method-card ${authMethod === 'externo' ? 'active' : ''}`}
              onClick={() => handleAuthMethodSelect('externo')}
              hoverable
            >
              <Space>
                <GlobalOutlined className="auth-icon" />
                <div>
                  <Text strong className="auth-method-title">Usuario externo</Text>
                  <br />
                  <Text className="auth-method-description">
                    Para usuarios que aún no forman parte de la comunidad universitaria.
                  </Text>
              </div>
              </Space>
            </Card>
          </Space>
        </div>

        {/* Formulario de login */}
        {authMethod && (
          <div className="login-form">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Input
                prefix={<UserOutlined className="input-icon" />}
                placeholder="Nombre de usuario"
                size="large"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
              />

              <Input.Password
                prefix={<LockOutlined className="input-icon" />}
                placeholder="Contraseña"
                size="large"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />

              <Button
                type="primary"
                block
                loading={loading}
                size="large"
                onClick={handleLogin}
                className="login-button"
              >
                INICIAR SESIÓN
              </Button>
            </Space>
          </div>
        )}

        <Divider className="login-divider" />

        {/* Registro */}
        <div className="register-section">
          <Title level={5} className="section-title">
            Registrarse como usuario
          </Title>
          <Button
            type="link"
            size="large"
            className="register-link"
                >
            Crear nueva cuenta
          </Button>
        </div>

        {/* Nota importante */}
        <div className="important-note">
          <Text className="note-text">
            <strong>Nota:</strong> Para estudiantes y docentes usar la opción <strong>Usuario institucional</strong>
          </Text>
        </div>
      </Card>
      </div>
    </Layout>
);
}

export default Home;