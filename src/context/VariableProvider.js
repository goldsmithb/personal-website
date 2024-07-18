import React, { useState, useEffect, createContext} from "react";


const defaultState = {
	isMobile: false,
};

const VariableContext = createContext(defaultState);

export const VariableProvider = ({ children }) => {
	const isBrowser = () => typeof window !== "undefined";
	const [width, setWidth] = useState(isBrowser() ? window.innerWidth : null);

	useEffect(() => {
		function handleWindowSizeChange() {
			if (isBrowser()) {
				setWidth(window.innerWidth);
			}
		}

		if (!isBrowser()) {
			return;
		}
		window.addEventListener("resize", handleWindowSizeChange);

		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);

	

	const isMobile = width <= 768;

	return (
		<VariableContext.Provider value={{ isMobile }}>
			{children}
		</VariableContext.Provider>
	);
};

export default VariableContext;