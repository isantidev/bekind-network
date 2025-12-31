import { useAuth } from "@context/Login";

export function Avatar() {
    const user = useAuth((state) => state.user);

    return (
        <div className="avatar">
            <p>{user?.username.at(0)?.toUpperCase()}</p>
        </div>
    );
}
