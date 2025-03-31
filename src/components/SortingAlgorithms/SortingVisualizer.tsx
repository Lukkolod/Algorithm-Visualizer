import { useEffect, useState } from "react";
import { useSortingAlgorithm } from "../../hooks/useSortingAlgorithm";
import { useVisualizationStore } from "../../stores/visualizationStore";

const SortingVisualizer = () => {
	const { array, generateNewArray, animationSpeed, currentAlgorithm } =
		useVisualizationStore();
	interface HeightValue {
		height: number;
		value: number;
	}
	const [heightValues, setHeightValues] = useState<HeightValue[]>([]);
	const [valueToHeight, setValueToHeight] = useState<Record<number, number>>(
		{}
	);
	useEffect(() => {
		if (array.length === 0) return;

		const sortedArray = [...array].sort((a, b) => a - b);

		const heightStep = 100 / sortedArray.length;

		const newHeightValues: HeightValue[] = sortedArray.map((item, index) => ({
			height: (index + 1) * heightStep,
			value: item,
		}));

		const heightMap: Record<number, number> = {};
		newHeightValues.forEach(({ value, height }) => {
			if (!(value in heightMap)) {
				heightMap[value] = height;
			}
		});

		setHeightValues(newHeightValues);
		setValueToHeight(heightMap);
		console.log("ValueToHeight:", heightMap);

		console.log("Height Map:", heightMap);
	}, [array]);

	const {
		array: visualArray,
		animationState,
		controls,
	} = useSortingAlgorithm(array, animationSpeed, currentAlgorithm);

	return (
		<div className="flex flex-col items-center justify-center flex-1 overflow-hidden gap-4">
			<div className="flex justify-center items-end gap-2 w-full h-3/5 overflow-hidden">
				{visualArray.map((item, index) => (
					<div
						className={`border-2 bg-purple-400 w-8 flex items-end justify-center ${
							animationState.comparing.length > 0 &&
							(animationState.comparing[0] === index ||
								animationState.comparing[1] === index)
								? "border-yellow-400"
								: animationState.swapping.length > 0 &&
								  (animationState.swapping[0] === index ||
										animationState.swapping[1] === index)
								? "border-blue-400"
								: index >= visualArray.length - animationState.sorted
								? "border-green-400"
								: "border-red-400"
						}`}
						key={index}
						style={{
							height: valueToHeight[item] ? `${valueToHeight[item]}%` : "0%",
						}}
					>
						{item}
					</div>
				))}
			</div>

			<div className="flex flex-col items-center gap-4">
				<div className="flex space-x-4">
					<button
						className="p-2 rounded bg-blue-500 text-white"
						onClick={controls.prevStep}
					>
						Previous Step
					</button>

					{animationState.isRunning ? (
						<button
							className="p-2 rounded bg-red-500 text-white"
							onClick={controls.pause}
						>
							Pause
						</button>
					) : (
						<button
							className="p-2 rounded bg-green-500 text-white"
							onClick={controls.play}
							disabled={animationState.isDone}
						>
							Play
						</button>
					)}

					<button
						className="p-2 rounded bg-blue-500 text-white"
						onClick={controls.nextStep}
						disabled={animationState.isDone}
					>
						Next Step
					</button>

					<button
						className="p-2 rounded bg-purple-500 text-white"
						onClick={controls.reset}
					>
						Reset
					</button>
				</div>
				<div>
					Step: {animationState.currentStep} / {animationState.totalSteps}
				</div>
				<button
					className="p-4 rounded bg-green-500 text-white"
					onClick={() => {
						controls.reset();
						generateNewArray();
					}}
				>
					Generate new array
				</button>
			</div>
		</div>
	);
};
export default SortingVisualizer;
