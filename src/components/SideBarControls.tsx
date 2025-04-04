import { useSideBarStore } from "../stores/sideBarStore";
import { useVisualizationStore } from "../stores/visualizationStore";

const SideBarControls = () => {
	const {
		currentAlgorithm,
		setCurrentAlgorithm,
		arraySize,
		setArraySize,
		animationSpeed,
		setAnimationSpeed,
	} = useVisualizationStore();

	const { toggleOpen } = useSideBarStore();
	return (
		<div className="flex items-center m-4 tracking-tight justify-center flex-col gap-4">
			{currentAlgorithm !== "A* Search" && (
				<>
					<h1>SORTING METHOD</h1>
					<div className="space-y-2">
						<label className="flex items-center cursor-pointer">
							<input
								type="radio"
								className="hidden peer"
								name="sorting-method"
								checked={currentAlgorithm === "Bubble Sort"}
								onChange={(e) =>
									e.target.checked && setCurrentAlgorithm("Bubble Sort")
								}
							/>
							<div
								className="px-4 py-2 rounded-lg 
      border border-gray-700 
      transition-all duration-200
      peer-checked:border-emerald-600 peer-checked:text-white 
      peer-checked:bg-gradient-to-r peer-checked:from-emerald-900 peer-checked:to-emerald-800 
      peer-checked:shadow-md peer-checked:shadow-emerald-900/30
      hover:bg-gray-800 
      flex justify-between items-center w-full select-none"
							>
								<span>BubbleSort</span>
							</div>
						</label>

						<label className="flex items-center cursor-pointer">
							<input
								type="radio"
								className="hidden peer"
								name="sorting-method"
								checked={currentAlgorithm === "Merge Sort"}
								onChange={(e) =>
									e.target.checked && setCurrentAlgorithm("Merge Sort")
								}
							/>
							<div
								className="px-4 py-2 rounded-lg 
      border border-gray-700 
      transition-all duration-200
      peer-checked:border-emerald-600 peer-checked:text-white 
      peer-checked:bg-gradient-to-r peer-checked:from-emerald-900 peer-checked:to-emerald-800 
      peer-checked:shadow-md peer-checked:shadow-emerald-900/30
      hover:bg-gray-800 
      flex justify-between items-center w-full select-none"
							>
								<span>MergeSort</span>
							</div>
						</label>

						<label className="flex items-center cursor-pointer">
							<input
								type="radio"
								className="hidden peer"
								name="sorting-method"
								checked={currentAlgorithm === "Quick Sort"}
								onChange={(e) =>
									e.target.checked && setCurrentAlgorithm("Quick Sort")
								}
							/>
							<div
								className="px-4 py-2 rounded-lg 
      border border-gray-700 
      transition-all duration-200
      peer-checked:border-emerald-600 peer-checked:text-white 
      peer-checked:bg-gradient-to-r peer-checked:from-emerald-900 peer-checked:to-emerald-800 
      peer-checked:shadow-md peer-checked:shadow-emerald-900/30
      hover:bg-gray-800 
      flex justify-between items-center w-full select-none"
							>
								<span>QuickSort</span>
							</div>
						</label>
					</div>
					<div className="space-y-2 flex flex-col justify-center items-center">
						<label
							htmlFor="array-size"
							className="uppercase text-[rgb(185,185,185)]"
						>
							<h1>Change array size</h1>
						</label>
						<input
							type="range"
							name="array-size"
							min="5"
							max="30"
							step={5}
							defaultValue="10"
							className=" w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700
                  appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0
                  [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none accent-green-700"
							onChange={(e) => setArraySize(+e.target.value)}
						/>
						<p className="text-sm">Current size: {arraySize}</p>
					</div>
					<div className="space-y-2 flex flex-col justify-center items-center">
						<label
							htmlFor="array-size"
							className="uppercase text-[rgb(185,185,185)]"
						>
							<h1>Change speed</h1>
						</label>
						<input
							type="range"
							name="speed"
							min="100"
							max="1000"
							step={100}
							defaultValue="200"
							className=" w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700
                  appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0
                  [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none accent-green-700"
							onChange={(e) => setAnimationSpeed(+e.target.value)}
						/>
						<p className="text-sm">Current speed: {animationSpeed}</p>
					</div>
					<div className="flex space-x-4">
						<div
							className={`mt-4 px-4 py-2 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-800${
								animationSpeed === 10
									? "bg-[rgb(6,95,70)] text-white text-center "
									: ""
							} flex justify-between items-center w-full select-none`}
							onClick={() => setAnimationSpeed(10)}
						>
							<span>Ultra fast</span>
						</div>
					</div>
				</>
			)}

            
           

			<div
				className="mt-4 px-4 py-2 rounded-lg border border-gray-300 cursor-pointer 
          hover:bg-[rgb(6,95,70)] hover:text-white text-center"
				onClick={toggleOpen}
			>
				Close Settings
			</div>
		</div>
	);
};
export default SideBarControls;
