import { useAuth } from "@context/Login";
import type {
    FormErrors,
    LoginFormValues,
    LoginResponse,
} from "@tstypes/login";
import { useFormik } from "formik";
import { Mail, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Validación de la semántica del correo y contraseña
const validateForm = (values: LoginFormValues): FormErrors => {
    const errors: FormErrors = {};

    // Validación del correo electrónico
    if (!values.username) {
        errors.username = "Correo electrónico es requerido";
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
    ) {
        errors.username =
            "Correo electrónico inválido, por favor ingresa uno válido";
    }

    // Validación de la contraseña
    if (!values.password) {
        errors.password = "Contraseña es requerida";
    }

    return errors;
};

const API_LOGIN_URL =
    import.meta.env.VITE_USE_MOCKS === "true"
        ? import.meta.env.VITE_MOCK_AUTH_ENDPOINT
        : import.meta.env.VITE_AUTH_ENDPOINT;

// Función para manejar el inicio de sesión
const loginUser = async (values: LoginFormValues): Promise<LoginResponse> => {
    try {
        const response = await fetch(API_LOGIN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        console.log("API", API_LOGIN_URL);

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message:
                    data.message ||
                    "Correo electrónico o contraseña inválidos.",
            };
        }

        return {
            success: true,
            token: data.token,
        };
    } catch (error) {
        return {
            success: false,
            message: "Error de red, por favor intenta nuevamente.",
        };
    }
};

export function LoginForm() {
    const [submitError, setSubmitError] = useState<string>("");
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const auth = useAuth();
    const navigate = useNavigate();

    const redirect = (path: string) => {
        navigate(path);
    };

    const formik = useFormik<LoginFormValues>({
        initialValues: {
            username: "",
            password: "",
        },
        validateOnMount: true,
        validate: validateForm,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitError("");

            await new Promise((r) => setTimeout(r, 2000)); // Simula retardo de red
            const result = await loginUser(values);

            if (result.success) {
                // Manejo de inicio de sesión exitoso, token guardado.
                auth.login({ username: values.username }, result.token!);
                redirect("/dashboard");
            } else {
                setSubmitError(result.message || "Inicio de sesión fallido.");
            }

            setSubmitting(false);
        },
    });

    // Determina si el formulario puede ser enviado
    const canSubmit =
        formik.isValid &&
        Boolean(formik.values.username && formik.values.username.trim()) &&
        Boolean(formik.values.password && formik.values.password.trim()) &&
        !formik.isSubmitting;

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={"formInput"}>
                <label htmlFor="input-username">Correo Electrónico</label>
                <div>
                    <Mail className="inputIcon iconItem" />
                    <input
                        id="input-username"
                        name="username"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        placeholder="tucorreo@yopmail.com"
                        required={true}
                    />
                </div>
                {formik.touched.username && formik.errors.username && (
                    <span className="errorMessage">
                        <AlertCircle />
                        <span>{formik.errors.username}</span>
                    </span>
                )}
            </div>
            <div className={"formInput"}>
                <label htmlFor="input-password">Contraseña</label>
                <div>
                    <Lock className="inputIcon iconItem" />
                    <input
                        id="input-password"
                        name="password"
                        type={isPasswordVisible ? "text" : "password"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        placeholder="••••••••"
                        required={true}
                    />
                    <span
                        className="inputIcon showPassword"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                        {isPasswordVisible ? <Eye /> : <EyeOff />}
                    </span>
                </div>
                {formik.touched.password && formik.errors.password && (
                    <span className="errorMessage">
                        <AlertCircle />
                        <span>{formik.errors.password}</span>
                    </span>
                )}
            </div>
            {/* Enlace para restablecer la contraseña */}
            <a href="" className="restorePass">
                Restablecer Contraseña
            </a>
            <button
                type="submit"
                style={{
                    color: "#fff",
                    backgroundColor: canSubmit ? "#1E1B4D" : "#8f8d93",
                    cursor: canSubmit ? "pointer" : "not-allowed",
                    opacity: canSubmit ? 1 : 0.6,
                }}
                disabled={!canSubmit}
            >
                {formik.isSubmitting ? "Ingresando..." : "Ingresar"}
            </button>
            {submitError && (
                <small className="errorMessage">
                    <AlertCircle />
                    <span>{submitError}</span>
                </small>
            )}
        </form>
    );
}
