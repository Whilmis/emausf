
import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

/*

import{UniPage}  from '../uni/pages/UniPage'

import { useAuthStore } from '../hooks';
import { AdministrarPage } from '../uni/pages/AdministrarPage';
import { InformacionesPage } from '../uni/pages/InformacionesPage';
import { SolicitudesE } from '../uni/pages/SolicitudesE';
import { SolicitudesM } from '../uni/pages/SolicitudesM';
import { AdministrarPagoPage } from '../uni/pages/AdministrarPagoPage';
import {CalendarioPage} from '../uni/pages/CalendarioPage'
import {CalificacionesE} from '../uni/pages/CalificacionesE'
import {RetiroEPage} from '../uni/pages/RetiroEPage'
import {SolicitudesAEPage} from '../uni/pages/SolicitudesAEPage'
import { VerCalificacionPage } from '../uni/pages/VerCalificacionPage';
import { SelecionAsignaturaPage } from '../uni/pages/SelecionAsignaturaPage';
import { PagoPage } from '../uni/pages/PagoPage';
import { RetiroCicloPage } from '../uni/pages/RetiroCicloPage';
import { RetiroAsignaturaPage } from '../uni/pages/RetiroAsignaturaPage';
import { CalendarioMPage } from '../uni/pages/CalendarioMPage';
import { AsignaturasMPage } from '../uni/pages/AsignaturasMPage';
import { PublicarCalificacionesPage } from '../uni/pages/PublicarCalificacionesPage';
import { HomePage } from '../uni/pages/HomePege';*/
import { useAuthStore } from '../hooks/useAuthStore';
import { LoginPage } from '../auth';
import HomeE from '../uni/pages/HomeE';
import Retiros from '../uni/pages/Retiros';
import Parroquias from '../uni/pages/Parroquias';
import Gallery from '../uni/pages/Gallery';
import Calendario from '../uni/pages/Calendario';
import { ResgisterPage } from '../auth/pages/RegisterPage';
import Productos from '../Tienda/Productos';
import Actividades from '../Tienda/Actividades';
import Prendas from '../Tienda/Prendas';
import ProductDetail from '../Tienda/ProductDetail';
import CartPage from '../Tienda/CartPage';
import CheckoutPage from '../Tienda/CheckoutPage';
import ArticulosPage from '../admin/ArticulosPage';
import ActividadesPage from '../admin/ActividadesPage';
import PrendaPage from '../admin/PrendaPage';
import UserPage from '../admin/UserPage';
import OrderPage from '../admin/OrderPage';




export const AppRouter = () => {

    const { status,checkAuthToken,  user } = useAuthStore();
     const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';
     
    

    useEffect(() => {
        checkAuthToken();
    }, [])

 let rol = user.rol
  
        
 
    


    if ( status === 'checking' ) {
        return (
            <h3>Cargando...</h3>
        )
    }

    
    return (
        <Routes>

                 <Route path="/" element={ <HomeE /> } />
                 <Route path="/retiros" element={ <Retiros /> } />
                 <Route path="/parroquias" element={ <Parroquias /> } />
                 <Route path="/gallery" element={ <Gallery /> } />
                 <Route path="/calendario" element={ <Calendario /> } />
                 <Route path="/auth/login" element={ <LoginPage /> } />
                 <Route path="/auth/register" element={ <ResgisterPage /> } />
                 <Route path="/articulos" element={ <Productos /> } />
                <Route path="/actividades" element={ <Actividades /> } />
                <Route path="/prendas" element={ <Prendas /> } />
                <Route path="/detalle" element={ <ProductDetail /> } />
                <Route path="/card" element={ <CartPage /> } />
                <Route path="/pago" element={<CheckoutPage />} />
                <Route path="/admin/articulos" element={<ArticulosPage />} />
                <Route path="/admin/actividades" element={<ActividadesPage />} />
                <Route path="/admin/prendas" element={<PrendaPage />} />
                <Route path="/admin/usuarios" element={<UserPage />} />
                <Route path="/admin/ordenes" element={<OrderPage />} />
                         

                
                 
       
           
                
            {
                ( status === 'not-authenticated')  
                    ? (
                        <>
              
                        </>
                    )
                    :   ( rol === 'USER_ROLE')  
                    ? (
                        <>

                      <Route path="/" element={ <Home /> } />
                      <Route path="/retiros" element={ <Retiros /> } />
                      <Route path="/parroquias" element={ <Parroquias /> } />
                      <Route path="/gallery" element={ <Gallery /> } />
                      <Route path="/calendario" element={ <Calendario /> } />
                      <Route path="/auth/login" element={ <Navigate to="/" /> } />
                      <Route path="/auth/register" element={ <ResgisterPage /> } />
                      <Route path="/articulos" element={ <Productos /> } />
                      <Route path="/actividades" element={ <Actividades /> } />
                      <Route path="/prendas" element={ <Prendas /> } />
                      <Route path="/detalle" element={ <ProductDetail /> } />
                      <Route path="/card" element={ <CartPage /> } />
                      <Route path="/pago" element={<CheckoutPage />} />

                          
                        </>
                    )
                    : ( rol === 'ADMIN_ROLE')  
                    ? (
                        <>
                           <Route path="/" element={ <Home /> } />
                      <Route path="/retiros" element={ <Retiros /> } />
                      <Route path="/parroquias" element={ <Parroquias /> } />
                      <Route path="/gallery" element={ <Gallery /> } />
                      <Route path="/calendario" element={ <Calendario /> } />
                      <Route path="/auth/login" element={ <Navigate to="/" /> } />
                      <Route path="/auth/register" element={ <ResgisterPage /> } />
                      <Route path="/articulos" element={ <Productos /> } />
                      <Route path="/actividades" element={ <Actividades /> } />
                      <Route path="/prendas" element={ <Prendas /> } />
                      <Route path="/detalle" element={ <ProductDetail /> } />
                      <Route path="/card" element={ <CartPage /> } />
                      <Route path="/pago" element={<CheckoutPage />} />
                        </>
                    )
                    : (
                        <>

                 <Route path="/" element={ <Home /> } />
                 <Route path="/retiros" element={ <Retiros /> } />
                 <Route path="/parroquias" element={ <Parroquias /> } />
                 <Route path="/gallery" element={ <Gallery /> } />
                 <Route path="/calendario" element={ <Calendario /> } />
                 <Route path="/auth/login" element={ <LoginPage /> } />
                 <Route path="/auth/register" element={ <ResgisterPage /> } />
                        </>
                    )
            }

        </Routes>
    )
}
