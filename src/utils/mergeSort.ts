export type MergeSortEvent =
	| { type: "divide"; indices: [number, number] }
	| { type: "compare"; indices: [number, number] }
	| { type: "set"; index: number; value: number }
	| { type: "merge"; leftStart: number; mid: number; rightEnd: number }
	| { type: "sorted"; indices: number[] };

export const mergeSort = (
	array: number[]
): {
	sortedArray: number[];
	events: MergeSortEvent[];
	comparisons: number;
	swaps: number;
} => {
	const arr = [...array];
	const events: MergeSortEvent[] = [];
	let comparisons = 0;
	let swaps = 0;

	// Temporary array for merging
	const temp = new Array(arr.length);

	function mergeSortHelper(start: number, end: number) {
		// Base case
		if (start >= end) return;

		const mid = Math.floor((start + end) / 2);

		// Record the division event
		events.push({
			type: "divide",
			indices: [start, end],
		});

		// Recursively sort the left half
		mergeSortHelper(start, mid);

		// Recursively sort the right half
		mergeSortHelper(mid + 1, end);

		// Merge the sorted halves
		events.push({
			type: "merge",
			leftStart: start,
			mid: mid,
			rightEnd: end,
		});

		merge(start, mid, end);
	}

	function merge(start: number, mid: number, end: number) {
		let i = start;
		let j = mid + 1;
		let k = start;

		// Copy elements to temp array
		for (let l = start; l <= end; l++) {
			temp[l] = arr[l];
		}

		// Merge the two halves
		while (i <= mid && j <= end) {
			events.push({
				type: "compare",
				indices: [i, j],
			});
			comparisons++;

			if (temp[i] <= temp[j]) {
				events.push({
					type: "set",
					index: k,
					value: temp[i],
				});
				arr[k++] = temp[i++];
				swaps++;
			} else {
				events.push({
					type: "set",
					index: k,
					value: temp[j],
				});
				arr[k++] = temp[j++];
				swaps++;
			}
		}

		// Copy remaining elements from left half
		while (i <= mid) {
			events.push({
				type: "set",
				index: k,
				value: temp[i],
			});
			arr[k++] = temp[i++];
			swaps++;
		}

		// Copy remaining elements from right half
		while (j <= end) {
			events.push({
				type: "set",
				index: k,
				value: temp[j],
			});
			arr[k++] = temp[j++];
			swaps++;
		}

		// Mark the sorted subarray
		const sortedIndices = [];
		for (let l = start; l <= end; l++) {
			sortedIndices.push(l);
		}
		events.push({
			type: "sorted",
			indices: sortedIndices,
		});
	}

	mergeSortHelper(0, arr.length - 1);

	return {
		sortedArray: arr,
		events,
		comparisons,
		swaps,
	};
};
