import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

export const useBearStore = create(
  devtools(
    persist(
      (set, get) => ({
        bears: 0,
        addABear: () => set({ bears: get().bears + 1 }),
      }),
      {
        name: "session-token",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
