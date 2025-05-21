import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Divider,
  Switch,
  Icon,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";

import {
  useMaterialUIController,
  setOpenConfigurator,
  setDarkMode,
} from "context";

function Configurator({ onFilter }) {
  const [controller, dispatch] = useMaterialUIController();
  const { openConfigurator, darkMode } = controller;

  const [price, setPrice] = useState([0, 10000]);
  const [categories, setCategories] = useState([]);

  const categoryGroups = {
    "3C": ["Phone", "Laptop", "Screen"],
    "Others": ["Camera", "TV"],
  };

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
  const handleDarkMode = () => setDarkMode(dispatch, !darkMode);

  const handleCategoryChange = (event) => {
    const { name, checked } = event.target;
    setCategories((prev) =>
      checked ? [...prev, name] : prev.filter((item) => item !== name)
    );
  };

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  const handleStart = () => {
    console.log("Sending filters:", { price, categories });
    onFilter({ price, categories });
    handleCloseConfigurator();
  };

  return (
    <ConfiguratorRoot
      variant="permanent"
      anchor="right"
      style={{ display: openConfigurator ? 'block' : 'none' }}
      ownerState={{ openConfigurator }}
      onClose={handleCloseConfigurator}
    >
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={3}>
        <MDTypography variant="h5">Filter</MDTypography>
        <Icon sx={{ cursor: "pointer" }} onClick={handleCloseConfigurator}>close</Icon>
      </MDBox>

      <Divider />
      <MDBox pt={2} px={3}>
        <MDTypography variant="h6">Price</MDTypography>
        <Slider
          value={price}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={10000}
        />
      </MDBox>

      <Divider />
      <MDBox pt={2} px={3}>
        <MDTypography variant="h6">Category</MDTypography>

        {Object.entries(categoryGroups).map(([groupName, items]) => (
          <Accordion key={groupName} sx={{ background: "transparent", boxShadow: "none" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <MDTypography sx={{ fontWeight: "bold", color:"text" }}>
                {groupName}
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {items.map((item) => (
                  <FormControlLabel
                    key={item}
                    control={
                      <Checkbox
                        name={item}
                        checked={categories.includes(item)}
                        onChange={handleCategoryChange}
                      />
                    }
                    label={item}
                    sx={{ color: darkMode ? "#fff" : "#000" }}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        ))}
      </MDBox>

      <Divider />
      <MDBox px={3} py={2}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6">Dark Mode</MDTypography>
          <Switch checked={darkMode} onChange={handleDarkMode} />
        </MDBox>
      </MDBox>

      <MDBox px={3} pb={3}>
        <MDButton fullWidth color="info" onClick={handleStart}>
          Start
        </MDButton>
      </MDBox>
    </ConfiguratorRoot>
  );
}

Configurator.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default Configurator;
