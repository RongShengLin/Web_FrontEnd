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
import PropTypes from "prop-types";


export default function TimeManager({ value, onChange }) {
  const [inputValue, setInputValue] = useState("");
  const [timeList, setTimeList] = useState([]);
  
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const textColor = darkMode ? "#ffffff" : "#000000";

  const handleAddTime = () => {
    if (inputValue && !timeList.includes(inputValue)) {
      setTimeList((prev) =>
        [...prev, inputValue].sort((a, b) => new Date(a) - new Date(b))
      );
      onChange([...value, inputValue]); 
      setInputValue("");
    }
  };

  const handleRemoveTime = (indexToRemove) => {
    setTimeList((prev) => prev.filter((_, i) => i !== indexToRemove));
    onChange(updated);
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
                {value.map((time, index) => (
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

TimeManager.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};