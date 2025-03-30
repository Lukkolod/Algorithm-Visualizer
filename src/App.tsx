import Header from "./components/Header";
import SideBar from "./components/SideBar";
import SideBarControls from "./components/SideBarControls";
import SortingVisualizer from "./components/SortingAlgorithms/SortingVisualizer";

const App = () => {
	return (
		<div className="App">
            <Header>
                <Header.Title/>
                <Header.Controls/>
            </Header>
            <SideBar>
                <SideBarControls/>
            </SideBar>
            <SortingVisualizer/>
		</div>
	);
};
export default App;
