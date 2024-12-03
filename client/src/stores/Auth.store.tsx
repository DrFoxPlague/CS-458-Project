import { create } from "zustand";
import { AuthState } from "../types/auth";

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: async () => {
        try {
            const response = await fetch("http://localhost:4000/auth/me", {
                credentials: "include", // Ensure cookies/session are sent
            });

            if (response.ok) {
                const user = await response.json();
                set({ user }); // Set user in the store
            } else {
                console.error("Failed to fetch authenticated user");
            }
        } catch (err) {
            console.error("Error fetching user:", err);
        }
    }
}));