import { useEffect, useState } from "react";
import { bubbleSort, BubbleSortEvent } from "../utils/bubbleSort";
import { mergeSort, MergeSortEvent } from "../utils/mergeSort";
import { quickSort, QuickSortEvent } from "../utils/quickSort";

type SortingIndices = number[];

interface AnimationStateProps {
	comparing: SortingIndices;
	swapping: SortingIndices;
	setting: { index: number; value: number } | null;
	dividing: SortingIndices;
	merging: { leftStart: number; mid: number; rightEnd: number } | null;
	partitioning: { start: number; end: number; pivotIndex: number } | null;
	pivotIndex: number | null;
	sorted: SortingIndices;
	currentStep: number;
	totalSteps: number;
	isRunning: boolean;
	isDone: boolean;
	stats: { comparisons: number; swaps: number };
}

type SortingEvent = BubbleSortEvent | MergeSortEvent | QuickSortEvent;

export const useSortingAlgorithm = (
	initialArray: number[],
	animationSpeed: number,
	currentAlgorithm: "Bubble Sort" | "Merge Sort" | "Quick Sort"
) => {
	const [array, setArray] = useState([...initialArray]);
	const [originalArray] = useState([...initialArray]);

	const [animationState, setAnimationState] = useState<AnimationStateProps>({
		comparing: [],
		swapping: [],
		setting: null,
		dividing: [],
		merging: null,
		partitioning: null,
		pivotIndex: null,
		sorted: [],
		currentStep: 0,
		totalSteps: 0,
		isRunning: false,
		isDone: false,
		stats: { comparisons: 0, swaps: 0 },
	});

	const [animationEvents, setAnimationEvents] = useState<SortingEvent[]>([]);

	useEffect(() => {
		let result;
		if (currentAlgorithm === "Bubble Sort") {
			result = bubbleSort(initialArray);
		} else if (currentAlgorithm === "Merge Sort") {
			result = mergeSort(initialArray);
		} else if (currentAlgorithm === "Quick Sort") {
			result = quickSort(initialArray);
		}

		if (result) {
			const { events, comparisons, swaps } = result;

			setAnimationEvents(events);
			setAnimationState((prev) => ({
				...prev,
				comparing: [],
				swapping: [],
				setting: null,
				dividing: [],
				merging: null,
				partitioning: null,
				pivotIndex: null,
				sorted: [],
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
			setAnimationState((prev) => ({
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
			setting: null,
			dividing: [],
			merging: null,
			partitioning: null,
			pivotIndex: null,
			currentStep: animationState.currentStep + 1,
		};

		if ("type" in currentEvent) {
			switch (currentEvent.type) {
				case "compare":
					newAnimationState.comparing = currentEvent.indices;
					break;
				case "swap":
					newAnimationState.swapping = currentEvent.indices;
					const [i, j] = currentEvent.indices;
					[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
					break;
				case "set":
					newAnimationState.setting = {
						index: currentEvent.index,
						value: currentEvent.value,
					};
					newArray[currentEvent.index] = currentEvent.value;
					break;
				case "divide":
					newAnimationState.dividing = currentEvent.indices;
					break;
				case "merge":
					newAnimationState.merging = {
						leftStart: currentEvent.leftStart,
						mid: currentEvent.mid,
						rightEnd: currentEvent.rightEnd,
					};
					break;
				case "partition":
					newAnimationState.partitioning = {
						start: currentEvent.start,
						end: currentEvent.end,
						pivotIndex: currentEvent.pivotIndex,
					};
					break;
				case "pivot":
					newAnimationState.pivotIndex = currentEvent.index;
					break;
				case "sorted":
					if ("index" in currentEvent) {
						newAnimationState.sorted = [currentEvent.index];
					} else if ("indices" in currentEvent) {
						newAnimationState.sorted = currentEvent.indices;
					}
					break;
			}
		}

		setArray(newArray);
		setAnimationState(newAnimationState);
	};

	const prevStep = () => {
		if (animationState.currentStep <= 0) return;

		
		const targetStep = animationState.currentStep - 1;

		setArray([...originalArray]);
		setAnimationState((prev) => ({
			...prev,
			comparing: [],
			swapping: [],
			setting: null,
			dividing: [],
			merging: null,
			partitioning: null,
			pivotIndex: null,
			sorted: [],
			currentStep: 0,
		}));

		setTimeout(() => {
			let tempArray = [...originalArray];
			const newState = <AnimationStateProps>{
				comparing: [],
				swapping: [],
				setting: null,
				dividing: [],
				merging: null,
				partitioning: null,
				pivotIndex: null,
				sorted: [],
				currentStep: targetStep,
				totalSteps: animationState.totalSteps,
				isRunning: false,
				isDone: false,
				stats: animationState.stats,
			};

			for (let i = 0; i < targetStep; i++) {
				const event = animationEvents[i];

				if ("type" in event) {
					if (event.type === "swap" && "indices" in event) {
						const [a, b] = event.indices;
						[tempArray[a], tempArray[b]] = [tempArray[b], tempArray[a]];
					} else if (
						event.type === "set" &&
						"index" in event &&
						"value" in event
					) {
						tempArray[event.index] = event.value;
					} else if (event.type === "sorted") {
						if ("index" in event) {
							newState.sorted = [event.index];
						} else if ("indices" in event) {
							newState.sorted = event.indices;
						}
					}
				}
			}

			setArray(tempArray);
			setAnimationState(newState);
		}, 0);
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
		setAnimationState((prev) => ({
			...prev,
			isRunning: true,
		}));
	};

	const pause = () => {
		setAnimationState((prev) => ({
			...prev,
			isRunning: false,
		}));
	};

	const reset = () => {
		setArray([...initialArray]);
		setAnimationState((prev) => ({
			...prev,
			comparing: [],
			swapping: [],
			setting: null,
			dividing: [],
			merging: null,
			partitioning: null,
			pivotIndex: null,
			sorted: [],
			currentStep: 0,
			isRunning: false,
			isDone: false,
		}));
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
