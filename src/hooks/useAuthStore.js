import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { useNavigate } from 'react-router-dom';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';
import{useUserStore} from './index'


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const{startUserActive} =  useUserStore()

    const startLogin = async({ email, password }) => {
       
        try {
            const {data } = await calendarApi.post('/auth/login',{correo: email, password });
            const {usuario, token} = data 
            if(!usuario.confirmado){
                alert('Usuario no confirmado, una vez creado el ususuario debe esperar ser verificado por el equipo administrativo de Emaus Hombres')
                return
            }
            localStorage.setItem('token', token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ nombre: usuario.nombre, rol: usuario.rol ,uid: usuario.uid }) );


                startUserActive( usuario)
                navigate('/actividades');


      


    
            

           
    
            
        } catch (error) {
            dispatch( onLogout('Credenciales incorrectas') );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const startRegister = async({ correo, password, nombre, rol, direccion,telefono, edad, iglesia}, image) => {
        dispatch( onChecking() );
        try {
         
            const { data } = await calendarApi.post('/usuarios',{ correo, password, nombre, rol, direccion,telefono, edad, iglesia });
           
            const {usuario} = data 

            dispatch( onLogin({ nombre: usuario.name, uid: usuario.uid }) );

              
            if (!image || !(image instanceof File)) {
                throw new Error('El archivo de la imagen no es válido.');
            }
        
            // Preparar el FormData con la imagen (nombre 'archivo' como espera el backend)
            const formData = new FormData();
            formData.append('archivo', image); // El nombre del campo debe ser 'archivo' (coincidente con el backend)
        
            // Subir la imagen a la actividad usando PUT
            await calendarApi.put(`/uploads/usuarios/${usuario.uid }`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Necesario para enviar imágenes
                },
            });
             
            

          
            
        } catch (error) {
            dispatch( onLogout( error.response.data?.msg || '--' ) );
            console.log('catch')
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }


    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() );

        try {
            const { data } = await calendarApi.get('auth/renew');
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid }) );
       
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

    const startLogout = () => {
        localStorage.clear();
       
        dispatch( onLogout() );
       
    }



    return {
        //* Propiedades
        errorMessage,
        status, 
        user, 

        //* Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }

}