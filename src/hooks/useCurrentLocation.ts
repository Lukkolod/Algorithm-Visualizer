import { useEffect, useState } from "react";

export const useCurrentLocation = () => {
	const location = useLocation();

	return location;
};
