import Header from "./components/Header";
import SideBar from "./components/SideBar";
import SideBarControls from "./components/SideBarControls";
import SortingVisualizer from "./components/SortingAlgorithms/SortingVisualizer";

const App = () => {
	return (
		<div className="App flex flex-col h-screen overflow-hidden">
			<Header>
				<Header.Title />
				<Header.Controls />
			</Header>
			<div className="flex flex-1 overflow-hidden">
				<SideBar>
					<SideBarControls />
				</SideBar>
				<SortingVisualizer />
			</div>
		</div>
	);
};
export default App;
