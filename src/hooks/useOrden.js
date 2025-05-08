import { useState } from 'react';
import { calendarApi } from '../api';





export const useOrden = () => {

    const [ordenesState, setOrdenesState]= useState([])


   

    const getOrdenes = async() => {
       
        try {

            const { data } = await calendarApi.get('/ordenes');
            const {ordenes} = data;
            setOrdenesState(ordenes)
          
        } catch (error) {
           console.error(error)
  
      
        }
    }


    const paginacionOrdenes = async (desde ) =>{
        try{
            const{data} = await calendarApi.get(`/ordenes?desde=${desde}&limite=5`);
            console.log(data)
            const {ordenes} = data;
            setOrdenesState(ordenes)

        }catch(error){
            console.error(error)

        }
    }

    const addOrden = async (orden) => {
            try {
               
                const {data } = await calendarApi.post('/ordenes',{...orden})
                console.log(data)
                getOrdenes()
                
            } catch (error) {
               console.error(error)
      
          
            }
            
        }

        const updateOrdenes = async (articulo ) =>{
            try{
                const {_id,usuario,fecha,...objeto}= articulo
                console.log(objeto)
                 await calendarApi.put(`/ordenes/${_id}`,{...objeto});
               
              
    
            }catch(error){
                console.error(error)
    
            }
        }


        const delenteOrdenes = async (id ) =>{
            try{
               
                 await calendarApi.delete(`/ordenes/${id}`);
               
              
    
            }catch(error){
                console.error(error)
    
            }
        }
    

    
    return {
        //* Propiedades
        ordenesState, 


        //* Métodos
  
        getOrdenes,
        paginacionOrdenes,
        addOrden,
        updateOrdenes,
        delenteOrdenes
      
    }

}