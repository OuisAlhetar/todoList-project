// tasksContext.tsx
import {
	createContext,
	ReactNode,
	useReducer,
	useEffect,
	useContext,
	Dispatch,
} from "react";
import { taskReducer, ACTIONS } from "@/reducer/todosReducer";

// Define the TaskType interface
interface TaskType {
	id?: string; // Update id to be a string
	title?: string;
	body?: string;
	isDone?: boolean;
}

// Define the context state interface
interface TasksContextType {
	tasksMenu: TaskType[];
	dispatch: Dispatch<any>;
}

// Create context with default values
const TasksContext = createContext<TasksContextType | undefined>(undefined);

// Create a provider component
// export const TasksProvider: React.FC<{ children: ReactNode }> = ({
// 	children,
// }) => {
// 	const [tasksMenu, setTasksMenu] = useState<TaskType[]>([]);

// 	return (
// 		<TasksContext.Provider value={{ tasksMenu, setTasksMenu }}>
// 			{children}
// 		</TasksContext.Provider>
// 	);
// };
interface TasksProviderProps {
	children: ReactNode;
}

export function TasksProvider({ children }: TasksProviderProps) {
	const [tasksMenu, dispatch] = useReducer(taskReducer, [], () => {
		const localData = localStorage.getItem("todos");
		return localData ? JSON.parse(localData) : [];
	});

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(tasksMenu));
	}, [tasksMenu]);

	return (
		<TasksContext.Provider value={{ tasksMenu, dispatch }}>
			{children}
		</TasksContext.Provider>
	);
}

export const useTasks = () => useContext(TasksContext);

// export default TasksContext;

// ------------------------------------------------

// TasksContext.tsx
// import React, { createContext, useReducer, useEffect, useContext } from "react";
// import { taskReducer, ACTIONS } from '@/reducer/todosReducer';

// const TasksContext = createContext();

// export function TasksProvider({ children }) {
// 	const [tasks, dispatch] = useReducer(taskReducer, [], () => {
// 		const localData = localStorage.getItem("todos");
// 		return localData ? JSON.parse(localData) : [];
// 	});

// 	useEffect(() => {
// 		localStorage.setItem("todos", JSON.stringify(tasks));
// 	}, [tasks]);

// 	return (
// 		<TasksContext.Provider value={{ tasks, dispatch }}>
// 			{children}
// 		</TasksContext.Provider>
// 	);
// }

// export const useTasks = () => useContext(TasksContext);
