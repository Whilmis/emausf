import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css'; // 👈 Importamos el CSS
import { TopMenu } from '../../uni/components/ui/top-menu/TopMenu';
import { Sidebar } from '../../uni/components/ui/sidebar/Sidebar';

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
};

export const LoginPage = () => {
  const { startLogin, errorMessage } = useAuthStore();
  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);


  const loginSubmit = (event) => {
    event.preventDefault();
    try {
      startLogin({ email: loginEmail, password: loginPassword });
    } catch (error) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
      return
    }
    
    
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }
  }, [errorMessage]);

  return (
    <>
    <TopMenu></TopMenu>
    <Sidebar />
    <div className="login-container">
      <div className="login-box">
        <h3 className="login-title">Ingreso</h3>
        <form onSubmit={loginSubmit} className="login-form">
          <div className="login-field">
            <input
              type="text"
              className="login-input"
              placeholder="Correo"
              name="loginEmail"
              value={loginEmail}
              onChange={onLoginInputChange}
            />
          </div>
          <div className="login-field">
            <input
              type="password"
              className="login-input"
              placeholder="Contraseña"
              name="loginPassword"
              value={loginPassword}
              onChange={onLoginInputChange}
            />
          </div>
          <div className="login-button-container">
            <input
              type="submit"
              className="login-button"
              value="Login"
            />
          </div>
        </form>

        {/* Link para crear cuenta */}
        <div className="login-register">
          ¿No tienes cuenta?{' '}
          <a href="/auth/register" className="register-link">
            Crear una cuenta
          </a>
        </div>

      </div>
    </div>
    </>
  );
};
