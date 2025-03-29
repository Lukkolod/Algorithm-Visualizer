import Header from "./components/Header";
import SideBar from "./components/SideBar";
import SideBarControls from "./components/SideBarControls";

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
		</div>
	);
};
export default App;
