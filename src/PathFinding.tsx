import Header from "./components/Header";
import FindingVisualizer from "./components/PathFindingAlgorithms/FindingVisualizer";


const PathFinding = () => {
	return (
		<div className="App flex flex-col h-screen overflow-hidden">
			<Header>
				<Header.Title />
				<Header.Controls />
			</Header>
			<div className="flex flex-1 overflow-hidden justify-center items-center">
				<FindingVisualizer />
			</div>
		</div>
	);
};
export default PathFinding;
