import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ButtonState {
  variant: string;
  size: string;
  roundness: string;
  bgColor: string;
  textColor: string;
  emoji: string;
  setVariant: (variant: string) => void;
  setSize: (size: string) => void;
  setRoundness: (roundness: string) => void;
  setBgColor: (color: string) => void;
  setTextColor: (color: string) => void;
  setEmoji: (emoji: string) => void;
  resetCustomization: () => void;
}

const initialState = {
  variant: "default",
  size: "default",
  roundness: "rounded-md",
  bgColor: "#000000",
  textColor: "#ffffff",
  emoji: "",
};

export const useButtonStore = create<ButtonState>()(
  persist(
    (set) => ({
      ...initialState,
      setVariant: (variant) => set({ variant }),
      setSize: (size) => set({ size }),
      setRoundness: (roundness) => set({ roundness }),
      setBgColor: (bgColor) => set({ bgColor }),
      setTextColor: (textColor) => set({ textColor }),
      setEmoji: (emoji) => set({ emoji }),
      resetCustomization: () => set(initialState),
    }),
    {
      name: "button-customization",
    }
  )
);
