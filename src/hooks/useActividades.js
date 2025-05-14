import { useState } from 'react';
import { calendarApi } from '../api';





export const useActividades = () => {

    const [actividadesState, setActividadesState]= useState([])


   

    const getActividades = async() => {
       
        try {

            const { data } = await calendarApi.get('/actividades');
            const {actividades} = data;
            setActividadesState(actividades)
          
        } catch (error) {
           console.error(error)
  
      
        }
    }


    const paginacionActividades = async (desde ) =>{
        try{
            const{data} = await calendarApi.get(`/actividades?desde=${desde}&limite=10`);
            const {actividades} = data;
            setActividadesState(actividades)

        }catch(error){
            console.error(error)

        }
    }
    const addActividades = async (actividad, image) => {
        try {
            const { _id, ...objeto } = actividad;
        
            // Primero, crear la actividad
            const { data } = await calendarApi.post('/actividades', { ...objeto });
        
            // Verificar si la imagen es un archivo válido
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
        
        } catch (error) {
            console.error('Error adding or uploading activity:', error);
        }
    };
    
    const updateActividades = async (actividad, image ) =>{
        try{
            const {_id,...objeto}= actividad
            const { data } = await calendarApi.put(`/actividades/${_id}`,{...objeto}); 
            console.log(data)
             
             if (!image || !(image instanceof File)) {
                throw new Error('El archivo de la imagen no es válido.');
            }
        
            // Preparar el FormData con la imagen (nombre 'archivo' como espera el backend)
            const formData = new FormData();
            formData.append('archivo', image); // El nombre del campo debe ser 'archivo' (coincidente con el backend)
        
            // Subir la imagen a la actividad usando PUT
            await calendarApi.put(`/uploads/actividads/${data._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Necesario para enviar imágenes
                },
            });
             
          

        }catch(error){
            console.error(error)

        }
    }
    const delenteActividades = async (id ) =>{
        try{
           
             await calendarApi.delete(`/actividades/${id}`);
           
          

        }catch(error){
            console.error(error)

        }
    }


    const delentePrendas = async (id ) =>{
        try{
           
             await calendarApi.delete(`/prendas/${id}`);
           
          

        }catch(error){
            console.error(error)

        }
    }


    const buscarActividad = async (busqueda ) =>{
        try{
           
            const{data}  =    await calendarApi.get(`/buscar/actividads/${busqueda}`);
            const {results} = data;
            setActividadesState(results)
          

        }catch(error){
            console.error(error)

        }
    }
    
    return {
        //* Propiedades
        actividadesState, 


        //* Métodos
  
        getActividades,
        buscarActividad,
        paginacionActividades,
        addActividades,
        updateActividades,
        delenteActividades,
        delentePrendas
      
    }

}