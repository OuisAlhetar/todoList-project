import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	direction: "rtl",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

interface Type {
	isOpen: boolean;
	handleClose: () => void;
	handleOpen?: () => void;
	handleEdit?: (id: number) => void;
	message?: string;
	taskId: number;
}

export default function ModalEditing({
	isOpen,
	handleClose,
	message,
	handleEdit,
	todo,
}: Type) {
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
						</Typography>
						<hr style={{ marginBottom: "10px" }} />
						<Typography id="transition-modal-description" sx={{ mt: 2 }}>
							<Button
								variant="contained"
								sx={{
									ml: "4px",
									bgcolor: "red",
									padding: "3px",
									width: "10%",
									float: "left",
								}}
								onClick={() => {
									handleDelete(todo.id);
								}}
							>
								نعم
							</Button>
							<Button
								variant="contained"
								color="primary"
								sx={{
									mx: "4px",
									padding: "3px",
									width: "10%",
									float: "left",
								}}
								onClick={() => {
									handleClose();
								}}
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
