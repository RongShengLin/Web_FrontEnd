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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Icon from "@mui/material/Icon";
import StarIcon from '@mui/icons-material/Star';

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

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

  const Contact = ({method, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {method}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const Rate = ({score, max=5}) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {[...Array(max)].map((_, i) => (
        <Icon key={i} color="warning" fontSize="small">
        {i < score ? "star" : "star_border"}
        </Icon>
      ))}
    </MDBox>
  );

  return {
    columns: [
      { Header: "Trader", accessor: "Trader", width: "45%", align: "left" },
      { Header: "Contact information", accessor: "Contact_information", align: "left" },
      { Header: "Rate", accessor: "Rate", align: "center" },
      { Header: "Followers", accessor: "followers", align: "center" },
      { Header: "Prefer trading location", accessor: "location", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        Trader: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        Contact_information: <Contact method="Line" description="@DingDing" />,
        Rate: <Rate score={3} />,
        followers: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <FavoriteIcon fontSize="inherit" sx={(theme) => ({ color: "primary.main"})}/>
            10000
          </MDTypography>
        ),
        location: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Front gate
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="error" fontWeight="medium">
            <Icon>delete</Icon>
            delete
          </MDTypography>
        ),
      },
      {
        Trader: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        Contact_information: <Contact method="Line" description="@DingDing" />,
        Rate: <Rate score={3} />,
        followers: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <FavoriteIcon fontSize="inherit" sx={(theme) => ({ color: "primary.main"})}/>
            10000
          </MDTypography>
        ),
        location: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Front gate
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="error" fontWeight="medium">
            <Icon>delete</Icon>
            delete
          </MDTypography>
        ),
      },
      {
        Trader: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        Contact_information: <Contact method="Line" description="@DingDing" />,
        Rate: <Rate score={3} />,
        followers: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <FavoriteIcon fontSize="inherit" sx={(theme) => ({ color: "primary.main"})}/>
            10000
          </MDTypography>
        ),
        location: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Front gate
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="error" fontWeight="medium">
            <Icon>delete</Icon>
            delete
          </MDTypography>
        ),
      },
      {
        Trader: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        Contact_information: <Contact method="Line" description="@DingDing" />,
        Rate: <Rate score={3} />,
        followers: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <FavoriteIcon fontSize="inherit" sx={(theme) => ({ color: "primary.main"})}/>
            10000
          </MDTypography>
        ),
        location: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Front gate
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="error" fontWeight="medium">
            <Icon>delete</Icon>
            delete
          </MDTypography>
        ),
      },
      {
        Trader: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        Contact_information: <Contact method="Line" description="@DingDing" />,
        Rate: <Rate score={3} />,
        followers: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <FavoriteIcon fontSize="inherit" sx={(theme) => ({ color: "primary.main"})}/>
            10000
          </MDTypography>
        ),
        location: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Front gate
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="error" fontWeight="medium">
            <Icon>delete</Icon>
            delete
          </MDTypography>
        ),
      },
    ],
  };
}
