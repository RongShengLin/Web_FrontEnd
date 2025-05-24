/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Pagination from '@mui/material/Pagination';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Icon from "@mui/material/Icon";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";

// Material Dashboard 2 React example components
import HomePageLayout from "examples/LayoutContainers/HomePageLayout";
import HomePageNavbar from "examples/Navbars/HomePageNavbar";
import BasicSelect from "examples/Select";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import BannerCarousel from "examples/BannerCarousel"
import TransactionTimeList from "examples/Time_select"

// Data
import reportsBarChartData from "layouts/HomePage/data/reportsBarChartData";
import reportsLineChartData from "layouts/HomePage/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/HomePage/components/Projects";
import OrdersOverview from "layouts/HomePage/components/OrdersOverview";

import homeDecor1 from "assets/images/home-decor-1.jpg";
import { dark } from "@mui/material/styles/createPalette";
import { maxHeight, minHeight } from "@mui/system";
import theme from "assets/theme";
import MDInput from "components/MDInput";

function Item_Edit() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const { sales, tasks } = reportsLineChartData;
  console.log(darkMode);
  const [categories, setCategories] = useState([]);
  const textColor = darkMode ? "#ffffff" : "#000000";
  console.log(textColor);
  const categoryGroups = {
    "3C": ["Phone", "Laptop", "Screen"],
    "Tool": ["Hammer", "Screwdriver"],
    "Accessories": ["Bag", "Ring", "Necklace"],
    "Others": ["Camera", "TV"],
  };

  const handleCategoryChange = (event) => {
    const { name, checked } = event.target;
    setCategories((prev) =>
      checked ? [...prev, name] : prev.filter((item) => item !== name)
    );
  };

  return (
    <HomePageLayout>
      <HomePageNavbar />
      <MDBox mt={6} mb={3}>
        <Card>
            <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                    <MDBox mt={3} mb={3} ml={3}>
                        <CardMedia
                            src={homeDecor1}
                            component="img"
                            title="item_image"
                            sx={{
                                maxWidth: "100%",
                                width: "100%",
                                height: "60vh",
                                margin: 0,
                                boxShadow: ({ boxShadows: { md } }) => md,
                                objectFit: "cover",
                                objectPosition: "center",
                            }}
                        />
                    </MDBox>
                    <MDBox display="flex" alignItems="center" gap={1} mb={2} ml={2}>
                        <MDTypography variant="h4" fontWeight="bold" textTransform="capitalize">
                            Upload Image:
                        </MDTypography>
                        <MDInput type="file" accept="image/*" />
                    </MDBox>
                </Grid>
                <Grid item xs={12} md={7}>
                    <MDBox mt={3} mb={3} ml={3}>
                        <MDBox display="flex" alignItems="center" gap={1} mb={2}>
                            <MDTypography variant="h4" fontWeight="bold" textTransform="capitalize">
                                Product Name:
                            </MDTypography>
                            <MDInput label="Product Name" placeholder={"Product_name"} />
                        </MDBox>
                        <MDBox display="flex" alignItems="center" gap={1} mb={2}>
                            <MDTypography variant="h4" fontWeight="bold" sx={{ color: "red" }}>
                                Price:
                            </MDTypography>
                            <MDInput label="Price" placeholder={"Price"} />
                        </MDBox>
                        <MDBox display="flex" alignItems="center" gap={1} mb={2}>
                            <MDTypography variant="h4" fontWeight="medium">
                                description:
                            </MDTypography>
                        </MDBox>
                        <MDBox mr={1} mb={2}>
                            <MDInput label="Description" multiline rows={4} placeholder={"Description"} fullWidth/>
                        </MDBox>
                        <MDBox display="flex" alignItems="center" gap={1} mb={2}>
                            <MDTypography variant="h4" fontWeight="bold" textTransform="capitalize">
                                Number:
                            </MDTypography>
                            <MDInput label="Number" placeholder={"Number"} />
                        </MDBox>
                        <MDBox mt={2} mb={2} mr={4} sx={{
                            maxHeight: "100px",
                            minHeight: "75px",
                        }}>
                            <List>
                                <ListItem sx={{
                                    gap: 2,
                                    mb: 1,
                                }}>
                                    <ListItemIcon>
                                        <LoyaltyIcon color="primary"></LoyaltyIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Payment method:" sx={{
                                        '& .MuiTypography-root': {
                                            color: darkMode? "#ffffff" : "#000000",
                                        },
                                        flex: "0 0 auto"
                                    }}/>
                                    <MDInput label="Number" placeholder={"Number"} />
                                </ListItem>
                                 <ListItem sx={{
                                    gap: 2,
                                }}>
                                    <ListItemIcon>
                                        <LoyaltyIcon color="primary"></LoyaltyIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Trading place:" sx={{
                                        '& .MuiTypography-root': {
                                            color: darkMode? "#ffffff" : "#000000",
                                        },
                                        flex: "0 0 auto"
                                    }}/>
                                    <MDInput label="Trading_place" placeholder={"Trading_Place"} />
                                </ListItem>
                            </List>
                        </MDBox>
                        <MDBox display="flex" alignItems="center" gap={1} mb={1}>
                            <MDTypography variant="h4" fontWeight="bold" textTransform="capitalize">
                                Trading Times
                            </MDTypography>
                        </MDBox>
                        <MDBox display="flex" alignItems="center" gap={1} mb={2}>
                            <TransactionTimeList />
                        </MDBox>
                        <MDBox display="flex" alignItems="center" gap={1} mb={2}>
                            <MDTypography variant="h4" fontWeight="bold" textTransform="capitalize">
                                Tags
                            </MDTypography>
                        </MDBox>
                        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0} mr={2}>
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
                        <MDBox
                            height="100px"
                            position="relative"
                        >
                        <MDBox position="absolute" bottom={0} right={0} p={2}>
                            <MDBox display="flex" gap={2}>
                            <MDButton color="success">Comfirm</MDButton>
                            <MDButton color="error">Cancel</MDButton>
                            </MDBox>
                        </MDBox>
                        </MDBox>
                    </MDBox>
                </Grid>
            </Grid>
        </Card>
      </MDBox>
      <Footer />
    </HomePageLayout>
  );
}

export default Item_Edit;