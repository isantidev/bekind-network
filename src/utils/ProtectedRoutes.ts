import { useAuth } from "@context/Login";
import { redirect } from "react-router-dom";

const waitForHydration = () => {
    return new Promise<void>((resolve) => {
        const check = () => {
            if (useAuth.getState()._hasHydrated) {
                resolve();
            } else {
                setTimeout(check, 10);
            }
        };
        check();
    });
};

export async function authLoader() {
    await waitForHydration();

    const { isAuthenticated } = useAuth.getState();
    if (isAuthenticated) return redirect("/dashboard");

    return null;
}

export async function protectedLoader() {
    await waitForHydration();

    const { isAuthenticated } = useAuth.getState();
    if (!isAuthenticated) return redirect("/login");

    return null;
}
