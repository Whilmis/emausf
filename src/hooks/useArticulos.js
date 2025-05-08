import { useState } from 'react';
import { calendarApi } from '../api';





export const useArticulos = () => {

    const [articulosState, setAticulosState]= useState([])


   

    const getArticulos = async() => {
       
        try {

            const { data } = await calendarApi.get('/articulos');
            const {articulo} = data;
            setAticulosState(articulo)
          
        } catch (error) {
           console.error(error)
  
      
        }
    }


    const paginacionArticulos = async (desde ) =>{
        try{
            const{data} = await calendarApi.get(`/articulos?desde=${desde}&limite=5`);
            const {articulo} = data;
            setAticulosState(articulo)

        }catch(error){
            console.error(error)

        }
    }

    const addArticulos = async (articulo,image ) =>{
        try{
            const {_id,...objeto}= articulo
            console.log(objeto)
            const { data } =  await calendarApi.post('/articulos',{...objeto});
            if (!image || !(image instanceof File)) {
                throw new Error('El archivo de la imagen no es válido.');
            }
        
            // Preparar el FormData con la imagen (nombre 'archivo' como espera el backend)
            const formData = new FormData();
            formData.append('archivo', image); // El nombre del campo debe ser 'archivo' (coincidente con el backend)
        
            // Subir la imagen a la actividad usando PUT
            await calendarApi.put(`/uploads/articulos/${data._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Necesario para enviar imágenes
                },
            });
        
          

        }catch(error){
            console.error(error)

        }
    }

    const updateArticulos = async (articulo, image ) =>{
        try{
            const {_id,...objeto}= articulo
            console.log(objeto)
            const { data } =   await calendarApi.put(`/articulos/${_id}`,{...objeto});
            if (!image || !(image instanceof File)) {
                throw new Error('El archivo de la imagen no es válido.');
            }
        
            // Preparar el FormData con la imagen (nombre 'archivo' como espera el backend)
            const formData = new FormData();
            formData.append('archivo', image); // El nombre del campo debe ser 'archivo' (coincidente con el backend)
        
            // Subir la imagen a la actividad usando PUT
            await calendarApi.put(`/uploads/articulos/${data._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Necesario para enviar imágenes
                },
            });
           
          

        }catch(error){
            console.error(error)

        }
    }

    const delenteArticulos = async (id ) =>{
        try{
           
             await calendarApi.delete(`/articulos/${id}`);
           
          

        }catch(error){
            console.error(error)

        }
    }

    
    return {
        //* Propiedades
        articulosState, 


        //* Métodos
  
        getArticulos,
        paginacionArticulos,
        addArticulos,
        updateArticulos,
        delenteArticulos
      
    }

}