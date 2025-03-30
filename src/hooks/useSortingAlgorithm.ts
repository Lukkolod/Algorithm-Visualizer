import { useEffect, useState } from "react";
import { bubbleSort, BubbleSortEvent } from "../utils/bubbleSort";

type SortingIndices = [number, number] | [];

interface AnimationStateProps {
	comparing: SortingIndices;
	swapping: SortingIndices;
	sorted: number;
	currentStep: number;
	totalSteps: number;
	isRunning: boolean;
	isDone: boolean;
	stats: { comparisons: number; swaps: number };
}

export const useSortingAlgorithm = (
	initialArray: number[],
	animationSpeed: number,
	currentAlgorithm: "Bubble Sort" | "Merge Sort" | "Quick Sort"
) => {
	const [array, setArray] = useState([...initialArray]);

	const [animationState, setAnimationState] = useState<AnimationStateProps>({
		comparing: [],
		swapping: [],
		sorted: 0,
		currentStep: 0,
		totalSteps: 0,
		isRunning: false,
		isDone: false,
		stats: { comparisons: 0, swaps: 0 },
	});

	const [animationEvents, setAnimationEvents] = useState<BubbleSortEvent[]>([]);

	useEffect(() => {
		if (currentAlgorithm === "Bubble Sort") {
			const { sortedArray, events, comparisons, swaps } =
				bubbleSort(initialArray);

			setAnimationEvents(events);

			setAnimationState((prev) => ({
				...prev,
                sorted: -1,
				totalSteps: events.length,
				currentStep: 0,
				isDone: false,
				stats: { comparisons, swaps },
			}));
			setArray([...initialArray]);
		}
	}, [initialArray, currentAlgorithm]);

	const nextStep = () => {
		if (animationState.currentStep >= animationState.totalSteps) {
			setAnimationEvents((prev) => ({
				...prev,
				isDone: true,
				isRunning: false,
			}));
			return;
		}

		const currentEvent = animationEvents[animationState.currentStep];
		const newArray = [...array];

		const newAnimationState = <AnimationStateProps>{
			...animationState,
			comparing: [],
			swapping: [],
			currentStep: animationState.currentStep + 1,
		};

		if (currentEvent.type === "compare") {
			newAnimationState.comparing = currentEvent.indices;
		} else if (currentEvent.type === "swap") {
			newAnimationState.swapping = currentEvent.indices;
			const [i, j] = currentEvent.indices;
			[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
		} else if (currentEvent.type === "sorted") {
			newAnimationState.sorted = animationState.sorted + 1;
		}
		setArray(newArray);
		setAnimationState(newAnimationState);
	};

	const prevStep = () => {
		if (animationState.currentStep <= 0) return;
		const previousEvent = animationEvents[animationState.currentStep - 1];
		const newArray = [...array];

		const newAnimationState = <AnimationStateProps>{
			...animationState,
			comparing: [],
			swapping: [],
			currentStep: animationState.currentStep - 1,
		};

		if (previousEvent.type === "swap") {
			newAnimationState.swapping = previousEvent.indices;
			const [i, j] = previousEvent.indices;
			[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
		} else if (previousEvent.type === "compare") {
			newAnimationState.comparing = [];
		} else if (previousEvent.type === "sorted") {
            newAnimationState.sorted = Math.max(0, animationState.sorted - 1);
		}
		setArray(newArray);
		setAnimationState(newAnimationState);
	};

	useEffect(() => {
		let timeoutId: number | undefined;

		if (animationState.isRunning && !animationState.isDone) {
			timeoutId = setTimeout(() => {
				nextStep();
			}, animationSpeed);
		}

		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [animationState.isRunning, animationState.currentStep, animationSpeed]);

	const play = () => {
		setAnimationState((prev) => {
			return {
				...prev,
				isRunning: true,
			};
		});
	};

	const pause = () => {
		setAnimationState((prev) => {
			return {
				...prev,
				isRunning: false,
			};
		});
	};

	const reset = () => {
		setArray([...initialArray]);
        setAnimationState((prev) => ({
            ...prev,
            comparing: [],
		 	swapping: [],
		 	sorted: 0,
		 	currentStep: 0,
		 	isRunning: false,
		 	isDone: false,
			stats: { comparisons: 0, swaps: 0 },
        }))
	};

	return {
		array,
		animationState,
		controls: {
			nextStep,
			prevStep,
			play,
			pause,
			reset,
		},
	};
};
