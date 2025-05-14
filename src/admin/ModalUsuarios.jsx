import React from 'react';
import './modalUsuarios.css'; // Puedes agregar estilos personalizados

const ModalUsuarios = ({ isOpen, onClose, usuarios }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h2>Miembros registrados</h2>
        <table className="modal-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Telefono</th>
              <th>Orden</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={index}>
                <td>{usuario.nombre}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.ordenNombre || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ModalUsuarios;
