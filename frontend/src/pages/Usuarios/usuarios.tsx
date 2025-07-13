import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  Typography,
  message,
  Card,
  Space,
  Select,
  DatePicker,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
  CalendarOutlined,
  TeamOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

import "./usuarios.css";
import Layout from "../../layouts/Main_Layout";

function UserForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    cedula: "",
    fechaNacimiento: null,
    tipoUsuario: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const { nombre, apellido, email, telefono, cedula, tipoUsuario } =
      formData;

    if (!nombre || !apellido || !email || !telefono || !cedula || !tipoUsuario) {
      message.error("Por favor completa todos los campos obligatorios");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success(`¡Formulario enviado exitosamente, ${nombre}!`);
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        cedula: "",
        fechaNacimiento: null,
        tipoUsuario: "",
      });
    }, 1000);
  };

  const handleGoBack = () => {
    navigate('/admin');
  };

  return (
    <div className="userform-container">
      <Card className="userform-card">
        <Button
              className="back-button" 
              icon={<ArrowLeftOutlined />}
              onClick={handleGoBack}
            >
              REGRESAR AL INICIO
            </Button>
        <div className="userform-header">
            
          <div className="userform-icon">
            <TeamOutlined/>
          </div>
          <Title level={2} className="userform-title">
            REGISTRO DE USUARIO
          </Title>
        </div>

        <div className="userform-info">
          <Paragraph className="userform-description">
            <strong>Complete sus datos personales</strong> para registrarse en el sistema
          </Paragraph>
        </div>

        <div className="userform-form">
          <Space direction="vertical" size="large" style={{width: "100%"}}>
            <Space style={{width: "100%"}} size="middle">
              <Input
                prefix={<UserOutlined className="input-icon"/>}
                placeholder="Nombre"
                size="large"
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                className="userform-input"
              />
              <Input
                prefix={<UserOutlined className="input-icon"/>}
                placeholder="Apellido"
                size="large"
                value={formData.apellido}
                onChange={(e) => handleInputChange("apellido", e.target.value)}
                className="userform-input"
              />
            </Space>

            <Input
              prefix={<MailOutlined className="input-icon"/>}
              placeholder="Correo electrónico"
              size="large"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="userform-input"
            />

            <Space style={{width: "100%"}} size="middle">
              <Input
                prefix={<PhoneOutlined className="input-icon"/>}
                placeholder="Teléfono"
                size="large"
                value={formData.telefono}
                onChange={(e) =>
                  handleInputChange("telefono", e.target.value)
                }
                className="userform-input"
              />
              <Input
                prefix={<IdcardOutlined className="input-icon"/>}
                placeholder="Cédula"
                size="large"
                value={formData.cedula}
                onChange={(e) => handleInputChange("cedula", e.target.value)}
                className="userform-input"
              />
            </Space>

            <DatePicker
              placeholder="Fecha de nacimiento"
              size="large"
              value={formData.fechaNacimiento}
              onChange={(date) => handleInputChange("fechaNacimiento", date)}
              className="userform-input userform-datepicker"
              suffixIcon={<CalendarOutlined className="input-icon"/>}
              style={{width: "100%"}}
            />

            <Select
              placeholder="Seleccione tipo de usuario"
              size="large"
              value={formData.tipoUsuario}
              onChange={(value) => handleInputChange("tipoUsuario", value)}
              className="userform-input userform-select"
              style={{width: "100%"}}
            >
              <Option value="estudiante">Estudiante</Option>
              <Option value="docente">Docente</Option>
              <Option value="administrativo">Administrativo</Option>
              <Option value="externo">Usuario Externo</Option>
            </Select>

            <Button
              type="primary"
              block
              loading={loading}
              onClick={handleSubmit}
              className="userform-button"
            >
              REGISTRAR USUARIO
            </Button>

            
          </Space>
        </div>

        <div className="userform-note">
          <Text className="note-text">
            <strong>Importante:</strong> Todos los campos marcados son obligatorios.
            La información será verificada antes de activar su cuenta.
          </Text>
        </div>
      </Card>
    </div>
  );
}

export default UserForm;