export type QuickSortEvent =
	| { type: "compare"; indices: [number, number] }
	| { type: "swap"; indices: [number, number] }
	| { type: "markPivot"; index: number }
	| { type: "markSorted"; index: number };

export const quickSort = (
	array: number[]
): {
	sortedArray: number[];
	events: QuickSortEvent[];
	comparisons: number;
	swaps: number;
} => {
	const arr = [...array];
	const n = arr.length;
	const events: QuickSortEvent[] = [];
	let comparisons = 0;
	let swaps = 0;

	const partition = (left: number, right: number): number => {
		const pivotIndex = right;
		const pivotValue = arr[pivotIndex];

		events.push({
			type: "markPivot",
			index: pivotIndex,
		});

		let i = left - 1;

		for (let j = left; j < right; j++) {
			events.push({
				type: "compare",
				indices: [j, pivotIndex],
			});
			comparisons++;

			if (arr[j] <= pivotValue) {
				i++;

				if (i !== j) {
					[arr[i], arr[j]] = [arr[j], arr[i]];
					events.push({
						type: "swap",
						indices: [i, j],
					});
					swaps++;
				}
			}
		}

		const newPivotIndex = i + 1;

		if (newPivotIndex !== pivotIndex) {
			[arr[newPivotIndex], arr[pivotIndex]] = [
				arr[pivotIndex],
				arr[newPivotIndex],
			];
			events.push({
				type: "swap",
				indices: [newPivotIndex, pivotIndex],
			});
			swaps++;
		}

		events.push({
			type: "markSorted",
			index: newPivotIndex,
		});

		return newPivotIndex;
	};

	const quickSortHelper = (left: number, right: number) => {
		if (left < right) {
			const pivotIndex = partition(left, right);

			quickSortHelper(left, pivotIndex - 1);
			quickSortHelper(pivotIndex + 1, right);
		} else if (left === right) {
			events.push({
				type: "markSorted",
				index: left,
			});
		}
	};

	quickSortHelper(0, n - 1);

	return {
		sortedArray: arr,
		events,
		comparisons,
		swaps,
	};
};
