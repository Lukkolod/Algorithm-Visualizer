import { useEffect, useState } from "react";
import { useSortingAlgorithm } from "../../hooks/useSortingAlgorithm";
import { useVisualizationStore } from "../../stores/visualizationStore";

const SortingVisualizer = () => {
	const { array, generateNewArray, animationSpeed, currentAlgorithm } =
		useVisualizationStore();

	const [valueToHeight, setValueToHeight] = useState<Record<number, number>>(
		{}
	);

	useEffect(() => {
		if (array.length === 0) return;
		const sortedArray = [...array].sort((a, b) => a - b);
		const heightStep = 100 / sortedArray.length;
		const heightMap: Record<number, number> = {};
		sortedArray.forEach((item, index) => {
			if (!(item in heightMap)) {
				heightMap[item] = (index + 1) * heightStep;
			}
		});
		setValueToHeight(heightMap);
	}, [array]);

	useEffect(() => {
		controls.reset();
	}, [currentAlgorithm]);

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
						className={`border rounded-sm bg-gradient-to-t from-emerald-900 to-emerald-700 md:w-8 sm:w-4 flex items-end justify-center text-xs font-medium transition-all duration-200 ease-in-out
                ${
									animationState.comparing.includes(index)
										? "border-yellow-400 shadow-lg shadow-yellow-400/20"
										: ""
								}
                ${
									animationState.swapping.includes(index)
										? "border-emerald-400 shadow-lg shadow-emerald-400/20"
										: ""
								}
                ${
									animationState.sorted.includes(index)
										? "border-green-500 shadow-sm shadow-green-500/20"
										: ""
								}
                ${
									animationState.dividing.includes(index)
										? "border-purple-500 shadow-lg shadow-purple-500/20"
										: ""
								}
                ${
									animationState.merging &&
									index >= animationState.merging.leftStart &&
									index <= animationState.merging.rightEnd
										? "border-blue-500 shadow-lg shadow-blue-500/20"
										: ""
								}
                ${
									animationState.partitioning &&
									index >= animationState.partitioning.start &&
									index <= animationState.partitioning.end
										? "border-red-500 shadow-lg shadow-red-500/20"
										: ""
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
				Step: {animationState.currentStep} / {animationState.totalSteps}
			</div>
			<div className="flex flex-col items-center gap-4">
				<div className="flex space-x-4">
					<button
						onClick={controls.prevStep}
						className="md:px-4 md:py-2 sm:px-2 sm:py-1 rounded-md bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 shadow-md transition-all"
					>
						Previous Step
					</button>
					<button
						onClick={animationState.isRunning ? controls.pause : controls.play}
						className={`md:px-4 md:py-2 sm:px-2 sm:py-1 rounded-md text-white shadow-md transition-all border
                ${
									animationState.isRunning
										? "bg-red-700 hover:bg-red-600 border-red-600"
										: "bg-green-700 hover:bg-green-600 border-green-600"
								}`}
					>
						{animationState.isRunning ? "Pause" : "Start"}
					</button>
					<button
						onClick={controls.nextStep}
						className="md:px-4 md:py-2 sm:px-2 sm:py-1 rounded-md bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 shadow-md transition-all"
						disabled={animationState.isDone}
					>
						Next Step
					</button>
					<button
						onClick={controls.reset}
						className="md:px-4 md:py-2 sm:px-2 sm:py-1 rounded-md bg-purple-700 hover:bg-purple-600 text-white border border-purple-600 shadow-md transition-all"
					>
						Reset
					</button>
				</div>
				<button
					onClick={() => {
						controls.reset();
						generateNewArray();
					}}
					className="md:px-4 md:py-2 sm:px-2 sm:py-1 rounded-md bg-blue-700 hover:bg-blue-600 text-white border border-blue-600 shadow-md transition-all"
				>
					Generate new array
				</button>
			</div>
		</div>
	);
};

export default SortingVisualizer;
