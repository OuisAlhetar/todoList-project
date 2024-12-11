import { createContext, useState, useContext } from "react";

import MyToast from "@/components/MyToast";

export const ToastContext = createContext({});

export const useToast = () => useContext(ToastContext);


export const ToastProvider = ({ children }) => {
	const [open, setOpen] = useState(false);
	const [toastMsg, setToastMsg] = useState("");

	const handleClick = () => {
		setOpen(true);
		setTimeout(() => {
			setOpen(false);
		}, 3000);
	};

	return (
		<>
			<ToastContext.Provider value={{ handleClick, toastMsg, setToastMsg }}>
				<MyToast isOpen={open} />
				{children}
			</ToastContext.Provider>
		</>
	);
};
