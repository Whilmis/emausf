import { useState } from 'react';
import { calendarApi } from '../api';





export const usePrendas = () => {

    const [prendasState, setPrendasState]= useState([])


   

    const getPrendas = async() => {
       
        try {

            const { data } = await calendarApi.get('/prendas');
            const {prendas} = data;
            setPrendasState(prendas)
          
        } catch (error) {
           console.error(error)
  
      
        }
    }


    const paginacionPrendas = async (desde ) =>{
        try{
            const{data} = await calendarApi.get(`/prendas?desde=${desde}&limite=10`);
            console.log(data)
            const {prendas} = data;
            setPrendasState(prendas)

        }catch(error){
            console.error(error)

        }
    }

    const addPrendas = async (prenda, image ) =>{
        try{
            const {_id,...objeto}= prenda
            console.log(objeto)
            const { data } =   await calendarApi.post('/prendas',{...objeto});
            if (!image || !(image instanceof File)) {
                throw new Error('El archivo de la imagen no es válido.');
            }
        
            // Preparar el FormData con la imagen (nombre 'archivo' como espera el backend)
            const formData = new FormData();
            formData.append('archivo', image); // El nombre del campo debe ser 'archivo' (coincidente con el backend)
        
            // Subir la imagen a la actividad usando PUT
            await calendarApi.put(`/uploads/prendas/${data._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Necesario para enviar imágenes
                },
            });
          

        }catch(error){
            console.error(error)

        }
    }

    const updatePrendas = async (prenda, image ) =>{
        try{
            const {_id,...objeto}= prenda
 
            const { data } =   await calendarApi.put(`/prendas/${_id}`,{...objeto});

            if (!image || !(image instanceof File)) {
                throw new Error('El archivo de la imagen no es válido.');
            }
        
            // Preparar el FormData con la imagen (nombre 'archivo' como espera el backend)
            const formData = new FormData();
            formData.append('archivo', image); // El nombre del campo debe ser 'archivo' (coincidente con el backend)
        
            // Subir la imagen a la actividad usando PUT
            await calendarApi.put(`/uploads/prendas/${data._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Necesario para enviar imágenes
                },
            });
          
           
          

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

    const buscarPrendas = async (busqueda ) =>{
        try{
           
            const{data}  =    await calendarApi.get(`/buscar/prendas/${busqueda}`);
            const {results} = data;
            setPrendasState(results)
          

        }catch(error){
            console.error(error)

        }
    }


    
    return {
        //* Propiedades
        prendasState, 


        //* Métodos
  
        getPrendas,
        paginacionPrendas, 
        buscarPrendas,
        setPrendasState,
        addPrendas,
        updatePrendas,
        delentePrendas
        
      
    }

}