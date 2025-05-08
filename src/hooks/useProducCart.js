import { useDispatch, useSelector } from 'react-redux';
import { getProducCard, addProducCard, onupdateProducActive,  deleteProducCard} from '../store';
import { calendarApi } from '../api';


export const useProducCart = () => {

    const dispatch = useDispatch();

    const { 
        producActive, producCard
    } = useSelector( state => state.producCart );

    const getProducCart = async () => {
        try {

            const { data } = await calendarApi.get('/productos/user');
           
            dispatch( getProducCard(data) )
            
        } catch (error) {
           console.error(error)
  
      
        }
        
    }

    const addProducCart = async (produc) => {
        try {
            const {_id,usuario, ...producto}= produc
            const {data } = await calendarApi.post('/productos',{...producto})
            dispatch( addProducCard( data) )
            
        } catch (error) {
           console.error(error)
  
      
        }
        
    }

    const deleteProducCart = async (id) => {
        try {
           
             await calendarApi.delete(`/productos/${id}`)
            dispatch(  deleteProducCard( id) )
            
        } catch (error) {
           console.error(error)
  
      
        }
        
    }

    const paginacionProducCart = async (desde ) =>{
        try{
            const{data} = await calendarApi.get(`/productos?desde=${desde}&limite=5`);
            const {productos} = data;
        

            dispatch( getProducCard(productos) )

        }catch(error){
            console.error(error)

        }
    }

 const getProducActive = (produc) =>{
    dispatch( onupdateProducActive(produc) )

 }

    const toggleDateModal = () => {
        (isDateModalOpen)
            ? openDateModal()
            : closeDateModal();
    }



    return {
        //* Propiedades
        producActive,
         producCard,

        //* Métodos
        paginacionProducCart,
        getProducCart,
        toggleDateModal,
        getProducActive,
        addProducCart,
        deleteProducCart
    }

}