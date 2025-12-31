import { useAuth } from "@context/Login";

export default function DashboardPage() {
    const { logout } = useAuth();

    return (
        <>
            <p>HELLOOOO</p>
            <button onClick={() => logout()}> hola</button>
        </>
    );
}
