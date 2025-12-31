import { LoginForm } from "@components/LoginForm";
import "@styles/login.css";

export default function LoginPage() {
    return (
        <main className="loginPage">
            <div className="loginFormContainer">
                <img src="/logo-bekind.webp" alt="Bekind logo" />
                <fieldset className="loginFieldset">
                    <legend>
                        ¡Empieza a conectar tu comunidad ante buenas acciones!
                    </legend>

                    <LoginForm />
                </fieldset>
            </div>
        </main>
    );
}
