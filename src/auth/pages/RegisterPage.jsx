import React, { useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useAuthStore, useForm } from '../../hooks';
import Swal from 'sweetalert2';

import { TopMenu } from '../../uni/components/ui/top-menu/TopMenu';
import { Sidebar } from '../../uni/components/ui/sidebar/Sidebar';
import './RegisterPage.css'; // 👈 Importamos el mismo CSS general (puedes separarlo si quieres)

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerTelefono: '',
  registerDireccion: '',
  registerEdad: 1,
  registerPassword: '',
  registerPassword2: '',
  registerIglesia: 'Parroquia San Fco. de Asis Paz y Bien'
};

export const ResgisterPage = () => {
  const { registerEmail, registerName, registerPassword, registerPassword2, registerTelefono, registerDireccion, registerEdad, onInputChange: onRegisterInputChange, registerIglesia } = useForm(registerFormFields);
  const {  errorMessage, startRegister } = useAuthStore();
  const [image, setImage] = useState(null); 
  const form = useRef();

  const registerSubmit = (event) => {
    event.preventDefault();

    // Validaciones:
    if (!registerName || !registerEmail || !registerTelefono || !registerDireccion || !registerPassword || !registerPassword2 || !registerEdad) {
      Swal.fire('Error en el formulario', 'Por favor llena todos los campos', 'error');
      return;
    }

    // Validación de formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerEmail)) {
      Swal.fire('Error en el correo', 'El correo electrónico no es válido', 'error');
      return;
    }

    // Validación de que las contraseñas coinciden
    if (registerPassword !== registerPassword2) {
      Swal.fire('Error en registro', 'Las contraseñas no coinciden', 'error');
      return;
    }

    // Validación de edad
    if (registerEdad < 17) {
      Swal.fire('Error en edad', 'tiene que ser mayor de edad', 'error');
      return;
    }

    console.log({ nombre: registerName, correo: registerEmail, password: registerPassword, iglesia: registerIglesia , direccion:registerDireccion, telefono: registerTelefono, edad: registerEdad, "rol": "USER_ROLE"});
    startRegister({ nombre: registerName, correo: registerEmail, direccion:registerDireccion, telefono: registerTelefono, edad: registerEdad, iglesia: registerIglesia , rol: "USER_ROLE", password: registerPassword }, image);

    // Enviar el correo de confirmación
    emailjs.sendForm('service_ed2rlr9', 'template_o5s4i1n', form.current, {
      publicKey: 'EbEldik7lyNTXM7a4',
    })
    .then(
      () => {
        console.log('SUCCESS!');
      },
      (error) => {
        console.log('FAILED...', error.text);
      }
    );

    Swal.fire({
      title: "Usuario creado con éxito, espera la confirmación del equipo administrativo de Emaús hombres para poder entrar a la tienda",
      icon: "success",
      confirmButtonText: 'Aceptar',
      background: '#ffffff',
      color: '#333333',
      confirmButtonColor: '#007aff',
      width: '400px',
      customClass: {
        popup: 'rounded-xl shadow-lg',
        title: 'text-2xl font-semibold',
        confirmButton: 'text-white font-bold py-2 px-4 rounded-lg'
      }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Obtener el archivo seleccionado
    if (file) {
      setImage(file); // Guardar el archivo en el estado
    }
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticación', errorMessage);
    }
  }, [errorMessage]);

  return (
    <>
      <TopMenu />
      <Sidebar />

      <div className="register-container">
        <div className="register-box">
          <h3 className="register-title">Registro</h3>
          <form onSubmit={registerSubmit} className="register-form">
            
            <div className="register-field">
              <input
                type="text"
                className="register-input"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
                required
              />
            </div>

            <div className="register-field">
              <input
                type="email"
                className="register-input"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
                required
              />
            </div>

            <div className="register-field">
              <input
                type="text"
                className="register-input"
                placeholder="Teléfono"
                name="registerTelefono"
                value={registerTelefono}
                onChange={onRegisterInputChange}
                required
              />
            </div>

            <div className="register-field">
              <input
                type="text"
                className="register-input"
                placeholder="Dirección"
                name="registerDireccion"
                value={registerDireccion}
                onChange={onRegisterInputChange}
                required
              />
            </div>

            <div className="register-field">
              <label className="register-label">Edad:</label>
              <input
                type="number"
                className="register-input"
                placeholder="Edad"
                name="registerEdad"
                value={registerEdad}
                onChange={onRegisterInputChange}
                min="1"
                required
              />
            </div>

            <div className="register-field">
              <input
                type="password"
                className="register-input"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
                required
              />
            </div>

            <div className="register-field">
              <input
                type="password"
                className="register-input"
                placeholder="Repetir contraseña"
                name="registerPassword2"
                value={registerPassword2}
                onChange={onRegisterInputChange}
                required
              />
            </div>

            <div className="register-field">
              <label className="register-label">Parroquia:</label>
              <select
                className="register-select"
                name="registerIglesia"
                value={registerIglesia}
                onChange={onRegisterInputChange}
                required
              >
                <option value="Parroquia San Fco. de Asis Paz y Bien">Parroquia San Fco. de Asis Paz y Bien</option>
                <option value="Parroquia San Jose Obrero">Parroquia San Jose Obrero</option>
                <option value="Parroquia Nuestra Señora de la Fe">Parroquia Nuestra Señora de la Fe</option>
                <option value="Parroquia San Isidro Labrador">Parroquia San Isidro Labrador</option>
                <option value="Parroquia San Vicente de Paul">Parroquia San Vicente de Paul</option>
              </select>
            </div>
            {image && (
              <div>
                <h3>Vista previa:</h3>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Vista previa"
                  width="100"
                />
              </div>
            )}
            <input type="file" onChange={handleImageChange} />
            
            <div className="register-button-container">
              <input
                type="submit"
                value="Crear cuenta"
                className="register-button"
              />
            </div>

          </form>
        </div>
        <form ref={form} >
  
    </form>
      </div>
    </>
  );
};
