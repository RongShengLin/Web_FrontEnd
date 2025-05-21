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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";
import CardMedia from "@mui/material/CardMedia";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import { Grid } from "@mui/material";

function Bill({ image, name, price, number_items, noGutter }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "grey-800" : "grey-100"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <CardMedia
            src={image}
            component="img"
            title={name}
            sx={{
              maxWidth: "100%",
              margin: 0,
              boxShadow: ({ boxShadows: { md } }) => md,
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <MDBox width="100%" display="flex" flexDirection="column">
            <MDBox
              display="flex"
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              flexDirection={{ xs: "column", sm: "row" }}
              mb={2}
            >
              <MDTypography variant="h5" fontWeight="medium" textTransform="capitalize">
                {name}
              </MDTypography>

              <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                <MDBox mr={1}>
                  <MDButton variant="text" color="error">
                    <Icon>delete</Icon>&nbsp;delete
                  </MDButton>
                </MDBox>
                <MDButton variant="text" color={darkMode ? "white" : "dark"}>
                  <Icon>edit</Icon>&nbsp;edit
                </MDButton>
              </MDBox>
            </MDBox>
            <MDBox mb={1} lineHeight={0}>
              <MDTypography variant="h6" color="text">
                Total Price:&nbsp;&nbsp;&nbsp;
                <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize" component="span">
                  {price}
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDBox mb={1} lineHeight={0}>
              <MDTypography variant="h6" color="text">
                number of items:&nbsp;&nbsp;&nbsp;
                <MDTypography variant="h6" fontWeight="medium" component="span">
                  {number_items}
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

// Setting default values for the props of Bill
Bill.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Bill.propTypes = {
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  number_items: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Bill;
