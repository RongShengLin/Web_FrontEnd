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
import Pagination from '@mui/material/Pagination';
import IconButton from "@mui/material/IconButton";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import { useMaterialUIController, setOpenConfigurator} from "context";

// Material Dashboard 2 React example components
import HomePageLayout from "examples/LayoutContainers/HomePageLayout";
import HomePageNavbar from "examples/Navbars/HomePageNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import BannerCarousel from "examples/BannerCarousel"
import MDInput from "components/MDInput";

// Data
import reportsBarChartData from "layouts/HomePage/data/reportsBarChartData";
import reportsLineChartData from "layouts/HomePage/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/HomePage/components/Projects";
import OrdersOverview from "layouts/HomePage/components/OrdersOverview";

import homeDecor1 from "assets/images/home-decor-1.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { dark } from "@mui/material/styles/createPalette";
import { Icon } from "@mui/material";

function HomePage() {
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode, openConfigurator} = controller;
  const { sales, tasks } = reportsLineChartData;
  console.log(darkMode);
  const textColor = darkMode ? "#ffffff" : "#000000";
  console.log(textColor);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  return (
    <HomePageLayout>
      <HomePageNavbar />
      <MDBox p={2}>
        <BannerCarousel />
      </MDBox>
      <MDBox p={2} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <MDInput label="Search here" />
        <IconButton
          disableRipple
          color="inherit"
          onClick={handleConfiguratorOpen}
        >
          <Icon fontSize="large">sort</Icon>
        </IconButton>
        
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} xl={3}>
            <DefaultProjectCard
              image={homeDecor1}
              label="object type 1"
              title="object"
              description="Object description"
              action={{
                type: "internal",
                route: "/pages/profile/profile-overview",
                color: "primary",
                label: "view object",
              }}
              price="$1000"
            />
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <DefaultProjectCard
              image={homeDecor1}
              label="object type 1"
              title="object"
              description="Object description"
              action={{
                type: "internal",
                route: "/pages/profile/profile-overview",
                color: "primary",
                label: "view object",
              }}
              price="$1000"
            />
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <DefaultProjectCard
              image={homeDecor1}
              label="object type 1"
              title="object"
              description="Object description"
              action={{
                type: "internal",
                route: "/pages/profile/profile-overview",
                color: "primary",
                label: "view object",
              }}
              price="$1000"
            />
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <DefaultProjectCard
              image={homeDecor1}
              label="object type 1"
              title="object"
              description="Object description"
              action={{
                type: "internal",
                route: "/pages/profile/profile-overview",
                color: "primary",
                label: "view object",
              }}
              price="$1000"
            />
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <DefaultProjectCard
              image={homeDecor1}
              label="object type 1"
              title="object"
              description="Object description"
              action={{
                type: "internal",
                route: "/pages/profile/profile-overview",
                color: "primary",
                label: "view object",
              }}
              price="$1000"
            />
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <DefaultProjectCard
              image={homeDecor1}
              label="object type 1"
              title="object"
              description="Object description"
              action={{
                type: "internal",
                route: "/pages/profile/profile-overview",
                color: "primary",
                label: "view object",
              }}
              price="$1000"
            />
          </Grid>
        </Grid>
      </MDBox>
      {/* <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Users"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox> */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item>
          <Pagination count={10} sx={(theme) => ({
              '& .MuiPaginationItem-root': {
                color: textColor,
              },
              '& .Mui-selected': {
                backgroundColor: theme.palette.primary.main,
                color: textColor,
              },
            })}  showFirstButton showLastButton />
        </Grid>
      </Grid>
      <Footer />
    </HomePageLayout>
  );
}

export default HomePage;
