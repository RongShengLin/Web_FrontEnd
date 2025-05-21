/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import Icon from "@mui/material/Icon";
import CardMedia from "@mui/material/CardMedia";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team2 from "assets/images/team-2.jpg";
import homeDecor1 from "assets/images/home-decor-1.jpg";
import { Description } from "@mui/icons-material";
import MDButton from "components/MDButton";

export default function data() {
  const Author = ({ image, name, email }) => (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDAvatar src={image} name={name} size="sm" />
        <MDBox ml={2} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {name}
          </MDTypography>
          <MDTypography variant="caption">{email}</MDTypography>
        </MDBox>
      </MDBox>
  );
  const Product = ({ image, name }) => (
    <MDBox display="flex" alignItems="center">
      <CardMedia
        src={image}
        component="img"
        title={name}
        sx={{
          maxWidth: "200px",
          width: "200px",
          margin: 0,
          boxShadow: ({ boxShadows: { md } }) => md,
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Product", accessor: "Product", width: "30%", align: "left" },
      { Header: "Name", accessor: "Name", align: "left" },
      { Header: "Price", accessor: "Price", align: "center" },
      { Header: "Number", accessor: "number", align: "center" },
      { Header: "Trader", accessor: "Trader", align: "center" },
      { Header: "Comfirm", accessor: "Await", align: "center" },
    ],

    rows: [
      {
        Product: <Product image={homeDecor1} name="Asana" />,
        Name: (
          <MDTypography variant="h5" color="text" fontWeight="medium">
            Item Name
          </MDTypography>
        ),
        Price: (
          <MDTypography variant="h5" color="error" fontWeight="medium">
            $10000
          </MDTypography>
        ),
        number: (
            <MDTypography variant="h5" color="text" fontWeight="medium">
            10
            </MDTypography>
        ),
        Trader: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        Await: (
          <MDTypography variant="h6" color="warning" fontWeight="medium">
            Awaiting Trader Comfirm
          </MDTypography>
        ),
      },
      {
        Product: <Product image={homeDecor1} name="Asana" />,
        Name: (
          <MDTypography variant="h5" color="text" fontWeight="medium">
            Item Name
          </MDTypography>
        ),
        Price: (
          <MDTypography variant="h5" color="error" fontWeight="medium">
            $10000
          </MDTypography>
        ),
        number: (
            <MDTypography variant="h5" color="text" fontWeight="medium">
            10
            </MDTypography>
        ),
        Trader: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        Await: (
          <MDTypography variant="h6" color="warning" fontWeight="medium">
            Awaiting Trader Comfirm
          </MDTypography>
        ),
      },
      {
        Product: <Product image={homeDecor1} name="Asana" />,
        Name: (
          <MDTypography variant="h5" color="text" fontWeight="medium">
            Item Name
          </MDTypography>
        ),
        Price: (
          <MDTypography variant="h5" color="error" fontWeight="medium">
            $10000
          </MDTypography>
        ),
        number: (
            <MDTypography variant="h5" color="text" fontWeight="medium">
            10
            </MDTypography>
        ),
        Trader: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        Await: (
          <MDTypography variant="h6" color="warning" fontWeight="medium">
            Awaiting Trader Comfirm
          </MDTypography>
        ),
      },
    ],
  };
}
