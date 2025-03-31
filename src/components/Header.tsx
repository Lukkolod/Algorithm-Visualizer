import HeaderControls from "./HeaderControls";
import HeaderTitle from "./HeaderTitle";

const Header = ({ children }: { children: React.ReactNode }) => {
    return (
        <header className="flex w-full justify-between border-b-1 border-dashed border-[rgb(6,95,70)] h-16">
            {children}
        </header>
    );
};
Header.Title = HeaderTitle;
Header.Controls = HeaderControls;
export default Header;
