export interface LoginFormValues {
    username: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message?: string;
    token?: string;
}

export interface FormErrors {
    username?: string;
    password?: string;
}
