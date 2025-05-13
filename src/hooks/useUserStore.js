import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { getUserActive, getUsers, deleteUser, userPago} from '../store';
import { calendarApi } from '../api';





export const useUserStore = () => {

    const {   users , userActive } = useSelector( state => state.user );
    const dispatch = useDispatch();
     const [users2, setUser2] = useState([]);
       // Cargar actividades desde la API
       useEffect(() => {
         setUser2(users);
       }, [users]);

    const startUserActive = async(user) => {
       
        try {

            dispatch( getUserActive(user) );
            
        } catch (error) {
           console.error(error)
  
      
        }
    }


    const startUserPago= async() => {
       
        try {

            const {materias, _id, nombre, user_id} = userActive

            const { dataE } = await calendarApi.put(`/estudiantes/${_id}`,{ nombre, user_id,
                pago:false, materias  })
           

            dispatch( userPago() );
            
        } catch (error) {
           console.error(error)
  
      
        }
    }

    const startgetUsers = async() => {
      
        try {
         
            const { data } = await calendarApi.get('/usuarios');

            
            dispatch( getUsers(data.usuarios) );   
     
        } catch (error) {
            console.error(error)
        }
    }
    const paginacionUseres = async (desde ) =>{
        try{
            const{data} = await calendarApi.get(`/usuarios?desde=${desde}&limite=10`);
            const {usuarios} = data;
            dispatch( getUsers(usuarios) );   

        }catch(error){
            console.error(error)

        }
    }


    const startaddUser = async(user, image) => {
       

        try {
            const { data } = await calendarApi.post('/usuarios',{...user});
             
        
                 
            if (!image || !(image instanceof File)) {
                throw new Error('El archivo de la imagen no es válido.');
            }
        
            // Preparar el FormData con la imagen (nombre 'archivo' como espera el backend)
            const formData = new FormData();
            formData.append('archivo', image); // El nombre del campo debe ser 'archivo' (coincidente con el backend)
        
            // Subir la imagen a la actividad usando PUT
            await calendarApi.put(`/uploads/usuarios/${data.usuario.uid}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Necesario para enviar imágenes
                },
            });


             
       
        } catch (error) {
            console.error(error)
        }
    }

    const startUpdateUser = async(user, image) => {
        try {
            
             const{uid,confirmado,password, ...objeto } = user
             if(confirmado == 'on')
             {
                objeto.confirmado = true
             }else{
                objeto.confirmado = false  
             }
             if(password != '')
                {
                   objeto.password = password
                }
                
                const { data } =  await calendarApi.put(`/usuarios/${uid}`,{...objeto });
                console.log(data);
          
                     
            if (!image || !(image instanceof File)) {
                throw new Error('El archivo de la imagen no es válido.');
            }
        
            // Preparar el FormData con la imagen (nombre 'archivo' como espera el backend)
            const formData = new FormData();
            formData.append('archivo', image); // El nombre del campo debe ser 'archivo' (coincidente con el backend)
        
            // Subir la imagen a la actividad usando PUT
            await calendarApi.put(`/uploads/usuarios/${data.uid}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Necesario para enviar imágenes
                },
            });
             
 
        } catch (error) {
            console.error(error)
        }
       
    }

    const startUpdateUserActiveM = async(arrayMateriasp) => {

        try {
            const {materias, _id, nombre, user_id} = userActive
            const materiasUserP = materias.map((element) => 
                arrayMateriasp.find(materia => materia.clave == element.clave) ? {...element,tipo: 'POR_TOMAR'} :  element
           
        )
        
        const { dataE } = await calendarApi.put(`/maestros/${_id}`,{ nombre, user_id, materias: materiasUserP  })
        console.log(dataE)

            
         
        } catch (error) {
            console.error(error)
        }
       
    }

    const startUpdateUserActiveE = async(arrayMateriasp) => {

        try {
            const {materias, _id, nombre, user_id} = userActive
            const materiasUserP = materias.map((element) => 
                arrayMateriasp.find(materia => materia.clave == element.clave) ? {...element,tipo: 'POR_TOMAR'} :  element
           
        )
        
        const { dataE } = await calendarApi.put(`/estudiantes/${_id}`,{ nombre, user_id,
            seleccion:true, materias: materiasUserP  })
       

            
         
        } catch (error) {
            console.error(error)
        }
       
    }


    const startUpdateNota = async(materiaM,estudiante) => {

        try {
           const estudiantesA = materiaM?.estudiantes?.map((element) => element.nombre == estudiante.nombre?   estudiante : element   )
            const materiaMA = {...materiaM, estudiantes: estudiantesA}
            
            const {materias, _id, nombre, user_id} = userActive
            const materiasNotaA = materias.map((element) => 
                materiaMA.clave == element.clave ? {...materiaMA} :  element
           
        )
       await calendarApi.put(`/maestros/${_id}`,{ nombre, user_id, materias: materiasNotaA  })


      const {data} = await calendarApi.get(`/estudiantes/user/${estudiante.uid}`)
      const materiasNotaAE = data?.materias?.map(element => materiaM.clave == element.clave?  {...materiaMA, nota: estudiante.nota }  : element)
      console.log(materiasNotaAE)


      await calendarApi.put(`/estudiantes/${data._id}`,{ nombre: data.nombre, user_id: data.user_id , materias: materiasNotaAE  })
     
       

       
      

            
         
        } catch (error) {
            console.error(error)
        }
       
    }



    const startDeleteMateiras = async(materiasd) => {
   
        try {

            const {materias, _id, nombre, user_id} = userActive
            const materiasUserP = materias.map((element) => 
                materiasd.find(materia => materia.clave == element.clave) ? {...element,tipo: 'NO_TOMADA', nota: [0,0,0,0]} :  element
           
        )
        
        const { dataE } = await calendarApi.put(`/estudiantes/${_id}`,{ nombre, user_id,
             materias: materiasUserP  })
        } catch (error) {
            console.error(error)
        }
    }

    const startDeleteUser = async(id) => {
   
        try {
            await calendarApi.delete(`/usuarios/${ id }` );
            dispatch( deleteUser(id) );
        } catch (error) {
            console.error(error)
        }
    }



    return {
        //* Propiedades
        users2, 
        userActive, 

        //* Métodos
        startUserPago,
        startUserActive,
        startgetUsers,
        paginacionUseres,
        startaddUser,
        startDeleteMateiras,
        startUpdateUser,
        startDeleteUser,
        startUpdateNota,
        startUpdateUserActiveM,
        startUpdateUserActiveE
    }

}