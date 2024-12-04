import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
    ongoingGame: string | null;
    currentQuestion: number;
    correstAnswerCount: number;
};

type Action = {
    setOngoingGame: (game: string) => void;
    setCurrentQuestion: (question: number) => void;
    resetCorrectAnswerCount: () => void;
    increaseCorrectAnswerCount: () => void;
    resetOngoingGame: () => void;
};

export const useOngoingGameStore = create<State & Action>()(
    persist(
        (set) => ({
            ongoingGame: null,
            currentQuestion: 0,
            correstAnswerCount: 0,
            setOngoingGame: (game) => set({ ongoingGame: game }),
            setCurrentQuestion: (question: number) =>
                set({ currentQuestion: question }),
            increaseCorrectAnswerCount: () =>
                set((state) => ({
                    correstAnswerCount: state.correstAnswerCount + 1,
                })),

            resetCorrectAnswerCount: () => set({ correstAnswerCount: 0 }),

            resetOngoingGame: () =>
                set({ ongoingGame: null, currentQuestion: 0 }),
        }),
        {
            name: "ongoingGame",
        }
    )
);
