import { IoOptionsSharp } from "react-icons/io5";
import { useSideBarStore } from "../stores/sideBarStore";

const HeaderControls = () => {
	const { toggleOpen, isOpen } = useSideBarStore();

	return (
		<div>
			{!isOpen && (
				<button
					className="lowercase flex items-center m-6 tracking-tight"
					onClick={toggleOpen}
				>
					Settings <IoOptionsSharp size={32} />
				</button>
			)}
		</div>
	);
};
export default HeaderControls;
