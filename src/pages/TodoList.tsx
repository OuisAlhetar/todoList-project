// ----------------------------    -----------------
import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import ColorToggleButton from "@/components/ToggleButtonGroup";
import Todo from "@/components/Todo";
import TextField from "@mui/material/TextField";

// uuid library: 'used to generate unique IDs'
import { v4 as uuidv4 } from "uuid";

// Context and Reducer:
import { useContext, useReducer } from "react";
// import TasksContext from "@/contexts/tasksContext";
import { useToast } from "@/contexts/ToastContext";
// import { ToastContext } from "@/contexts/ToastContext";
// import todosReducer from "@/reducer/todosReducer";

import { useTasks } from "@/contexts/tasksContext";
import { ACTIONS } from "@/reducer/todosReducer";

interface Types {
	id?: number;
	title?: string;
	body?: string;
	isDone?: boolean;
}

export default function TodoList() {
	const { tasksMenu, dispatch } = useTasks();

	// Toast state:
	const toast = useToast();

	const [newTask, setNewTask] = React.useState<Types>({
		id: uuidv4(),
		title: "",
		body: "",
		isDone: false,
	});

	// state for specifying the done , non-done tasks by the [ToggleButtonGroup] component
	const [alignment, setAlignment] = React.useState("all");


	// ============== ============ ================
	// ============== `useMemo hook` ==============
	// ============== ============ ================

	// completed tasks:
	const doneTodos = React.useMemo(() => {
		return tasksMenu.filter((task: Types) => {
			return task.isDone == true;
		});
	}, [tasksMenu]);

	// Non-completed tasks:
	const nonDoneTodos = React.useMemo(() => {
		return tasksMenu.filter((task: Types) => {
			return task.isDone == false;
		});
	}, [tasksMenu]);

	// handling the tasks categories:
	let tasksTypeRendered = tasksMenu;

	if (alignment == "done") {
		tasksTypeRendered = doneTodos;
	} else if (alignment == "non-done") {
		tasksTypeRendered = nonDoneTodos;
	} else {
		tasksTypeRendered = tasksMenu;
	}

	//Note: `this the time to learn [useEffect hook]`
	// React.useEffect(() => {
	// 	const tasksStoraged = JSON.parse(localStorage.getItem("todos")) ?? [];
	// 	setTasksMenu(tasksStoraged);
	// 	// console.log("Hello");

	// 	// return () => {
	// 	// 	console.log("Component will unmount or cleanup before the next effect");
	// 	// };
	// }, []); // (empty array) means apply the effect once only when the first render

	let tasksList = tasksTypeRendered.map((task: Types) => {
		return <Todo todo={task} key={task.id} />;
	});

	function handleAddTask() {
		dispatch({ type: ACTIONS.ADD_TASK, payload: newTask });
		// show toast:
		toast.setToastMsg(`تم إضافة مهمة جديدة`);
		toast.handleClick();
		setNewTask({ id: uuidv4(), title: "", body: "", isDone: false }); // make the input of new task empty after submit
	}

	//! this is not Working and it likes infinite loop (infinite rendering) and solve that by using [useEffect hook]
	// const storagedTodos = JSON.parse(localStorage.getItem("todos"));
	// setTasksMenu(tasksMenu);

	return (
		<>
			<Container maxWidth="sm" sx={{}}>
				<Card
					sx={{
						minWidth: 275,
						bgcolor: "#e0e1dd",
						borderRadius: "25px",
						padding: "10px",
						mt: "120px",
					}}
				>
					<CardContent>
						<Typography
							variant="h2"
							color="primary"
							component="div"
							sx={{ textAlign: "center" }}
						>
							مهامي
						</Typography>
						<Divider />

						{/* buttonGroup component for choosing the type of tasks: done, non-done */}
						<ColorToggleButton
							type={alignment}
							handleAlignment={setAlignment}
						/>
						{tasksList}
					</CardContent>
					<div
						style={{
							width: "100%",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Box
							component="form"
							sx={{
								width: 500,
								maxWidth: "60%",
								padding: "10px",
								mr: "10px",
							}}
							noValidate
							autoComplete="off"
						>
							<TextField
								fullWidth
								id="fullWidth"
								label="إضافة مهمة"
								variant="outlined"
								size="small"
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									const { value } = event.target;
									setNewTask({ ...newTask, title: value });
								}}
								value={newTask.title}
							/>
						</Box>
						<Button
							variant="contained"
							color="primary"
							sx={{ ml: "10px", padding: "8px", width: "40%" }}
							onClick={handleAddTask}
							disabled={newTask.title?.length == 0}
						>
							إضافة
						</Button>
					</div>
				</Card>
			</Container>
		</>
	);
}

// --------------------------------------------- chat gpt ----------------------

// // TodoList.tsx
// import React, { useState } from 'react';
// import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
// import { useTasks } from '@/contexts/tasksContext';
// import Todo from '@/components/Todo';
// import { ACTIONS } from '@/reducer/todosReducer';

// export default function TodoList() {
//   const { tasks, dispatch } = useTasks();
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [currentTask, setCurrentTask] = useState(null);
//   const [message, setMessage] = useState('');
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleSave = () => {
//     if (isEditMode && currentTask) {
//       dispatch({
//         type: ACTIONS.EDIT_TASK,
//         payload: { id: currentTask.id, title: currentTask.title, body: currentTask.body }
//       });
//     } else {
//       dispatch({ type: ACTIONS.ADD_TASK, payload: currentTask });
//     }
//     handleClose();
//   };

//   return (
//     <Box>
//       {tasks.map(todo => (
//         <Todo
//           key={todo.id}
//           todo={todo}
//           handleOpen={handleOpen}
//           setIsEditMode={setIsEditMode}
//           setCurrentTask={setCurrentTask}
//           setMessage={setMessage}
//         />
//       ))}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>{message}</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Title"
//             type="text"
//             fullWidth
//             value={currentTask ? currentTask.title : ''}
//             onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
//           />
//           <TextField
//             margin="dense"
//             label="Body"
//             type="text"
//             fullWidth
//             value={currentTask ? currentTask.body : ''}
//             onChange={(e) => setCurrentTask({ ...currentTask, body: e.target.value })}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleSave}>Save</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }
