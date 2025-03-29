import { useVisualizationStore } from "../../stores/visualizationStore";

const SortingVisualizer = () => {
	const { arraySize, setArraySize, generateNewArray, array } = useVisualizationStore();

	return (
		<div>
			<input
				type="number"
				value={arraySize}
				onChange={(e) => setArraySize(+e.target.value)}
			/>
			<p>Set Array Size</p>
            
            <button onClick={generateNewArray} className="bg-blue-300">Generate New Array</button>
            <p>Generate New Array</p>
            {array.map((value, index) => (
                <div key={index}>{value}</div>
            ))}
            
		</div>
	);
};
export default SortingVisualizer;
