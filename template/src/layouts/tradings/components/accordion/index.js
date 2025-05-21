import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from "@mui/material/Grid";
import Pagination from '@mui/material/Pagination';

import { useMaterialUIController } from "context";


import PropTypes from "prop-types";

import MDTypography from "components/MDTypography";
import MDBox from 'components/MDBox';


function AccordionUsage({title, children}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const textColor = darkMode ? "#ffffff" : "#000000";
  return (
      <Accordion defaultExpanded sx={(theme) => ({
            width: "100%",
            background: (darkMode) ? theme.palette.background.card : "white",
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
            <MDBox pt={3}>
                {children}
            </MDBox>
        </AccordionDetails>
      </Accordion>
  );
}

AccordionUsage.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AccordionUsage