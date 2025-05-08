import React, { useState, useEffect } from 'react';
import { useOrden } from '../hooks/useOrden';
import './orderPage.css'; // Estilos de la página
import Footer from '../uni/components/ui/footer/Footer';
import { TopMenuUser } from '../uni/components/ui/top-menu-user/TopMenuUser';
import { SidebarUser } from '../uni/components/ui/sidebar-user/SidebarUser';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
     const [desde, setDesde] = useState(0);

  const [editOrder, setEditOrder] = useState(null); // Para editar órdenes
  const {paginacionOrdenes, ordenesState,addOrden, updateOrdenes, delenteOrdenes} = useOrden();
  // Cargar órdenes desde la API
   const anteriorP = () =>{
        if(desde >= 0){
          setDesde(desde - 5)
      
        }
    
      }
    
      const sigueinte = () =>{
        if(desde >= 0){
          setDesde(desde - 5)
      
        }
    
      }
    useEffect(() => {
       const fetchActivities = async () => {
         try {
       
          await paginacionOrdenes(desde)
         
          
         } catch (error) {
           console.error("Error fetching activities:", error);
         }
       };
       fetchActivities();
      
      
     }, []);
  
  
     useEffect(() => {
      setOrders(ordenesState);
       }, [ordenesState]);
  

  // Maneja el cambio en los inputs del formulario

  // Maneja el cambio en los campos de editar
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditOrder({
      ...editOrder,
      [name]: value
    });
  };



  // Eliminar una orden
  const handleDeleteOrder = async (id) => {
    try {
      await delenteOrdenes(id);
      paginacionOrdenes(desde)
      
       
      } catch (error) {
        console.error("Error deleting product:", error);
      }
  };

  // Editar una orden
  const handleEditOrder = async () => {
    try {
      await  updateOrdenes(editOrder);
      paginacionOrdenes(desde)
    
     
        setEditProduct(null); // Reset editing state
      } catch (error) {
        console.error("Error editing product:", error);
      }
  };

  return (
    <>
    <TopMenuUser />
    <SidebarUser />
    <div className="order-page">
      <h1>Gestión de Órdenes</h1>

     
      {editOrder && (
        <form onSubmit={(e) => { e.preventDefault(); handleEditOrder(); }} className="order-form">
          <h2>Editar Orden</h2>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del Cliente"
            value={editOrder.nombre}
            onChange={handleEditInputChange}
            required
          />
    
          <input
            type="number"
            name="costo"
            placeholder="Costo Total"
            value={editOrder.costo}
            onChange={handleEditInputChange}
            required
          />

          <label>
            Pago:
            <input
              type="checkbox"
              name="pago"
              checked={editOrder.pago}
              onChange={(e) => setEditOrder({ ...editOrder, pago: e.target.checked })}
            />
          </label>
          <button type="submit">Guardar Cambios</button>
        </form>
      )}

      {/* Tabla de órdenes */}
      <table className="order-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Productos</th>
            <th>Costo</th>
            <th>Fecha</th>
            <th>Pago</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.nombre}</td>
              <td>{order.productos.map(product => product.nombre).join(", ")}</td>
              <td>${order.costo}</td>
              <td>{new Date(order.fecha).toLocaleString()}</td>
              <td>{order.pago ? 'Pagado' : 'No Pagado'}</td>
              <td>
                <button onClick={() => setEditOrder(order)}>Editar</button>
                <button onClick={() => handleDeleteOrder(order._id)}>Eliminar</button>
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
      <button className="next" onClick={sigueinte}>
        Siguiente
      </button>
     
    </div>
    <Footer/>
    </>
  );
};

export default OrderPage;
