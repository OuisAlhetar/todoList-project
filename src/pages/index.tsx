// index.tsx
import TodoList from "./TodoList";
import { TasksProvider } from "@/contexts/tasksContext";
import { createTheme, ThemeProvider } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import { useState } from "react";
import MyToast from "@/components/MyToast";
import { ToastContext, ToastProvider } from "@/contexts/ToastContext";

const theme = createTheme({
	palette: {
		primary: {
			main: "#1b263b",
		},
		secondary: {
			main: "#778da9",
		},
	},
	typography: {
		fontFamily: "ReadexPro, sans-serif",
		fontWeightLight: "400",
	},
});

// initial tasks:

let tasks = [
	{
		id: uuidv4(),
		title: "المهمة الأولى",
		body: "هذا هو النص الفرعي لهذه المهمة",
		isDone: true,
	},
	{
		id: uuidv4(),
		title: "المهمة الثانية",
		body: "هذا هو النص الفرعي لهذه المهمة",
		isDone: false,
	},
	{
		id: uuidv4(),
		title: "المهمة الثالثة",
		body: "هذا هو النص الفرعي لهذه المهمة",
		isDone: true,
	},
	{
		id: uuidv4(),
		title: "المهمة الرابعة",
		body: "هذا هو النص الفرعي لهذه المهمة",
		isDone: false,
	},
	{
		id: uuidv4(),
		title: "المهمة الخامسة",
		body: "هذا هو النص الفرعي لهذه المهمة",
		isDone: false,
	},
];

export default function Index() {
	const [tasksMenu, setTasksMenu] = useState(tasks);

	//! NOTE: here we comment this section because => [we use Context as a Provider]
	// [Toast Handling]:
	// const [open, setOpen] = useState(false);
	// const [toastMsg, setToastMsg] = useState("");

	// const handleClick = () => {
	// 	setOpen(true);
	// 	setTimeout(() => {
	// 		setOpen(false);
	// 	}, 3000);
	// };

	return (
		<ThemeProvider theme={theme}>
			<TasksProvider> {/* {Provider instead Context Provider} */}
				<div
					style={{
						display: "flex",
						direction: "rtl",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: theme.palette.primary.main,
					}}
				>
					<ToastProvider>
						{/* <MyToast isOpen={open}/> */}
						<TodoList />
					</ToastProvider>
				</div>
			</TasksProvider>
		</ThemeProvider>
	);
}