import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface Types {
	type: string;
	handleAlignment: Dispatch<SetStateAction<string>>;
}

export default function ColorToggleButton({ type, handleAlignment }: Types) {
	const handleChange = (
		event: React.MouseEvent<HTMLElement>,
		newAlignment: string
	) => {
		handleAlignment(newAlignment);
	};

	return (
		<ToggleButtonGroup
			color="primary"
			value={type}
			exclusive
			onChange={handleChange}
			aria-label="Platform"
			sx={{
				display: "flex",
				justifyContent: "center",
				my: "10px",
				color: "black",
				fontSize: ".1rem",
			}}
		>
			<ToggleButton value="all" style={{ borderRadius: "0px" }}>
				الكل
			</ToggleButton>
			<ToggleButton value="done" style={{ borderRadius: "0px" }}>
				منجز
			</ToggleButton>
			<ToggleButton
				value="non-done"
				style={{ borderLeft: "1px solid #d6d6d6", borderRadius: "0px" }}
			>
				غير منجز
			</ToggleButton>
		</ToggleButtonGroup>
	);
}
