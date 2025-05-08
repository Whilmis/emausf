import React, { useState, useEffect } from 'react';
import { useArticulos } from '../hooks/useArticulos';
import './articulosPage.css'; // Estilos de la página
import Footer from '../uni/components/ui/footer/Footer';
import { TopMenuUser } from '../uni/components/ui/top-menu-user/TopMenuUser';
import { SidebarUser } from '../uni/components/ui/sidebar-user/SidebarUser';

const ArticulosPage = () => {
  const [products, setProducts] = useState([]);
    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);
    const [desde, setDesde] = useState(0);
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    estado: true,
    cantidad: 1,
    precio: 0,
    descripcion: '',
    img: ''
  });
  const [editProduct, setEditProduct] = useState(null); // Para editar productos
    const {paginacionArticulos, articulosState,addArticulos, updateArticulos, delenteArticulos} = useArticulos();

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
     
        await paginacionArticulos(desde)
       
        
       } catch (error) {
         console.error("Error fetching activities:", error);
       }
     };
     fetchActivities();
    
    
   }, []);


   useEffect(() => {
    setProducts(articulosState);
     }, [articulosState]);

  // Maneja el cambio en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
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
      setImage(file); // Guardar el archivo en el estado
    }
  };

  // Maneja el cambio en los campos de editar
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({
      ...editProduct,
      [name]: value
    });
  };

  // Agregar un nuevo producto
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
     await addArticulos(newProduct, image);
      paginacionArticulos(desde)
      setImage(null);
      setNewProduct({
        nombre: '',
        estado: true,
        cantidad: 1,
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
    await delenteArticulos(id);
    paginacionArticulos(desde)
    
     
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Editar un producto
  const handleEditProduct = async () => {
    try {
    await  updateArticulos(editProduct, image2);
    paginacionArticulos(desde)
    setImage2(null);
   
      setEditProduct(null); // Reset editing state
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  return (
    <>
    <TopMenuUser />
    <SidebarUser />
    <div className="product-page">
      <h1>Gestión de Articulos</h1>

      {/* Formulario para agregar un nuevo producto */}
      <form onSubmit={handleAddProduct} className="product-form">
        <h2>Agregar Nuevo Articulo</h2>
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
        <input
          type="text"
          name="img"
          placeholder="Imagen URL"
          value={newProduct.img}
          onChange={handleInputChange}
        />


{image2 && (
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
        <button type="submit">Agregar Articulo</button>
      </form>

      {/* Formulario para editar un producto */}
      {editProduct && (
        <form onSubmit={(e) => { e.preventDefault(); handleEditProduct(); }} className="product-form">
          <h2>Editar Articulo</h2>
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
          <input
            type="text"
            name="img"
            placeholder="Imagen URL"
            value={editProduct.img}
            onChange={handleEditInputChange}
          />
          {image && (
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

      {/* Tabla de productos */}
      <table className="product-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
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
              <td>${product.precio}</td>
              <td>{product.descripcion}</td>
              <td>
                <img src={product.img} alt={product.nombre} width="50" />
              </td>
              <td>
                <button onClick={() => setEditProduct(product)}>Editar</button>
                <button onClick={() => handleDeleteProduct(product._id)}>Eliminar</button>
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

export default ArticulosPage;
