import { useSideBarStore } from "../stores/sideBarStore";
import SideBarControls from "./SideBarControls";
import { motion } from "framer-motion";

const SideBar = ({ children }: { children: React.ReactNode }) => {
	const { isOpen } = useSideBarStore();

	return (
		<motion.nav
			className={
				"fixed right-0 h-screen w-96 border-l-1 border-dashed border-[rgb(6,95,70)]"
			}
			initial={{ x: "100%" }}
			animate={{ x: isOpen ? 0 : "100%", scale: isOpen ? 1 : 0.95 }}
			transition={{ duration: 0.3, type: "tween" }}
		>
			{children}
		</motion.nav>
	);
};

SideBar.Controls = SideBarControls;
export default SideBar;
