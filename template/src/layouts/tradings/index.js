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
import QueueTradingData from "layouts/tradings/data/ComfirmTradingData";
import AwaitTradingData from "layouts/tradings/data/AwaitTradingData";
import ApprovalTradingData from "layouts/tradings/data/ApprovalTradingData";
import HistoryTradingData from "layouts/tradings/data/HistoryTradingData";
import AccordionUsage from "./components/accordion";

import { useEffect, useState } from "react";
import { BASE_URL } from "api/setting";

function Tradings() {
  const [transactions, setTransactions] = useState([]);
  const [username, setUsername] = useState("");

  const fetchTransactions = async () => {
    const res = await fetch(`${BASE_URL}/api/auctions/transaction_list/`, { credentials: "include" });
    const data = await res.json();
    setTransactions(data);
    console.log("Fetched transactions:", data);
  };


  // const { columns, rows } = authorsTableData();
  const { columns: TradingColumns, rows: TradingRows} = QueueTradingData({ transactions, currentUsername: username, onUpdate: fetchTransactions });
  const { columns: AwaitColumns, rows: AwaitRows } = AwaitTradingData({ transactions, currentUsername: username, onUpdate: fetchTransactions });
  const { columns: ApprovalColumns, rows: ApprovalRows } = ApprovalTradingData({ transactions, currentUsername: username, onUpdate: fetchTransactions });
  const { columns: HistoryColumns, rows: HistoryRows } = HistoryTradingData({ transactions, currentUsername: username, onUpdate: fetchTransactions });
  

   useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${BASE_URL}/api/user/`, { credentials: "include" });
      const user = await res.json();
      setUsername(user.name);
    };

    fetchUser();
    fetchTransactions();
  }, []);
  

  return (
    <HomePageLayout>
      <HomePageNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <AccordionUsage title={"Trade Queue"}>
              <DataTable
                table={{ columns: TradingColumns, rows: TradingRows}}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </AccordionUsage>
          </Grid>
           <Grid item xs={12}>
             <AccordionUsage title={"Self Approval"}>
              <DataTable
                table={{ columns: ApprovalColumns, rows: ApprovalRows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </AccordionUsage>
          </Grid>
          <Grid item xs={12}>
             <AccordionUsage title={"Await Confirm"}>
              <DataTable
                table={{ columns: AwaitColumns, rows: AwaitRows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </AccordionUsage>
          </Grid>
          <Grid item xs={12}>
             <AccordionUsage title={"Trade History"}>
              <DataTable
                table={{ columns: HistoryColumns, rows: HistoryRows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </AccordionUsage>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </HomePageLayout>
  );

  return (
    <HomePageLayout>
      <HomePageNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <AccordionUsage title={"Trade Queue"}>
              <DataTable
                table={{ columns: QueueColumns, rows: QueueRows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </AccordionUsage>
          </Grid>
          <Grid item xs={12}>
             <AccordionUsage title={"Self Approval"}>
              <DataTable
                table={{ columns: ApprovalColumns, rows: ApprovalRows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </AccordionUsage>
          </Grid>
          <Grid item xs={12}>
             <AccordionUsage title={"Await Confirm"}>
              <DataTable
                table={{ columns: AwaitColumns, rows: AwaitRows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </AccordionUsage>
          </Grid>
          <Grid item xs={12}>
             <AccordionUsage title={"Trade History"}>
              <DataTable
                table={{ columns: HistoryColumns, rows: HistoryRows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </AccordionUsage>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </HomePageLayout>
  );
}
export default Tradings;
