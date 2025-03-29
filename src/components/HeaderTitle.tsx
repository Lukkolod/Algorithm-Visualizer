import { useVisualizationStore } from "../stores/visualizationStore";

const HeaderTitle = () => {
    const { currentAlgorithm } = useVisualizationStore()
	return <div className="text-5xl font-semibold  tracking-widest uppercase m-4">{currentAlgorithm}</div>;
};
export default HeaderTitle;
