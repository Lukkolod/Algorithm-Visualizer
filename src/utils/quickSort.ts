export type QuickSortEvent =
	| { type: "pivot"; index: number }
	| { type: "compare"; indices: [number, number] }
	| { type: "swap"; indices: [number, number] }
	| { type: "partition"; start: number; end: number; pivotIndex: number }
	| { type: "sorted"; indices: number[] };

export const quickSort = (
	array: number[]
): {
	sortedArray: number[];
	events: QuickSortEvent[];
	comparisons: number;
	swaps: number;
} => {
	const arr = [...array];
	const events: QuickSortEvent[] = [];
	let comparisons = 0;
	let swaps = 0;

	function quickSortHelper(start: number, end: number) {
		if (start >= end) return;

		// Partition the array and get the pivot index
		const pivotIndex = partition(start, end);

		// Recursively sort the left and right parts
		quickSortHelper(start, pivotIndex - 1);
		quickSortHelper(pivotIndex + 1, end);
	}

	function partition(start: number, end: number): number {
		// Choose the last element as pivot
		const pivot = arr[end];
		events.push({
			type: "pivot",
			index: end,
		});

		let i = start - 1;

		for (let j = start; j < end; j++) {
			events.push({
				type: "compare",
				indices: [j, end],
			});
			comparisons++;

			if (arr[j] <= pivot) {
				i++;

				events.push({
					type: "swap",
					indices: [i, j],
				});
				[arr[i], arr[j]] = [arr[j], arr[i]];
				swaps++;
			}
		}

		events.push({
			type: "swap",
			indices: [i + 1, end],
		});
		[arr[i + 1], arr[end]] = [arr[end], arr[i + 1]];
		swaps++;

		// Record partition event
		events.push({
			type: "partition",
			start,
			end,
			pivotIndex: i + 1,
		});

		// Mark the pivot as sorted
		events.push({
			type: "sorted",
			indices: [i + 1],
		});

		return i + 1;
	}

	quickSortHelper(0, arr.length - 1);

	// Mark the entire array as sorted at the end
	const allIndices = Array.from({ length: arr.length }, (_, i) => i);
	events.push({
		type: "sorted",
		indices: allIndices,
	});

	return {
		sortedArray: arr,
		events,
		comparisons,
		swaps,
	};
};
