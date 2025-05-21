import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useMaterialUIController } from "context";


import PropTypes from "prop-types";

import MDTypography from "components/MDTypography";


function AccordionUsage({title}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const textColor = darkMode ? "#ffffff" : "#000000";
  return (
      <Accordion sx={(theme) => ({
            width: "100%",
            background: theme.palette.background.sidenav,
            color: textColor,
            boxShadow: 'none',
            '&::before': { display: 'none' },
        })}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <MDTypography variant="h6">{title}</MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Phone" />
            <FormControlLabel control={<Checkbox />} label="Laptop" />
            <FormControlLabel control={<Checkbox />} label="Screen" />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
  );
}

AccordionUsage.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AccordionUsage