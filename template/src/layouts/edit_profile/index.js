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
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import HomePageLayout from "examples/LayoutContainers/HomePageLayout";
import HomePageNavbar from "examples/Navbars/HomePageNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/EditProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

import { useEffect, useState } from "react";
import { TextField, Button, Avatar } from "@mui/material";
import { BASE_URL } from "api/setting";
import { useNavigate } from "react-router-dom";

function Overview() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    student_id: "",
    phone_number: "",
    trading_location: "",
    head_image: "",
  });
  const [uploadFile, setUploadFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const name = sessionStorage.getItem("username") || localStorage.getItem("username");
    if (!name) {
      navigate("/authentication/sign-in");
      return;
    }
    fetch(`${BASE_URL}/api/user/`, {
      method: "GET",
      credentials: "include", 
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error("Fetch error:", err));
      }, [navigate]);
  return (
    <HomePageLayout>
      <HomePageNavbar />
      <MDBox mb={2} />
      <Header headImage={profile.head_image}>
        <MDBox mt={5} mb={3}>
          <ProfileInfoCard
            name={profile.name}
            info={{
              studentID: profile.student_id,
              mobile: profile.phone_number,
              email: profile.email,
              tradingLocation: profile.trading_location,
              head_image: profile.head_image,
            }}
            action={{
              label: "Save",
              route: "#", // 不是真的 route，而是手動觸發
            }}
            shadow={false}
          />
        </MDBox>
      </Header>
      <Footer />
    </HomePageLayout>
  );
}

export default Overview;
