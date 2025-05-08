import { Link, useNavigate } from 'react-router-dom';
import './sidebar.css'
import clsx from "clsx";
import { useUiStore } from '../../../../hooks/useUiStore';
import{useUserStore } from '../../../../hooks/useUserStore';
import{useAuthStore} from '../../../../hooks/useAuthStore'
import { IoCloseOutline, IoSearchOutline, IoTicketOutline, IoPersonOutline, IoLogOutOutline, IoLogInOutline, IoShirtOutline, IoPeopleOutline } from "react-icons/io5";

export const SidebarUser = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
   const { userActive  }= useUserStore()
   const { startLogout } = useAuthStore();
   let navigate = useNavigate();
   const logout = () =>{
    startLogout()
    navigate("/")

  }
 

  const closeMenu = () => {
    closeDateModal(); // Usa toggleDateModal para cerrar el menú
  };

  return (
    <div>
      {/* Background Overlay */}
      {isDateModalOpen && <div className="background-overlay" />}

      {/* Blur Background */}
      {isDateModalOpen && (
        <div onClick={closeDateModal} className="background-blur" />
      )}

      {/* Sidebar Menu */}
      <nav className={clsx("sidebar-menu", { "sidebar-hidden": !isDateModalOpen })}>
        <IoCloseOutline size={50} className="close-button" onClick={closeMenu} />

     

        {/* User Menu */}
        {userActive.nombre !== undefined && (
          <>
            <Link to="/profile" onClick={closeMenu} className="menu-link">
              <IoPersonOutline size={30} />
              <span className="menu-text">Perfil</span>
            </Link>

            <Link to="/orders" onClick={closeMenu} className="menu-link">
              <IoTicketOutline size={30} />
              <span className="menu-text">Mis Órdenes</span>
            </Link>
            <button className="menu-link" onClick={() => logout()}>
            <IoLogOutOutline size={30} />
            <span className="menu-text">Salir</span>
          </button>
          </>
        )}

    

      

        {/* Admin Menu */}
        {userActive.rol == "ADMIN_ROLE" && (
          <>
            <div className="menu-separator" />
          
            <Link to="/admin/ordenes" onClick={closeMenu} className="menu-link">
              <IoTicketOutline size={30} />
              <span className="menu-text">Órdenes</span>
            </Link>
            <Link to="/admin/actividades" onClick={closeMenu} className="menu-link">
              <IoTicketOutline size={30} />
              <span className="menu-text">Administrar Actividades</span>
            </Link>
            <Link to="/admin/articulos" onClick={closeMenu} className="menu-link">
              <IoTicketOutline size={30} />
              <span className="menu-text">Administrar Articulos</span>
            </Link>  <Link to="/admin/prendas" onClick={closeMenu} className="menu-link">
              <IoShirtOutline size={30} />
              <span className="menu-text">Administrar Prendas</span>
            </Link>
            <Link to="/admin/usuarios" onClick={closeMenu} className="menu-link">
              <IoPeopleOutline size={30} />
              <span className="menu-text">Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};