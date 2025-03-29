import { create } from "zustand";

interface SideBarStore {
    isOpen: boolean;
    toggleOpen: () => void;
}

export const useSideBarStore = create<SideBarStore>((set) => ({
	isOpen: false,
	toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
