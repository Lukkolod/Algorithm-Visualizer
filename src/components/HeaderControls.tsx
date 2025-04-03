import { IoOptionsSharp } from "react-icons/io5";
import { useSideBarStore } from "../stores/sideBarStore";
import { FaGithub, FaSortAmountUp } from "react-icons/fa";
import { NavLink, useLocation } from "react-router";
import { PiPath } from "react-icons/pi";
import { useVisualizationStore } from "../stores/visualizationStore";
import { useEffect } from "react";

const HeaderControls = () => {
	const { toggleOpen, isOpen } = useSideBarStore();
	const location = useLocation();
	const { setCurrentAlgorithm } = useVisualizationStore();

    useEffect(() => {
        location.pathname === "/PathFinding" && setCurrentAlgorithm("A* Search")
    }, [])

	return (
		<div className="flex items-center h-full pr-6">
			<a
				href="https://github.com/Lukkolod/Algorithm-Visualizer/tree/main"
				target="_blank"
			>
				<FaGithub
					size={32}
					className="cursor-pointer mr-4 hover:scale-110 transition-all hover:text-emerald-700"
				/>
			</a>
			{location.pathname === "/PathFinding" ? (
				<NavLink to={"/"} end onClick={() => setCurrentAlgorithm("Bubble Sort")}>
					<FaSortAmountUp
						size={32}
						className="cursor-pointer mr-4 hover:scale-110 transition-all hover:text-emerald-700"
					/>
				</NavLink>
                
			) : (
				<NavLink to={"PathFinding"} end onClick={() => setCurrentAlgorithm("A* Search")}>
					<PiPath
						size={32}
						className="cursor-pointer mr-4 hover:scale-110 transition-all hover:text-emerald-700"
					/>
				</NavLink>
			)}

			{!isOpen && location.pathname !== "/PathFinding" && (
				<button
					className="flex items-center gap-2 px-4 py-2 
                    bg-emerald-800 hover:bg-emerald-700 
                    text-gray-200 rounded-md
                    transition-colors duration-200 ease-in-out
                    border border-emerald-700 shadow-sm"
					onClick={toggleOpen}
				>
					<span className="font-medium">Settings</span>
					<IoOptionsSharp size={24} />
				</button>
			)}
		</div>
	);
};
export default HeaderControls;
