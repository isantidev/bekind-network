import { Avatar } from "@components/Avatar";
import Sidebar from "@components/Sidebar";
import { Outlet } from "react-router-dom";
import "@styles/layout.css";

export function Layout() {
    return (
        <div className="layout">
            <header className="layout-header">
                <h1>Bekind - Network</h1>
                <Avatar />
            </header>
            <Sidebar />
            <main className="layout-content">
                <Outlet />
            </main>
        </div>
    );
}
