import HeaderAstarControls from "./HeaderAstarControls";
import HeaderControls from "./HeaderControls";
import HeaderTitle from "./HeaderTitle";

const Header = ({ children }: { children: React.ReactNode }) => {
	return (
		<header
			className="flex w-full justify-between border-b border-emerald-900/70 
            bg-gradient-to-r from-gray-900 to-gray-800 
            shadow-md shadow-black/20 h-16 sticky top-0 z-10 
            backdrop-filter backdrop-blur-sm"
		>
			{children}
		</header>
	);
};
Header.Title = HeaderTitle;
Header.Controls = HeaderControls;
export default Header;
