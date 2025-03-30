
export type BubbleSortEvent =
	| { type: "compare"; indices: [number, number] }
	| { type: "swap"; indices: [number, number] }
	| { type: "sorted"; index: number };

export const bubbleSort = (
	array: number[]
): {
	sortedArray: number[];
	events: BubbleSortEvent[];
	comparisons: number;
	swaps: number;
} => {
	const arr = [...array];
	const n = arr.length;
	const events: BubbleSortEvent[] = [];
	let comparisons = 0;
	let swaps = 0;

	let swapped = false;

	let sortedElements = 0;

	do {
		swapped = false;
		for (let i = 0; i < n - 1 - sortedElements; i++) {
			events.push({
				type: "compare",
				indices: [i, i + 1],
			});
			comparisons++;
			if (arr[i] > arr[i + 1]) {
				[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];

				events.push({
					type: "swap",
					indices: [i, i + 1],
				});
				swaps++;

				swapped = true;
			}
		}
		if (swapped) {
			events.push({ type: "sorted", index: n - 1 - sortedElements });
			sortedElements++;
		}
	} while (swapped);

    for (let i = 0; i < n; i++) {
        events.push({ type: "sorted", index: i });
    }

	return {
		sortedArray: arr,
		events,
		comparisons,
		swaps,
	};
};


