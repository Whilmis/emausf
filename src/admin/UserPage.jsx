import React, { useState, useEffect } from 'react';
import { useUserStore } from '../hooks/useUserStore';
import { SearchForm } from './SearchForm';
import './userPage.css'; // Asegúrate de tener los estilos adecuados
import Footer from '../uni/components/ui/footer/Footer';
import { TopMenuUser } from '../uni/components/ui/top-menu-user/TopMenuUser';
import { SidebarUser } from '../uni/components/ui/sidebar-user/SidebarUser';

const UserPage = () => {
  const [usersC, setUsersC] = useState([]);
  const [desde, setDesde] = useState(0);
    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);
  const [newUser, setNewUser] = useState({
    nombre: '',
    correo: '',
    password: '',
    telefono: '',
    iglesia: '',
    edad: '',
    rol: 'USER_ROLE',
    direccion: '',
    confirmado: false, // Nuevo campo de confirmado
  });
  const [editUser, setEditUser] = useState(null); // Para editar usuarios
  const { startgetUsers, paginacionUseres, users2, startaddUser, startUpdateUser,  startDeleteUser, buscarUsuarios } = useUserStore();

  // Opciones de iglesias
  const iglesiaOptions = [
    "Parroquia San Fco. de Asis Paz y Bien",
    "Parroquia San Jose Obrero",
    "Parroquia Nuestra Señora de la Fe",
    "Parroquia San Isidro Labrador",
    "Parroquia San Vicente de Paul"
  ];

  // Cargar usuarios desde la API
  const anteriorP = () => {
    if (desde >= 0) {
      setDesde(desde - 5);
    }
  };

  const sigueinte = () => {
    if (desde >= 0) {
      setDesde(desde - 5);
    }
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        await paginacionUseres(desde);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
    fetchActivities();
  }, []);

  // Cargar actividades desde el store
  useEffect(() => {
    setUsersC(users2);
  }, [users2]);

  // Maneja el cambio en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    });
  };
  const handleSubmit = (searchTerm) => {
    buscarUsuarios(searchTerm)
  };

  const reset = async ()=>{
    await paginacionUseres(desde)
   }

  // Maneja el cambio en los campos de editar
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser({
      ...editUser,
      [name]: value
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Obtener el archivo seleccionado
    if (file) {
      setImage(file); // Guardar el archivo en el estado
    }
  };
  const handleImageChange2 = (e) => {
    const file = e.target.files[0]; // Obtener el archivo seleccionado
    if (file) {
      setImage2(file); // Guardar el archivo en el estado
    }
  };

  // Maneja el cambio en el checkbox de confirmado
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewUser({
      ...newUser,
      [name]: checked
    });
  };

  // Agregar un nuevo usuario
  const handleAddUser = async (e) => {

    try {
      await startaddUser(newUser, image);
      paginacionUseres(desde);
      setNewUser({
        nombre: '',
        correo: '',
        password: '',
        telefono: '',
        iglesia: '',
        edad: '',
        rol: 'USER_ROLE',
        direccion: '',
        confirmado: false, // Limpiar el campo de confirmado
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Eliminar un usuario
  const handleDeleteUser = async (id) => {
    try {
      await  startDeleteUser(id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Editar un usuario
  const handleEditUser = async () => {
    try {
      startUpdateUser(editUser, image2);
      await paginacionUseres(desde);
      setEditUser(null); // Reset editing state
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  return (
    <>
      <TopMenuUser />
      <SidebarUser />
      <div className="user-page">
        <h1>Gestión de Usuarios</h1>

        {/* Formulario para agregar un nuevo usuario */}
        <form onSubmit={(e) => { e.preventDefault(); handleAddUser()}} className="user-form">
          <h2>Agregar Nuevo Usuario</h2>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={newUser.nombre}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo Electrónico"
            value={newUser.correo}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={newUser.password}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={newUser.telefono}
            onChange={handleInputChange}
            required
          />
          {/* Selector de iglesia */}
          <div className="register-field">
            <label className="register-label">Parroquia:</label>
            <select
              className="register-select"
              name="iglesia"
              value={newUser.iglesia}
              onChange={handleInputChange}
            >
              {iglesiaOptions.map((iglesia, index) => (
                <option key={index} value={iglesia}>
                  {iglesia}
                </option>
              ))}
            </select>
          </div>
          <input
            type="number"
            name="edad"
            placeholder="Edad"
            value={newUser.edad}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={newUser.direccion}
            onChange={handleInputChange}
            required
          />
          <select
            name="rol"
            value={newUser.rol}
            onChange={handleInputChange}
          >
            <option value="USER_ROLE">Usuario</option>
            <option value="ADMIN_ROLE">Administrador</option>
          </select>
          {/* Checkbox para confirmar el usuario */}
          <div className="register-field">
            <label className="register-label">Confirmado:</label>
            <input
              type="checkbox"
              name="confirmado"
              checked={newUser.confirmado}
              onChange={handleCheckboxChange}
            />
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
          <button type="submit">Agregar Usuario</button>
        </form>

        {/* Formulario para editar un usuario */}
        {editUser && (
          <form onSubmit={(e) => { e.preventDefault(); handleEditUser(); }} className="user-form">
            <h2>Editar Usuario</h2>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={editUser.nombre}
              onChange={handleEditInputChange}
              required
            />
            <input
              type="email"
              name="correo"
              placeholder="Correo Electrónico"
              value={editUser.correo}
              onChange={handleEditInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={editUser.password}
              onChange={handleEditInputChange}
         
            />
            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              value={editUser.telefono}
              onChange={handleEditInputChange}
              required
            />
            {/* Selector de iglesia para editar */}
            <div className="register-field">
              <label className="register-label">Parroquia:</label>
              <select
                className="register-select"
                name="iglesia"
                value={editUser.iglesia}
                onChange={handleEditInputChange}
              >
                {iglesiaOptions.map((iglesia, index) => (
                  <option key={index} value={iglesia}>
                    {iglesia}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="number"
              name="edad"
              placeholder="Edad"
              value={editUser.edad}
              onChange={handleEditInputChange}
              required
            />
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={editUser.direccion}
              onChange={handleEditInputChange}
              required
            />
            <select
              name="rol"
              value={editUser.rol}
              onChange={handleEditInputChange}
            >
              <option value="USER_ROLE">Usuario</option>
              <option value="ADMIN_ROLE">Administrador</option>
            </select>
            {/* Checkbox para editar el estado de confirmado */}
            <div className="register-field">
              <label className="register-label">Confirmado:</label>
              <input
                type="checkbox"
                name="confirmado"
                checked={editUser.confirmado}
                onChange={handleEditInputChange}
              />
            </div>
            {image2 && (
        <div>
          <h3>Vista previa:</h3>
          <img
            src={URL.createObjectURL(image2)}
            alt="Vista previa"
            width="100"
          />
        </div>
      )} 
       <input type="file" onChange={handleImageChange2} />
            <button type="submit">Guardar Cambios</button>
          </form>
        )}
         <SearchForm  onSubmit={handleSubmit} handleReset={reset}/>
        {/* Tabla de usuarios */}
        <table className="user-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Parroquia</th>
              <th>Edad</th>
              <th>Dirección</th>
              <th>Rol</th>
              <th>Confirmado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usersC?.map(user => (
              <tr key={user._id}>
                   <td>
                  <img src={user.img} alt={user.nombre} width="50" />
                </td>
                <td>{user.nombre}</td>
                <td>{user.correo}</td>
                <td>{user.telefono}</td>
                <td>{user.iglesia}</td>
                <td>{user.edad}</td>
                <td>{user.direccion}</td>
                <td>{user.rol}</td>
                <td>{user.confirmado ? "Sí" : "No"}</td>
                <td>
                  <button onClick={() => setEditUser(user)}>Editar</button>
                  <button onClick={() => handleDeleteUser(user.uid)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button className="prev" onClick={() => anteriorP()} disabled={desde === 0}>
          Anterior
        </button>
        <button className="next" onClick={() => sigueinte()}>
          Siguiente
        </button>
      </div>
      <Footer />
    </>
  );
};

export default UserPage;


