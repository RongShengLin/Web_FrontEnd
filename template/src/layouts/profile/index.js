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
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Avatar } from "@mui/material";
import { BASE_URL } from "api/setting";
import MDAvatar from "components/MDAvatar";


function Overview() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    student_id: "",
    phone_number: "",
    trading_location: "",
    head_image: "",
  });
  const [products, setProducts] = useState([]);

  // const navigate = useNavigate();
  const handleDeleteRefresh = (deletedId) => {
    setProducts((prev) => prev.filter((item) => item.product_id !== deletedId));
  };

  const loadProducts = async () => {
    const username = sessionStorage.getItem("username") || localStorage.getItem("username");
    if (!username) return;

    try {
      const res = await fetch(`${BASE_URL}/api/auctions/?username=${username}`, {
        credentials: "include",
      });
      if (res.ok) {
        const productList = await res.json();
        // console.log("Fetched products:", productList);
        const formatted = productList.map((p) => ({
          product_id: p.product_id,
          image: `${BASE_URL}${p.product_image}`,
          name: p.product_name,
          price: `$${p.price}`,
          num_item: p.total_number || 0,
        }));
        setProducts(formatted);
      } else {
        console.error("無法取得商品資料");
      }
    } catch (err) {
      console.error("fetch product error:", err);
    }
  };

  const loadProfile = async () => {
    const name = sessionStorage.getItem("username") || localStorage.getItem("username");
    // console.log("loadProfile", name);
    if (name) {
      fetch(`${BASE_URL}/api/user/`, {
        method: "GET",
        credentials: "include", 
      })
        .then((res) => res.json())
        .then((data) => setProfile(data))
        .catch((err) => console.error("Fetch error:", err));
    }
    // console.log("Profile data:", profile.head_image);
  };

  useEffect(() => {
    loadProfile();
    loadProducts();
  }, []);

  return (
    <HomePageLayout>
      <HomePageNavbar />
      <MDBox mb={2} />
      <Header headImage={`${BASE_URL}${profile.head_image}`}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            {/* <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid> */}
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <ProfileInfoCard
                title="Profile Information"
                description="A NTU student who loves LOL and B4B."
                info={{
                  studentID: profile.student_id,
                  mobile: profile.phone_number,
                  email: profile.email,
                  tradingLocation: profile.first_position,
                }}
                action={{ route: "/edit_profile", tooltip: "Edit Profile"}}
                shadow={false}
              />
              <Divider orientation="vertical" display="inline-box" sx={{ mx: 2 }} />
            </Grid>
            <Grid item xs={12} xl={8}>
              <ProfilesList title="My Products" profiles={products} shadow={false} onDelete={handleDeleteRefresh}/>
            </Grid>
            <MDBox mt={2}>
              <MDTypography variant="h6">頭像預覽：</MDTypography>
              <MDAvatar src={`${BASE_URL}${profile.head_image}`} alt="head" sx={{ width: 100, height: 100 }} />
            </MDBox>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </HomePageLayout>
  );
}

export default Overview;
