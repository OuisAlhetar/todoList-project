import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Switch from "@mui/material/Switch";
import WavingHandIcon from "@mui/icons-material/WavingHand";
// import Collapse from "@material-ui/core/Collapse";
// import Paper from "@material-ui/core/Paper";

import { useState } from "react";
const label = { inputProps: { "aria-label": "Switch demo" } };

export default function AccordionExpandIcon() {
	const [heightValue, setHeightValue] = useState("15vh");
	function handleBtn() {
		if (heightValue === "15vh") {
			setHeightValue("25vh");
		} else {
			setHeightValue("15vh");
		}
	}

	return (
		<div>
			<Accordion>
				<AccordionSummary
					expandIcon={<ArrowDownwardIcon />}
					aria-controls="panel1-content"
					id="panel1-header"
				>
					<Typography>Accordion 1</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
						malesuada lacus ex, sit amet blandit leo lobortis eget.
					</Typography>
				</AccordionDetails>
			</Accordion>

			{/* Second Accordion */}
			<Accordion>
				<AccordionSummary
					expandIcon={<ArrowDropDownIcon />}
					aria-controls="panel2-content"
					id="panel2-header"
				>
					<Typography>Accordion 2</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography sx={{ display: "flex", justifyContent: "center" }}>
						<Switch {...label} onClick={handleBtn} />
					</Typography>
				</AccordionDetails>
			</Accordion>
			<div
				className={`my-10 p-10 w-100 h-[${heightValue.toString()}] bg-orange-700 text-white text-center text-3xl`}
			>
				<WavingHandIcon sx={{fontSize:"3rem"}}/> Hello World
			</div>

			{/* <Collapse in={checked}>
				<Paper elevation={4} className={classes.paper}>
					<svg className={classes.svg}>
						<polygon
							points="0,100 50,00, 100,100"
							className={classes.polygon}
						/>
					</svg>
				</Paper>
			</Collapse> */}
		</div>
	);
}
