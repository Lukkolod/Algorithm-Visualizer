import { useVisualizationStore } from "../stores/visualizationStore";

const HeaderTitle = () => {
	const { currentAlgorithm } = useVisualizationStore();
	return (
		<div className="flex items-center h-full pl-2 sm:pl-4 md:pl-8 overflow-hidden">
            <div className="relative">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                    font-black uppercase
                    bg-clip-text text-transparent bg-gradient-to-r 
                    from-emerald-300 via-emerald-500 to-teal-600
                    py-1 sm:py-2
                    tracking-wider sm:tracking-widest md:tracking-[0.15em] lg:tracking-[0.2em]
                    transform-gpu transition-all duration-500 ease-out
                    whitespace-nowrap
                    framer-title
                    select-none">
                    {currentAlgorithm}
                </h1>
                <div className="absolute -bottom-1 left-0 w-3/4 h-0.5 
                    bg-gradient-to-r from-emerald-500 to-transparent
                    hidden sm:block"></div>
            </div>
        </div>
	);
};
export default HeaderTitle;
