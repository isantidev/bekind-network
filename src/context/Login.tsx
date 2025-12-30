import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthState } from "@types/auth";

export const useAuth = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            _hasHydrated: false,

            login: (userData, token) =>
                set({
                    user: userData,
                    token: token,
                    isAuthenticated: true,
                }),

            logout: () =>
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                }),

            setHasHydrated: (state) => set({ _hasHydrated: state }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);
