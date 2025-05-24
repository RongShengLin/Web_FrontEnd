import React, { useState } from "react";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";


export default function TimeManager() {
  const [inputValue, setInputValue] = useState("");
  const [timeList, setTimeList] = useState([]);
  
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const textColor = darkMode ? "#ffffff" : "#000000";

  const handleAddTime = () => {
    if (inputValue) {
      setTimeList((prev) => [...prev, inputValue]);
      setInputValue("");
    }
  };

  const handleRemoveTime = (indexToRemove) => {
    setTimeList((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  return (
    <MDBox>
      <MDTypography variant="h6" gutterBottom>
        Available Time setting
      </MDTypography>

      <MDBox display="flex" gap={2} mb={2}>
        <TextField
          type="datetime-local"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <MDButton variant="contained" color="primary" onClick={handleAddTime}>
            ADD
        </MDButton>
      </MDBox>

      <Accordion defaultExpanded sx={(theme) => ({
            width: "100%",
            background: (darkMode) ? theme.palette.background.card : theme.palette.white.main,
            color: textColor,
            boxShadow: 'none',
            '&::before': { display: 'none' },
        })}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"   
        >
          <MDTypography variant="h6">Available Time</MDTypography>
        </AccordionSummary>
        <AccordionDetails>
            <List>
                {timeList.map((time, index) => (
                    <ListItem
                        key={index}
                        secondaryAction={
                            <IconButton edge="end" onClick={() => handleRemoveTime(index)}>
                            <DeleteIcon color="error"/>
                            </IconButton>
                        }
                    >
                        <ListItemText primary={new Date(time).toLocaleString()} />
                    </ListItem>
                ))}
            </List>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}