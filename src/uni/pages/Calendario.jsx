import React, { useState, useEffect } from "react";
import './calendario.css'; // 👈 Importamos el CSS
import { TopMenu } from "../components/ui/top-menu/TopMenu";
import { Sidebar } from "../components/ui/sidebar/Sidebar";
import { useActividades } from '../../hooks/useActividades';
import Footer from "../components/ui/footer/Footer";






export default function Calendario() {
 const [activities, setActivities] = useState([]);
 const { paginacionActividades, actividadesState,  } = useActividades();
   const [desde, setDesde] = useState(0);

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
   
     // Cargar actividades desde la API
     useEffect(() => {
       setActivities(actividadesState);
     }, [actividadesState]);
     console.log(activities)
  return (
    <>
     <TopMenu />
        <Sidebar />
    <div className="calendario-container">
      <h3 className="calendario-title">Calendario de Retiros de la Hermandad de Emaús</h3>
      <hr className="calendario-divider" />

      <div className="calendario-buttons">
   
         <h3> Retiros de Hombres </h3>
      
   
      </div>

      <div className="calendario-table-container">
        <table className="calendario-table">
        <thead>
            <tr>
              <th>Nombre</th>
              <th>Iglesia</th>
              <th>Cantidad</th>
              <th>Fechas</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Imagen</th>
            
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
            
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
}
