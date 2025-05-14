import { useState } from 'react';
import { calendarApi } from '../api';
import { useProducCart } from './useProducCart';





export const useOrden = () => {
     const {deleteProducCart}= useProducCart()
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
            const{data} = await calendarApi.get(`/ordenes?desde=${desde}&limite=10`);
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
           
                data?.productos?.map((element)=>{
                    deleteProducCart(element._id)
                })
                getOrdenes()
                
            } catch (error) {
               console.error(error)
      
          
            }
            
        }

        const updateOrdenes = async (articulo, orders ) =>{
            try{
                const {_id,usuario,fecha,...objeto}= articulo
             
                const {data}= await calendarApi.put(`/ordenes/${_id}`,{...objeto});
                const articuloAnterior = orders.find((element)=> element._id == _id) ;
                console.log(articuloAnterior)
                if(objeto.pago == true && articuloAnterior.pago == false)
                {
                    await calendarApi.put(`/inventario/agregar`,{...data});

                }if (objeto.pago == false && articuloAnterior.pago == true) {
                    await calendarApi.put(`/inventario/quitar`,{...data});
                    
                } 
              
    
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