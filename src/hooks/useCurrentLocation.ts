import { useLocation } from "react-router";

export const useCurrentLocation = () => {
	const location = useLocation();

	return location;
};