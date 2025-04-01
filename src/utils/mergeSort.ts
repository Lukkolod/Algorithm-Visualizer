export type MergeSortEvent =
	| { type: "compare"; indices: [number, number] }
	| { type: "overwrite"; index: number; value: number }
	| { type: "markSorted"; indices: number[] };

export const mergeSort = (
	array: number[]
): {
	sortedArray: number[];
	events: MergeSortEvent[];
	comparisons: number;
	swaps: number;
} => {
	const arr = [...array];
	const n = arr.length;
	const events: MergeSortEvent[] = [];
	let comparisons = 0;
	let swaps = 0; 

	const merge = (left: number, mid: number, right: number) => {
		const leftArr = arr.slice(left, mid + 1);
		const rightArr = arr.slice(mid + 1, right + 1);

		let i = 0,
			j = 0,
			k = left;

		while (i < leftArr.length && j < rightArr.length) {
			events.push({
				type: "compare",
				indices: [left + i, mid + 1 + j],
			});
			comparisons++;

			if (leftArr[i] <= rightArr[j]) {
				arr[k] = leftArr[i];
				events.push({
					type: "overwrite",
					index: k,
					value: leftArr[i],
				});
				swaps++;
				i++;
			} else {
				arr[k] = rightArr[j];
				events.push({
					type: "overwrite",
					index: k,
					value: rightArr[j],
				});
				swaps++;
				j++;
			}
			k++;
		}

		while (i < leftArr.length) {
			arr[k] = leftArr[i];
			events.push({
				type: "overwrite",
				index: k,
				value: leftArr[i],
			});
			swaps++;
			i++;
			k++;
		}

		while (j < rightArr.length) {
			arr[k] = rightArr[j];
			events.push({
				type: "overwrite",
				index: k,
				value: rightArr[j],
			});
			swaps++;
			j++;
			k++;
		}

		const sortedIndices = Array.from(
			{ length: right - left + 1 },
			(_, idx) => left + idx
		);
		events.push({
			type: "markSorted",
			indices: sortedIndices,
		});
	};

	const mergeSortHelper = (left: number, right: number) => {
		if (left < right) {
			const mid = Math.floor((left + right) / 2);

			mergeSortHelper(left, mid);
			mergeSortHelper(mid + 1, right);

			merge(left, mid, right);
		}
	};

	mergeSortHelper(0, n - 1);

	return {
		sortedArray: arr,
		events,
		comparisons,
		swaps,
	};
};
