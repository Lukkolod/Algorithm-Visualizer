import { IoOptionsSharp } from "react-icons/io5";
import { useSideBarStore } from "../stores/sideBarStore";
import { FaGithub } from "react-icons/fa";

const HeaderControls = () => {
	const { toggleOpen, isOpen } = useSideBarStore();

	return (
		<div className="flex items-center h-full pr-6">
                
                <a href="https://github.com/Lukkolod/Algorithm-Visualizer/tree/main" target="_blank"><FaGithub size={32} className="cursor-pointer mr-4" /></a>
			{!isOpen && (
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
