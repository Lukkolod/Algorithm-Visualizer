import HeaderControls from "./HeaderControls";
import HeaderTitle from "./HeaderTitle";

const Header = ({ children }: { children: React.ReactNode }) => {
	return <header className="flex w-screen justify-between border-b-1 border-dashed border-[rgb(6,95,70)]">{children}</header>;
};

Header.Controls = HeaderControls
Header.Title = HeaderTitle
export default Header;
