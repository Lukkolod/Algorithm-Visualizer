import { useSideBarStore } from "../stores/sideBarStore";
import SideBarControls from "./SideBarControls";
import { motion } from "framer-motion";

const SideBar = ({ children }: { children: React.ReactNode }) => {
	const { isOpen } = useSideBarStore();

	return (
		<motion.nav
			className="fixed right-0 top-16 h-[calc(100%-4rem)] w-80 border-l border-emerald-900/50 
    bg-gray-900/95 backdrop-blur-sm overflow-y-auto shadow-xl shadow-black/30"
			initial={{ x: "100%" }}
			animate={{ x: isOpen ? 0 : "100%", scale: isOpen ? 1 : 0.95 }}
			transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
		>
			{children}
		</motion.nav>
	);
};

SideBar.Controls = SideBarControls;
export default SideBar;
