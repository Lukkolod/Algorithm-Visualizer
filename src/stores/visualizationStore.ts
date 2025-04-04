import { create } from "zustand";
import { generateArray } from "../utils/generateArray";

interface VisualizationStore {
	arraySize: number;
	array: number[];
	currentAlgorithm: "Bubble Sort" | "Merge Sort" | "Quick Sort" | "A* Search";
	animationSpeed: number;
	isRunning: boolean;
	setArraySize: (size: number) => void;
	generateNewArray: () => void;
	setAnimationSpeed: (speed: number) => void;
	toggleRunning: () => void;
	setCurrentAlgorithm: (
		algorithm: "Bubble Sort" | "Merge Sort" | "Quick Sort" | "A* Search"
	) => void;
}

export const useVisualizationStore = create<VisualizationStore>((set) => ({
	arraySize: 10,
	array: [3, 4, 1, 2, 3, 6, 4, 3, 2, 4],
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
