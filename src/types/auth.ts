interface UserData {
    username: string;
}

export interface AuthState {
    user: UserData | null;
    token: string | null;
    isAuthenticated: boolean;
    _hasHydrated: boolean;
    login: (userData: UserData, token: string) => void;
    logout: () => void;
    setHasHydrated: (state: boolean) => void;
}
