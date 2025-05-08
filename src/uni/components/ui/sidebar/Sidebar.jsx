import { Link } from 'react-router-dom';
import './sidebar.css'
import clsx from "clsx";
import { useUiStore } from '../../../../hooks/useUiStore';
import { IoCloseOutline, IoSearchOutline, IoTicketOutline, IoPersonOutline, IoLogOutOutline, IoLogInOutline, IoShirtOutline, IoPeopleOutline } from "react-icons/io5";

export const Sidebar = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  let isAuthenticated = false;
  let isAdmin = false;

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
        {isAuthenticated && (
          <>
            <Link to="/profile" onClick={closeMenu} className="menu-link">
              <IoPersonOutline size={30} />
              <span className="menu-text">Perfil</span>
            </Link>

            <Link to="/orders" onClick={closeMenu} className="menu-link">
              <IoTicketOutline size={30} />
              <span className="menu-text">Órdenes</span>
            </Link>
          </>
        )}

        {isAuthenticated && (
          <button className="menu-link" onClick={() => logout()}>
            <IoLogOutOutline size={30} />
            <span className="menu-text">Salir</span>
          </button>
        )}

        {!isAuthenticated && (<>
          <Link to="/auth/login" onClick={closeMenu} className="menu-link">
            <IoLogInOutline size={30} />
            <span className="menu-text">Login</span>
          </Link>
             <Link to="/auth/register" onClick={closeMenu} className="menu-link">
             <IoLogInOutline size={30} />
             <span className="menu-text">Crear cuenta</span>
           </Link>
           </>
        )}

        {/* Admin Menu */}
        {isAdmin && (
          <>
            <div className="menu-separator" />
            <Link to="/admin/products" onClick={closeMenu} className="menu-link">
              <IoShirtOutline size={30} />
              <span className="menu-text">Productos</span>
            </Link>
            <Link to="/admin/orders" onClick={closeMenu} className="menu-link">
              <IoTicketOutline size={30} />
              <span className="menu-text">Órdenes</span>
            </Link>
            <Link to="/admin/users" onClick={closeMenu} className="menu-link">
              <IoPeopleOutline size={30} />
              <span className="menu-text">Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};