import React, { useState } from 'react';

export const SearchForm = ({  onSubmit, handleReset }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Manejar cambios en el campo de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();  // Evita la recarga de la página
    if (onSubmit) {
      onSubmit(searchTerm);  // Llamar a la función onSubmit pasada como prop
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ padding: '8px', margin: '10px 0', width: '200px' }}
        />
        <button type="submit">Buscar</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};
