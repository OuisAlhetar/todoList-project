import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


// import { ToastContext } from "@/contexts/ToastContext";
import { useToast } from "@/contexts/ToastContext";


interface ToastTypes{
  isOpen?: boolean;
  handleOpen?: () => void;
  handleClose?: () => void;
}


export default function MyToast({isOpen}:ToastTypes) {

  const toast = useToast(); //! as provider

	return (
		<div>
			{/* <Button onClick={toast.handleClick} sx={{ color: "red" }}>
				Open Snackbar
			</Button> */}
			<Snackbar open={isOpen}>
				<Alert severity="success" variant="filled" sx={{ width: "100%" }}>
					{toast.toastMsg}
				</Alert>
			</Snackbar>
		</div>
	);
}
