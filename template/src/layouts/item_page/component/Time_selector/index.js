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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";
import PropTypes from "prop-types";


export default function TimeManager({ value = [], onChange }) {
  const [timeList] = useState(["2025-05-24T12:00", "2025-05-25T14:30", "2025-05-26T09:15",]);
  
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const textColor = darkMode ? "#ffffff" : "#000000";

  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleCheck = (index) => {
    const newIndex = index === selectedIndex ? null : index;
    setSelectedIndex(newIndex);
    if (onChange) {
      onChange(newIndex !== null ? value[newIndex] : null);
    }
  };

  return (
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
            <ListItem key={index} disablePadding>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedIndex === index}
                    onChange={() => handleCheck(index)}
                  />
                }
                label={new Date(time).toLocaleString()}
              />
            </ListItem>
          ))}
        </List>
    </AccordionDetails>
    </Accordion>
  );
}

TimeManager.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};