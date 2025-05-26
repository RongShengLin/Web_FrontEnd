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
import TimeManager from "./component/Time_selector/index.js";

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

import Item_Page_ID from "./api.js";
function Item_Page() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const { sales, tasks } = reportsLineChartData;
  console.log(darkMode);
  const textColor = darkMode ? "#ffffff" : "#000000";
  console.log(textColor);

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
                </Grid>
                <Grid item xs={12} md={7}>
                    <MDBox mt={3} mb={3} ml={3}>
                        <MDTypography variant="h2" fontWeight="bold" textTransform="capitalize">
                            Item Name
                        </MDTypography>
                        <MDBox mt={2} ml={2} mr={2}>
                            <Card sx={(theme) => ({
                                boxShadow: 'none',
                                padding: 1,
                                backgroundColor: darkMode ? theme.palette.grey[800] : theme.palette.grey[200],
                            })}>
                                <MDTypography variant="h3" fontWeight="bold" sx={{ color: "red" }}>
                                    $1000
                                </MDTypography>
                            </Card>
                        </MDBox>
                        <MDBox mt={2} mb={2} mr={4} sx={{
                            maxHeight: "100px",
                            minHeight: "75px",
                        }}>
                            <MDTypography variant="h4" fontWeight="medium">
                                description:Text
                            </MDTypography>
                        </MDBox>
                        <MDBox mt={2} mb={2} mr={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={2}>
                                    <BasicSelect />
                                </Grid>
                                <Grid item md={2} sx={{ display: { xs: 'none', md: 'block' } }} />
                                <Grid item xs={12} md={2}>
                                    <MDButton sx={(theme)=>({
                                        backgroundColor: darkMode ? theme.palette.grey[800] : theme.palette.grey[200],
                                    })}>
                                        <FavoriteIcon sx={(theme) => ({ color: "primary.main" })}/>
                                        <MDTypography variant="h6" fontWeight="medium" color="primary">
                                            Like
                                        </MDTypography>
                                    </MDButton>
                                </Grid>
                                 {/* <Grid item xs={12} md={3}>
                                    <MDButton variant="outlined" color="primary">
                                        <Icon sx={(theme) => ({ color: "primary.main" })}>shopping_cart</Icon>
                                        <MDTypography variant="h6" fontWeight="medium" color="primary">
                                            Add to cart
                                        </MDTypography>
                                    </MDButton>
                                </Grid> */}
                                 <Grid item xs={12} md={3}>
                                    <MDButton variant="contained" color="primary">
                                        <MDTypography variant="h6" fontWeight="medium" color="white">
                                            Buy Now
                                        </MDTypography>
                                    </MDButton>
                                </Grid>
                            </Grid>
                        </MDBox>
                        <MDBox mt={2} mb={2} mr={4} sx={{
                            maxHeight: "100px",
                            minHeight: "75px",
                        }}>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <LoyaltyIcon color="primary"></LoyaltyIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Payment method: None" sx={{
                                        '& .MuiTypography-root': {
                                            color: darkMode? "#ffffff" : "#000000",
                                        },
                                    }}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <LoyaltyIcon color="primary"></LoyaltyIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="trading place: None" sx={{
                                        '& .MuiTypography-root': {
                                            color: darkMode? "#ffffff" : "#000000",
                                        },
                                    }}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <LoyaltyIcon color="primary"></LoyaltyIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="trader: None" sx={{
                                        '& .MuiTypography-root': {
                                            color: darkMode? "#ffffff" : "#000000",
                                        },
                                    }}/>
                                </ListItem>
                            </List>
                        </MDBox>
                        <MDBox display="flex" alignItems="center" gap={1} mb={1}>
                            <MDTypography variant="h4" fontWeight="bold" textTransform="capitalize">
                                Trading Times
                            </MDTypography>
                        </MDBox>
                        <MDBox display="flex" alignItems="center" gap={1} mb={1}>
                            <TimeManager />
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

export default Item_Page;