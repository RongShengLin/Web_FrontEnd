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
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Billing page components
import Transaction from "layouts/billing/components/Transaction";

function Transactions() {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Trade Summary&apos;s
        </MDTypography>
        <MDBox display="flex" alignItems="flex-start">
          <MDBox color="text" mr={0.5} lineHeight={0}>
            <Icon color="inherit" fontSize="small">
              date_range
            </Icon>
          </MDBox>
          <MDTypography variant="button" color="text" fontWeight="regular">
            23 - 30 March 2020
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <MDBox mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            Price Summary
          </MDTypography>
        </MDBox>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          <Transaction
            color="error"
            icon="attach_money"
            name="Item Name 1"
            number="1"
            value="$1000"
          />
          <Transaction
            color="error"
            icon="attach_money"
            name="Item Name 2"
            number="1"
            value="$1000"
          />
          <Transaction
            color="error"
            icon="attach_money"
            name="Item Name 3"
            number="2"
            value="$1000"
          />
        </MDBox>
        <Divider />
        <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            Total Price
          </MDTypography>
          <Box
            flexGrow={1}
            borderBottom="1px dashed gray"
            mx={2}
          />
          <MDTypography variant="button" color="error" fontWeight="medium" textGradient>
            $4000
          </MDTypography>
        </MDBox>
        <MDBox
          height="300px"
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
    </Card>
  );
}

export default Transactions;
