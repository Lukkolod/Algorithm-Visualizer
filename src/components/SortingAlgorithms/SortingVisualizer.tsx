import { useSortingAlgorithm } from "../../hooks/useSortingAlgorithm";
import { useVisualizationStore } from "../../stores/visualizationStore";
import { bubbleSort } from "../../utils/bubbleSort";

const SortingVisualizer = () => {
	const { array, generateNewArray, animationSpeed, currentAlgorithm } =
		useVisualizationStore();

	const sortedArr = bubbleSort(array);

	const {
		array: visualArray,
		animationState,
		controls,
	} = useSortingAlgorithm(array, animationSpeed, currentAlgorithm);

	return (
		<div className="flex gap-4 mt-4 flex-col">
			<div className="flex justify-center items-end">
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
                            height: `${2 * item}rem`,
                            
                        }}
					>
						{item}
					</div>
				))}
			</div>
			<div className="flex space-x-2">
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
	);
};
export default SortingVisualizer;
