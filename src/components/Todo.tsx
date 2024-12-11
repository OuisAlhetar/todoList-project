// ----------------------   -----------------------
// Todo.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// Grid:
import Grid from "@mui/material/Unstable_Grid2";

// icons:
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlineIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

// Modal:
import TransitionsModal from "@/components/Modal";

// contexts:
import { useTasks } from "@/contexts/tasksContext";
import { ACTIONS } from "@/reducer/todosReducer";
import { useToast } from "@/contexts/ToastContext";

interface Types {
	todo?: TaskType;
	changeHandler?: (id: number) => void;
}

interface TaskType {
	id?: number;
	title?: string;
	body?: string;
	isDone?: boolean;
}

export default function Todo({ todo }: Types) {
	const { dispatch } = useTasks();

	// Toast Context:
	const toast = useToast();

	// for close and open Modal
	const [open, setOpen] = React.useState(false);

	// to make the modal usable for updating and deleting tasks by 'specify a state as flag' by it we know the operation and depending it we popup Modal with certain content
	const [isEditMode, setIsEditMode] = React.useState(false);

	// massage that will appear in Modal:
	const [message, setMessage] = React.useState("");

	// this state is to specify the the state binding to current todo...
	// it help us to tell the modal which todo we clicked "for delete or update"
	const [currentTask, setCurrentTask] = React.useState<TaskType>({});

	// for handling Modal opening and closing:
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleTaskDone = (id:number) => {
		dispatch({ type: ACTIONS.TOGGLE_DONE, payload: { id } });

		// show toast only when the task is complete:
		if (!todo?.isDone) { // we assume that the non-done task will be done after dispatch
			toast.setToastMsg("لقد أكلمت المهمة");
			toast.handleClick();
		}
	};

	const handleDelete = (id:number) => {
		dispatch({ type: ACTIONS.DELETE_TASK, payload: { id } });
		handleClose();
	};

	const handleEdit = (id:number, title:string, body:string) => {
		dispatch({ type: ACTIONS.EDIT_TASK, payload: { id, title, body } });
		handleClose();
	};

	// function handleTaskDone(id: number) {
	// 	const targetTask = tasksMenu.find(
	// 		(task: TaskType) => task.id?.toString() === id.toString()
	// 	);
	// 	targetTask.isDone = !targetTask?.isDone;
	// 	const updatedTodos = tasksMenu.map((task: TaskType) => {
	// 		if (targetTask?.id == task.id) {
	// 			return targetTask;
	// 		}
	// 		return task;
	// 	});
	// 	setTasksMenu(updatedTodos);

	// 	// show Toast:
	// 	if (targetTask?.isDone) {
	// 		toast.setToastMsg(`لقد أكلمت المهمة`);
	// 		toast.handleClick();
	// 	}

	// 	// make the change also to localStorage:
	// 	localStorage.setItem("todos", JSON.stringify(updatedTodos));
	// }

	// function handleDelete(id: number) {
	// 	const updatedTodos = tasksMenu.filter((task: TaskType) => {
	// 		return task.id != id;
	// 	});
	// 	setTasksMenu(updatedTodos);

	// 	// make the change also to localStorage:
	// 	localStorage.setItem("todos", JSON.stringify(updatedTodos));
	// 	handleClose();
	// }

	// function handleEdit(id: number, title: string, body: string) {
	// 	const updatedTodos = tasksMenu.map((task: TaskType) => {
	// 		if (task.id === id) {
	// 			return { ...task, title, body };
	// 		}
	// 		return task;
	// 	});
	// 	setTasksMenu(updatedTodos);

	// 	// make the change also to localStorage:
	// 	localStorage.setItem("todos", JSON.stringify(updatedTodos));
	// 	handleClose();
	// }

	return (
		<>
			<TransitionsModal
				isOpen={open}
				handleClose={handleClose}
				message={message}
				handleDelete={handleDelete}
				handleEdit={handleEdit}
				taskId={currentTask?.id}
				taskTitle={currentTask?.title}
				taskBody={currentTask?.body}
				isEditMode={isEditMode}
			/>
			<Card
				className={"todo"}
				sx={{
					minWidth: 275,
					bgcolor: todo?.isDone ? "#a3b18a" : "#415a77",
					my: "10px",
					padding: "5px",
					color: "#fdfdfd",
					borderRadius: "15px",
				}}
			>
				<CardContent>
					<Box sx={{ flexGrow: 1 }}>
						<Grid container spacing={2}>
							<Grid xs={8}>
								<Typography
									variant="h5"
									component="div"
									sx={{
										textAlign: "right",
										fontSize: "1.5rem",
										mb: "10px",
										textDecoration: todo?.isDone
											? "1px line-through black "
											: "none",
										wordWrap: "break-word",
									}}
								>
									{todo.title}
								</Typography>
								<Typography
									variant="h5"
									component="div"
									sx={{ textAlign: "right", fontSize: ".8rem", color: "#000" }}
								>
									{todo.body}
								</Typography>
							</Grid>

							<Grid xs={4}>
								<div
									style={{
										display: "flex",
										justifyContent: "space-evenly",
										alignItems: "center",
										height: "100%",
									}}
								>
									<IconButton
										aria-label="delete"
										size="small"
										className="button-icon"
										sx={{
											color: "#b53232",
											bgcolor: "#fff",
											border: "solid #b53232 1px",
										}}
										onClick={() => {
											setIsEditMode(false);
											setMessage("هل أنت متأكد من حذف هذه المهمة ؟");
											setCurrentTask(todo);
											handleOpen();
										}}
									>
										<DeleteOutlineIcon />
									</IconButton>

									<IconButton
										aria-label="done"
										size="small"
										className="button-icon"
										sx={{
											color: "#588157",
											bgcolor: "#fff",
											border: "solid #588157 1px",
										}}
										onClick={() => {
											handleTaskDone(todo.id);
										}}
									>
										<CheckCircleOutlineIcon />
									</IconButton>

									<IconButton
										aria-label="edit"
										size="small"
										className="button-icon"
										sx={{
											color: "#1e88e5",
											bgcolor: "#fff",
											border: "solid #1e88e5 1px",
										}}
										onClick={() => {
											setIsEditMode(true);
											setMessage("تعديل مهمة");
											setCurrentTask(todo);
											handleOpen();
										}}
									>
										<EditOutlineIcon />
									</IconButton>
								</div>
							</Grid>
						</Grid>
					</Box>
				</CardContent>
			</Card>
		</>
	);
}

// -------------------- chat gpt ----------------------

// // Todo.tsx
// import React from 'react';
// import { Card, CardContent, Typography, Box, Grid, IconButton } from "@mui/material";
// import EditOutlineIcon from "@mui/icons-material/EditOutlined";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import { useTasks } from '@/contexts/tasksContext';
// import { ACTIONS } from '@/reducer/todosReducer';
// import { useToast } from '@/contexts/ToastContext';

// export default function Todo({ todo, handleOpen, setIsEditMode, setCurrentTask, setMessage }) {
// 	const { dispatch } = useTasks();
// 	const toast = useToast()

//   const handleTaskDone = (id) => {
//     dispatch({ type: ACTIONS.TOGGLE_DONE, payload: { id } });
//     toast.setToastMsg("لقد أكلمت المهمة");
//     toast.handleClick();
//   };

//   const handleDelete = (id) => {
//     dispatch({ type: ACTIONS.DELETE_TASK, payload: { id } });
//     handleClose();
//   };

//   const handleEdit = (id, title, body) => {
//     dispatch({ type: ACTIONS.EDIT_TASK, payload: { id, title, body } });
//     handleClose();
//   };

//   return (
//     <Card>
//       <CardContent>
//         <Box>
//           <Grid container spacing={2}>
//             <Grid item xs={8}>
//               <Typography
//                 variant="body1"
//                 sx={{
//                   textAlign: "right",
//                   mb: "10px",
//                   textDecoration: todo.isDone ? "line-through" : "none",
//                 }}
//               >
//                 {todo.body}
//               </Typography>
//             </Grid>
//             <Grid
//               item
//               xs={4}
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-around",
//               }}
//             >
//               <IconButton
//                 color="inherit"
//                 aria-label="edit task"
//                 onClick={() => {
//                   setIsEditMode(true);
//                   setCurrentTask(todo);
//                   setMessage("تعديل مهمة");
//                   handleOpen();
//                 }}
//               >
//                 <EditOutlineIcon />
//               </IconButton>
//               <IconButton
//                 color="inherit"
//                 aria-label="mark task as done"
//                 onClick={() => handleTaskDone(todo.id)}
//               >
//                 <CheckCircleOutlineIcon />
//               </IconButton>
//               <IconButton
//                 color="inherit"
//                 aria-label="delete task"
//                 onClick={() => {
//                   setIsEditMode(false);
//                   setCurrentTask(todo);
//                   setMessage("هل أنت متأكد أنك تريد حذف هذه المهمة؟");
//                   handleOpen();
//                 }}
//               >
//                 <DeleteOutlineIcon />
//               </IconButton>
//             </Grid>
//           </Grid>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }

// ==================================== old Code ========================================
// ==================================== old Code ========================================
// ==================================== old Code ========================================
// ==================================== old Code ========================================

// import * as React from "react";
// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// // import { Divider } from '@mui/material';

// // Grid:
// import Grid from "@mui/material/Unstable_Grid2";

// // icons:
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import EditOutlineIcon from "@mui/icons-material/Edit";
// import IconButton from "@mui/material/IconButton";

// // Modal:
// import TransitionsModal from "@/components/Modal";
// import ModalEditing from "./ModalEditing";

// // #dad7cd
// // #a3b18a
// // #588157
// // #3a5a40
// // #344e41

// // contexts:
// import { TasksContext } from "@/contexts/tasksContext";
// import { useContext } from "react";

// interface Types {
// 	todo?: TaskType;
// 	changeHandler?: (id: number) => void;
// }

// interface TaskType {
// 	id?: number;
// 	title?: string;
// 	body?: string;
// 	isDone?: boolean;
// }

// // export default function Todo({ title, body, isDone = false }: Types) {
// export default function Todo({ todo }: Types) {
// 	const { tasksMenu, setTasksMenu } = useContext(TasksContext);

// 	const [open, setOpen] = React.useState(false);
// 	const handleOpen = () => setOpen(true);
// 	const handleClose = () => setOpen(false);
// 	const [message, setMessage] = React.useState("");

// 	function handleTaskDone(id: number) {
// 		const targetTask = tasksMenu.find(
// 			(task: TaskType) => task.id.toString() === id
// 		);
// 		targetTask.isDone = !targetTask.isDone;
// 		const updatedTodos = tasksMenu.map((task: TaskType) => {
// 			if (targetTask.id == task.id) {
// 				return targetTask;
// 			}
// 			return task;
// 		});
// 		setTasksMenu(updatedTodos);
// 	}

// 	function handleDelete(id: number) {
// 		const updatedTodos = tasksMenu.filter((task: TaskType) => {
//             return task.id != id;
// 		});
// 		setTasksMenu(updatedTodos);
// 	}
// 	return (
// 		<>
// 			<TransitionsModal
// 				isOpen={open}
// 				handleClose={handleClose}
// 				handleOpen={handleOpen}
//                 message={message}
//                 handleDelete={handleDelete}
//                 // handleEdit={handleEdit}
//                 taskId={todo.id}
// 			/>
// 			<Card
// 				className={"todo"}
// 				sx={{
// 					minWidth: 275,
// 					bgcolor: todo?.isDone ? "#a3b18a" : "#415a77",
// 					my: "10px",
// 					padding: "5px",
// 					color: "#fdfdfd",
// 					borderRadius: "15px",
// 				}}
// 			>
// 				<CardContent>
// 					<Box sx={{ flexGrow: 1 }}>
// 						<Grid container spacing={2}>
// 							<Grid xs={8}>
// 								<Typography
// 									variant="h5"
// 									component="div"
// 									sx={{
// 										textAlign: "right",
// 										fontSize: "1.5rem",
// 										mb: "10px",
// 										textDecoration: todo?.isDone
// 											? "1px line-through black "
// 											: "none",
// 									}}
// 								>
// 									{todo.title}
// 								</Typography>
// 								<Typography
// 									variant="h5"
// 									component="div"
// 									sx={{ textAlign: "right", fontSize: ".8rem", color: "#000" }}
// 								>
// 									{todo.body}
// 								</Typography>
// 							</Grid>

// 							<Grid xs={4}>
// 								<div
// 									style={{
// 										display: "flex",
// 										justifyContent: "space-evenly",
// 										alignItems: "center",
// 										height: "100%",
// 									}}
// 								>
// 									{/* <DeleteOutlineIcon /> */}
// 									<IconButton
// 										aria-label="delete"
// 										size="small"
// 										className="button-icon"
// 										sx={{
// 											color: "#b53232",
// 											bgcolor: "#fff",
// 											border: "solid #b53232 1px",
// 										}}
// 										onClick={() => {
// 											setMessage("هل أنت متأكد من حذف هذه المهمة ؟");
//                                             handleOpen();
//                                             // handleDelete(todo.id);
//                                         }}
//                                         // handleDelete={}
// 									>
// 										<DeleteOutlineIcon />
// 									</IconButton>

// 									<IconButton
// 										aria-label="done"
// 										size="small"
// 										className="button-icon"
// 										sx={{
// 											color: "#588157",
// 											bgcolor: "#fff",
// 											border: "solid #588157 1px",
// 										}}
// 										onClick={() => {
// 											handleTaskDone(todo.id);
// 										}}
// 									>
// 										<CheckCircleOutlineIcon />
// 									</IconButton>

// 									<IconButton
// 										aria-label="edit"
// 										size="small"
// 										className="button-icon"
// 										sx={{
// 											color: "#1e88e5",
// 											bgcolor: "#fff",
// 											border: "solid #1e88e5 1px",
// 										}}
// 										onClick={() => {
// 											setMessage("تعديل");
// 											handleOpen();
// 										}}
// 									>
// 										<EditOutlineIcon />
// 									</IconButton>
// 								</div>
// 							</Grid>
// 						</Grid>
// 					</Box>
// 				</CardContent>
// 			</Card>
// 		</>
// 	);
// }

//
