import { create } from "zustand";
import { generateArray } from "../utils/generateArray";

interface VisualizationStore {
	arraySize: number;
	array: number[];
	currentAlgorithm: "Bubble Sort" | "Merge Sort" | "Quick Sort";
	animationSpeed: number;
	isRunning: boolean;
	setArraySize: (size: number) => void;
	generateNewArray: () => void;
	setAnimationSpeed: (speed: number) => void;
	toggleRunning: () => void;
	setCurrentAlgorithm: (
		algorithm: "Bubble Sort" | "Merge Sort" | "Quick Sort"
	) => void;
}

export const useVisualizationStore = create<VisualizationStore>((set) => ({
	arraySize: 10,
	array: [],
	currentAlgorithm: "Bubble Sort",
	animationSpeed: 100,
	isRunning: false,
	setArraySize: (size) => set({ arraySize: size }),
	generateNewArray: () =>
		set((state) => ({ array: generateArray(state.arraySize) })),
	setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
	toggleRunning: () => set((state) => ({ isRunning: !state.isRunning })),
	setCurrentAlgorithm: (algorithm) => set({ currentAlgorithm: algorithm }),
}));
