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
import Pagination from '@mui/material/Pagination';
import PaginationItem from "@mui/material/PaginationItem";
import PropTypes from "prop-types";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import HomePageLayout from "examples/LayoutContainers/HomePageLayout";
import HomePageNavbar from "examples/Navbars/HomePageNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tradings/data/traderTableData";
import ComfirmTradingData from "layouts/tradings/data/ComfirmTradingData";
import AccordionUsage from "./components/accordion";

function Tradings() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = ComfirmTradingData();
  return (
    <HomePageLayout>
      <HomePageNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <AccordionUsage title={"Comfired Tradings"}>
              <DataTable
                table={{ columns: pColumns, rows: pRows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </AccordionUsage>
          </Grid>
          <Grid item xs={12}>
            
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </HomePageLayout>
  );
}
export default Tradings;
