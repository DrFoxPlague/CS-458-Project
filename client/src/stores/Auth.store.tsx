import { create } from "zustand";
import { User } from "../types/auth";
import { persist } from "zustand/middleware";

type State = {
    user: User | null;
};

type Action = {
    setUser: (user: User) => void;
};

export const useAuthStore = create<State & Action>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user: User) => set({ user }),
        }),
        { name: "auth" }
    )
);