import React, { useState, useEffect } from 'react'; 
import ModalUsuarios from './ModalUsuarios'; // Importa axios para las solicitudes HTTP
import './activityPage.css'; // Estilos de la página
import Footer from '../uni/components/ui/footer/Footer';
import { useActividades } from '../hooks/useActividades';
import { TopMenuUser } from '../uni/components/ui/top-menu-user/TopMenuUser';
import { SidebarUser } from '../uni/components/ui/sidebar-user/SidebarUser';

const ActividadesPage = () => {
  const [activities, setActivities] = useState([]);
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [desde, setDesde] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
const [selectedUsuarios, setSelectedUsuarios] = useState([]);
  const { paginacionActividades, actividadesState, updateActividades,addActividades,delenteActividades } = useActividades();
  const [newActivity, setNewActivity] = useState({
    nombre: '',
    iglesia: "Parroquia San Fco. de Asis Paz y Bien",
    estado: true,
    cantidad: 1,
    fechaI: '',
    fechaF: '',
    precio: 0,
    descripcion: ''
  });
  const [editActivity, setEditActivity] = useState(null); // Para editar actividades

  const iglesiaOptions = [
    "Parroquia San Fco. de Asis Paz y Bien",
    "Parroquia San Jose Obrero",
    "Parroquia Nuestra Señora de la Fe",
    "Parroquia San Isidro Labrador",
    "Parroquia San Vicente de Paul"
  ];

  const anteriorP = () => {
    if (desde >= 0) {
      setDesde(desde - 5);
    }
  };

  const siguiente = () => {
    if (desde >= 0) {
      setDesde(desde - 5);
    }
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        await paginacionActividades(desde);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    fetchActivities();
  }, []);

  const handleOpenUsuarios = (usuarios) => {
    console.log(usuarios);
    setSelectedUsuarios(usuarios);
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUsuarios([]);
  };

  // Cargar actividades desde la API
  useEffect(() => {
    setActivities(actividadesState);
  }, [actividadesState]);

  // Maneja el cambio en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewActivity({
      ...newActivity,
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
  // Formatea las fechas a formato correcto para datetime-local
  const formatDateForInput = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = formattedDate.getDate().toString().padStart(2, '0');
    const hours = formattedDate.getHours().toString().padStart(2, '0');
    const minutes = formattedDate.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Maneja el cambio en los campos de editar
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;

    setEditActivity({
      ...editActivity,
      [name]: value
    });
  };

  // Setear valores de la actividad para edición
  const handleEditActivityClick = (activity) => {
    setEditActivity({
      ...activity,
      fechaI: formatDateForInput(activity.fechaI), // Formatear fecha inicio
      fechaF: formatDateForInput(activity.fechaF) // Formatear fecha fin
    });
  };

  // Agregar una nueva actividad
  const handleAddActivity = async (e) => {
    e.preventDefault();
    try {
      addActividades(newActivity, image) 
      paginacionActividades(desde)
      setNewActivity({
        nombre: '',
        iglesia: "Parroquia San Fco. de Asis Paz y Bien",
        estado: true,
        cantidad: 1,
        fechaI: '',
        fechaF: '',
        precio: 0,
        descripcion: ''
   
      });
      setImage(null);
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  // Eliminar una actividad
  const handleDeleteActivity = async (id) => {
    try {
      await delenteActividades(id);
      paginacionActividades(desde)
  
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  // Editar una actividad
  const handleEditActivity = async () => {
    try {
     await updateActividades(editActivity, image2);
      paginacionActividades(desde)
      setImage2(null);
      setEditActivity(null); // Reset editing state
      paginacionActividades(desde)
    } catch (error) {
      console.error('Error editing activity:', error);
    }
  };

  return (
    <>
      <TopMenuUser />
      <SidebarUser />
      <ModalUsuarios
  isOpen={modalOpen}
  onClose={handleCloseModal}
  usuarios={selectedUsuarios}
/>
      <div className="activity-page">
        <h1>Gestión de Actividades</h1>

        {/* Formulario para agregar una nueva actividad */}
        <form onSubmit={handleAddActivity} className="activity-form">
          <h2>Agregar Nueva Actividad</h2>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={newActivity.nombre}
            onChange={handleInputChange}
            required
          />
          <div className="register-field">
            <label className="register-label">Iglesia:</label>
            <select
              className="register-select"
              name="iglesia"
              value={newActivity.iglesia}
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
            name="cantidad"
            placeholder="Cantidad"
            value={newActivity.cantidad}
            onChange={handleInputChange}
            required
          />
          <input
            type="datetime-local"
            name="fechaI"
            placeholder="Fecha Inicio"
            value={newActivity.fechaI}
            onChange={handleInputChange}
            required
          />
          <input
            type="datetime-local"
            name="fechaF"
            placeholder="Fecha Fin"
            value={newActivity.fechaF}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={newActivity.precio}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={newActivity.descripcion}
            onChange={handleInputChange}
            required
          />

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
      
          <button type="submit">Agregar Actividad</button>
        </form>

        {/* Formulario para editar una actividad */}
        {editActivity && (
          <form onSubmit={(e) => { e.preventDefault(); handleEditActivity(); }} className="activity-form">
            <h2>Editar Actividad</h2>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={editActivity.nombre}
              onChange={handleEditInputChange}
              required
            />
            <div className="register-field">
              <label className="register-label">Iglesia:</label>
              <select
                className="register-select"
                name="iglesia"
                value={editActivity.iglesia} // Aseguramos que el valor de la iglesia esté correctamente seleccionado
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
              name="cantidad"
              placeholder="Cantidad"
              value={editActivity.cantidad}
              onChange={handleEditInputChange}
              required
            />
            <input
              type="datetime-local"
              name="fechaI"
              placeholder="Fecha Inicio"
              value={editActivity.fechaI}
              onChange={handleEditInputChange}
              required
            />
            <input
              type="datetime-local"
              name="fechaF"
              placeholder="Fecha Fin"
              value={editActivity.fechaF}
              onChange={handleEditInputChange}
              required
            />
            <input
              type="number"
              name="precio"
              placeholder="Precio"
              value={editActivity.precio}
              onChange={handleEditInputChange}
              required
            />
            <textarea
              name="descripcion"
              placeholder="Descripción"
              value={editActivity.descripcion}
              onChange={handleEditInputChange}
              required
            />
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

        {/* Tabla de actividades */}
        <table className="activity-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Iglesia</th>
              <th>Cantidad</th>
              <th>Fechas</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Imagen</th>
              <th>Compras</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id}>
                <td>{activity.nombre}</td>
                <td>{activity.iglesia}</td>
                <td>{activity.cantidad}</td>
                <td>
                  {new Date(activity.fechaI).toLocaleString()} -{' '}
                  {new Date(activity.fechaF).toLocaleString()}
                </td>
                <td>${activity.precio}</td>
                <td>{activity.descripcion}</td>
                <td>
                  <img src={activity.img} alt={activity.nombre} width="50" />
                </td>
                <td>{activity.usuarios.lenght}</td>
                <td>
                  <button onClick={() => handleEditActivityClick(activity)}>Editar</button>
                  <button onClick={() => handleDeleteActivity(activity._id)}>Eliminar</button>
                  <button onClick={() => handleOpenUsuarios(activity.usuarios || [])}>Usuarios</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button className="prev" onClick={anteriorP} disabled={desde === 0}>
          Anterior
        </button>
        <button className="next" onClick={siguiente}>
          Siguiente
        </button>
      </div>
      <Footer />
    </>
  );
};

export default ActividadesPage;

