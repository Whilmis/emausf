import React, { useState, useEffect } from 'react';
import ModalUsuarios from './ModalUsuarios';
import { SearchForm } from './SearchForm';
import './prendaPage.css'; 
import { usePrendas } from '../hooks/usePrendas';// Asegúrate de tener los estilos adecuados
import Footer from '../uni/components/ui/footer/Footer';

import { TopMenuUser } from '../uni/components/ui/top-menu-user/TopMenuUser';
import { SidebarUser } from '../uni/components/ui/sidebar-user/SidebarUser';

const PrendaPage = () => {
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState(null);
   const [image2, setImage2] = useState(null);
   const [modalOpen, setModalOpen] = useState(false);
const [selectedUsuarios, setSelectedUsuarios] = useState([]);
  const [desde, setDesde] = useState(0);
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    estado: true,
    cantidad: 1,
    talla: '',
    precio: 0,
    descripcion: '',

  });
  const [editProduct, setEditProduct] = useState(null); // Para editar productos
  const { paginacionPrendas, prendasState,addPrendas, updatePrendas,delentePrendas, buscarPrendas } = usePrendas();
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
     
        await paginacionPrendas(desde)
       
        
       } catch (error) {
         console.error("Error fetching activities:", error);
       }
     };
     fetchActivities();
    
    
   }, []);


      useEffect(() => {
        setProducts(prendasState);
        }, [prendasState]);

        const handleOpenUsuarios = (usuarios) => {
          setSelectedUsuarios(usuarios);
          setModalOpen(true);
        };
        
        const handleCloseModal = () => {
          setModalOpen(false);
          setSelectedUsuarios([]);
        };
  // Maneja el cambio en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };
  const handleSubmit = (searchTerm) => {
    buscarPrendas(searchTerm)
  };

  
  const reset = async ()=>{
    await paginacionPrendas(desde)
   }

  // Maneja el cambio en los campos de editar
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({
      ...editProduct,
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


  // Agregar un nuevo producto
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
    await addPrendas(newProduct, image);
    paginacionPrendas(desde)
    setImage(null);
      setNewProduct({
        nombre: '',
        estado: true,
        cantidad: 1,
        talla: '',
        precio: 0,
        descripcion: '',
        img: ''
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Eliminar un producto
  const handleDeleteProduct = async (id) => {
    try {
      await delentePrendas(id);
      paginacionPrendas(desde)
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Editar un producto
  const handleEditProduct = async () => {
    try {
      await  updatePrendas(editProduct, image2);
      paginacionPrendas(desde)
      setImage(null);
     
        setEditProduct(null); // Reset editing state
      } catch (error) {
        console.error("Error editing product:", error);
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
    <div className="product-page">
      <h1>Gestión de Prendas</h1>

      {/* Formulario para agregar un nuevo producto */}
      <form onSubmit={handleAddProduct} className="product-form">
        <h2>Agregar Nueva prenda</h2>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={newProduct.nombre}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          value={newProduct.cantidad}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="talla"
          placeholder="Talla"
          value={newProduct.talla}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={newProduct.precio}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={newProduct.descripcion}
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
        <button type="submit">Agregar Producto</button>
      </form>

      {/* Formulario para editar un producto */}
      {editProduct && (
        <form onSubmit={(e) => { e.preventDefault(); handleEditProduct(); }} className="product-form">
          <h2>Editar Producto</h2>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={editProduct.nombre}
            onChange={handleEditInputChange}
            required
          />
          <input
            type="number"
            name="cantidad"
            placeholder="Cantidad"
            value={editProduct.cantidad}
            onChange={handleEditInputChange}
            required
          />
          <input
            type="text"
            name="talla"
            placeholder="Talla"
            value={editProduct.talla}
            onChange={handleEditInputChange}
            required
          />
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={editProduct.precio}
            onChange={handleEditInputChange}
            required
          />
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={editProduct.descripcion}
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
      <SearchForm  onSubmit={handleSubmit} handleReset={reset}/>

      {/* Tabla de productos */}
      <table className="product-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Talla</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.nombre}</td>
              <td>{product.cantidad}</td>
              <td>{product.talla}</td>
              <td>${product.precio}</td>
              <td>{product.descripcion}</td>
              <td>
                <img src={product.img} alt={product.nombre} width="50" />
              </td>
              <td>
                <button onClick={() => setEditProduct(product)}>Editar</button>
                <button onClick={() => handleDeleteProduct(product._id)}>Eliminar</button>
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
      <button className="next" onClick={sigueinte}>
        Siguiente
      </button>
     
    </div>
    <Footer />
    </>
  );
};

export default PrendaPage;
