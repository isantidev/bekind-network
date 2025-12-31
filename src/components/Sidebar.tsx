import { NavLink, useNavigate } from "react-router-dom";
import { menuItems } from "@utils/menuItems";
import { useAuth } from "@context/Login";
import "@styles/sidebar.css";
import { LogOut } from "lucide-react";

export default function Sidebar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        const { logout } = useAuth.getState();
        logout();
        navigate("/login");
    };

    return (
        <nav className="sidebar-nav">
            <header className="sidebar-logo">
                <img src="/background.svg" alt="Be Kind Network" />
            </header>
            <ul className="sidebar-menu">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? "sidebar-link active"
                                        : "sidebar-link"
                                }
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
            <footer className="sidebar-footer">
                <button onClick={() => handleLogout()}>
                    <LogOut size={16} /> Cerrar Sesión
                </button>
            </footer>
        </nav>
    );
}
