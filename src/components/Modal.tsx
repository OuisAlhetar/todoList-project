// Modal.tsx:
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

// context:
import { useToast } from "@/contexts/ToastContext";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	direction: "rtl",
	transform: "translate(-50%, -50%)",
	width: 450,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	pb: 3,
};

interface Type {
	isOpen: boolean;
	handleClose: () => void;
	handleDelete: (id: number) => void;
	handleEdit: (id: number, title: string, body: string) => void;
	message?: string;
	taskId: number;
	taskTitle: string;
	taskBody: string;
	isEditMode: boolean;
}

export default function TransitionsModal({
	isOpen,
	handleClose,
	message,
	handleEdit,
	handleDelete,
	taskId,
	taskTitle,
	taskBody,
	isEditMode,
}: Type) {
	const [title, setTitle] = React.useState(taskTitle);
	const [body, setBody] = React.useState(taskBody);

	const toast = useToast();

	React.useEffect(() => {
		setTitle(taskTitle);
		setBody(taskBody);
	}, [taskTitle, taskBody]);

	const handleEditSubmit = () => {
		handleEdit(taskId, title, body);
		handleClose();
		toast.setToastMsg(`تم التعديل بنجاح`);
		toast.handleClick();
	};

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={isOpen}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={isOpen}>
					<Box sx={style}>
						<Typography id="transition-modal-title" variant="h6" component="h2">
							{message}
							{isEditMode && (
								<Box
									component="form"
									sx={{
										width: 500,
										maxWidth: "100%",
										padding: "10px",
										mr: "10px",
									}}
									noValidate
									autoComplete="off"
								>
									<TextField
										fullWidth
										sx={{ my: "5px" }}
										id="title"
										label="العنوان"
										variant="outlined"
										size="small"
										value={title}
										onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
											setTitle(event.target.value)
										}
									/>
									<TextField
										fullWidth
										sx={{ my: "5px" }}
										id="body"
										label="التفاصيل"
										variant="outlined"
										size="small"
										value={body}
										onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
											setBody(event.target.value)
										}
									/>
								</Box>
							)}
						</Typography>
						<hr style={{ marginBottom: "10px" }} />
						<Typography id="transition-modal-description" sx={{ mt: 2, mb: 0 }}>
							{isEditMode ? (
								<Button
									variant="contained"
									sx={{
										mx: "4px",
										padding: "3px",
										width: "10%",
										float: "left",
										bgcolor: "#344e41",
									}}
									onClick={handleEditSubmit}
								>
									حفظ
								</Button>
							) : (
								<>
									<h6 style={{ marginBottom: "20px" }}>
										المهمة :{" "}
										<span
											style={{
												color: "darkblue",
												fontWeight: "bold",
												fontSize: "1.5rem",
												wordWrap: "break-word",
												display: "block",
											}}
										>
											{title}
										</span>{" "}
									</h6>
									<Button
										variant="contained"
										sx={{
											ml: "4px",
											bgcolor: "#b53232",
											padding: "3px",
											width: "10%",
											float: "left",
										}}
										onClick={() => {
											handleDelete(taskId);
											toast.setToastMsg(`تم الحذف بنجاح`);
											toast.handleClick();
										}}
									>
										حذف
									</Button>
								</>
							)}
							<Button
								variant="contained"
								color="secondary"
								sx={{
									mx: "7px",
									padding: "3px",
									width: "10%",
									float: "left",
								}}
								onClick={handleClose}
							>
								إغلاق
							</Button>
						</Typography>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}

// ===================================== old Code ==========================================
// ===================================== old Code ==========================================
// ===================================== old Code ==========================================
// ===================================== old Code ==========================================
// ===================================== old Code ==========================================
// ===================================== old Code ==========================================
// ===================================== old Code ==========================================

// import * as React from "react";
// import Backdrop from "@mui/material/Backdrop";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import Fade from "@mui/material/Fade";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { TextField } from "@mui/material";
// const style = {
// 	position: "absolute" as "absolute",
// 	top: "50%",
// 	left: "50%",
// 	direction: "rtl",
// 	transform: "translate(-50%, -50%)",
// 	width: 400,
// 	bgcolor: "background.paper",
// 	border: "2px solid #000",
// 	boxShadow: 24,
// 	p: 4,
// };

// interface Type {
// 	isOpen: boolean;
// 	handleClose: () => void;
// 	handleOpen?: () => void;
// 	handleDelete?: (id: number) => void;
// 	handleEdit?: (id: number) => void;
// 	message?: string;
// 	taskId: number;
// }

// export default function TransitionsModal({
// 	isOpen,
// 	handleClose,
//     message,
//     handleEdit,
// 	handleDelete,
// 	taskId,
// }: Type) {
// 	return (
// 		<div>
// 			<Modal
// 				aria-labelledby="transition-modal-title"
// 				aria-describedby="transition-modal-description"
// 				open={isOpen}
// 				onClose={handleClose}
// 				closeAfterTransition
// 				slots={{ backdrop: Backdrop }}
// 				slotProps={{
// 					backdrop: {
// 						timeout: 500,
// 					},
// 				}}
// 			>
// 				<Fade in={isOpen}>
// 					<Box sx={style}>
// 						<Typography id="transition-modal-title" variant="h6" component="h2">
// 							{message}
// 							<Box
// 								component="form"
// 								sx={{
// 									width: 500,
// 									maxWidth: "100%",
// 									padding: "10px",
// 									mr: "10px",
// 								}}
// 								noValidate
// 								autoComplete="off"
// 							>
// 								<TextField
// 									fullWidth
// 									sx={{ my: "5px" }}
// 									id="fullWidth"
// 									label="العنوان"
// 									variant="outlined"
// 									size="small"
// 									// onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
// 									// value={todo.title}
// 								/>
// 								<TextField
// 									fullWidth
// 									sx={{ my: "5px" }}
// 									id="fullWidth"
// 									label="التفاصيل"
// 									variant="outlined"
// 									size="small"
// 									// onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
// 									// value={todo.body}
// 								/>
// 							</Box>
// 						</Typography>
// 						<hr style={{ marginBottom: "10px" }} />
// 						<Typography id="transition-modal-description" sx={{ mt: 2 }}>
// 							<Button
// 								variant="contained"
// 								sx={{
// 									ml: "4px",
// 									bgcolor: "red",
// 									padding: "3px",
// 									width: "10%",
// 									float: "left",
// 								}}
// 								onClick={() => {
// 									handleDelete(taskId);
// 								}}
// 							>
// 								نعم
// 							</Button>
// 							<Button
// 								variant="contained"
// 								color="primary"
// 								sx={{
// 									mx: "4px",
// 									padding: "3px",
// 									width: "10%",
// 									float: "left",
// 								}}
// 								onClick={() => {
// 									handleClose();
// 								}}
// 							>
// 								إغلاق
// 							</Button>
// 						</Typography>
// 					</Box>
// 				</Fade>
// 			</Modal>
// 		</div>
// 	);
// }
