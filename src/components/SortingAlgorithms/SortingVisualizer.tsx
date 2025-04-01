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
						className={`border border-opacity-40 rounded-sm 
                        bg-gradient-to-t from-emerald-900 to-emerald-700
                        w-8 flex items-end justify-center text-xs font-medium
                        transition-all duration-200 ease-in-out ${
													animationState.comparing.length > 0 &&
													(animationState.comparing[0] === index ||
														animationState.comparing[1] === index)
														? "border-yellow-400 shadow-lg shadow-yellow-400/20"
														: animationState.swapping.length > 0 &&
														  (animationState.swapping[0] === index ||
																animationState.swapping[1] === index)
														? "border-emerald-400 shadow-lg shadow-emerald-400/20"
														: index >=
														  visualArray.length - animationState.sorted
														? "border-green-500 shadow-sm shadow-green-500/20"
														: "border-gray-600"
												}`}
						key={index}
						style={{
							height: valueToHeight[item] ? `${valueToHeight[item]}%` : "0%",
						}}
					>
						<span className="text-gray-200">{item}</span>
					</div>
				))}
			</div>

			<div className="flex flex-col items-center gap-4">
				<div className="flex space-x-4">
					<button
						className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200 
                            border border-gray-700 shadow-sm transition-all duration-200
                            focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-opacity-50"
						onClick={controls.prevStep}
					>
						Previous Step
					</button>

					<button
						className="px-4 py-2 rounded-md text-gray-200 shadow-sm
                        transition-all duration-200 border 
                        focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-opacity-50
                        ${animationState.isRunning 
                        ? 'bg-red-900 hover:bg-red-800 border-red-800' 
                        : 'bg-emerald-800 hover:bg-emerald-700 border-emerald-700'}"
						onClick={animationState.isRunning ? controls.pause : controls.play}
						disabled={animationState.isDone}
					>
						{animationState.isRunning ? "Pause" : "Start"}
					</button>

					<button
						className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200 
    border border-gray-700 shadow-sm transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-opacity-50"
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
				<div className="w-full bg-gray-800 rounded-full h-2.5 my-4">
					<div
						className="bg-gradient-to-r from-emerald-900 to-emerald-600 h-2.5 rounded-full transition-all duration-300 ease-out"
						style={{
							width: `${
								(animationState.currentStep / animationState.totalSteps) * 100
							}%`,
						}}
					></div>
				</div>
				<div className="text-sm text-gray-400">
					Krok: {animationState.currentStep} / {animationState.totalSteps}
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
