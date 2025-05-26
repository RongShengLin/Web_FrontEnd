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

// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import CardMedia from "@mui/material/CardMedia";
import { Grid } from "@mui/material";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";
import Bill from "layouts/billing/components/Bill";
import { useNavigate } from "react-router-dom";

function ProfilesList({ title, profiles, shadow }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const navigate = useNavigate();
  const renderProfiles = profiles.map(({ image, name, price, num_item}) => (
    <Bill key={name || index} image={image} name={name} price={price} number_items={num_item} />
  ));

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
      </MDBox>
      <MDBox pt={1} px={2}>
        <MDButton variant="outlined" color="primary" onClick={() => navigate("/item_create")}>
          <Icon>file_upload</Icon>&nbsp;Upload Product
        </MDButton> 
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderProfiles}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfilesList
ProfilesList.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfilesList
ProfilesList.propTypes = {
  title: PropTypes.string.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  shadow: PropTypes.bool,
};

export default ProfilesList;
