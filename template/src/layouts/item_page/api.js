import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Icon from "@mui/material/Icon";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";

// Layout components
import HomePageLayout from "examples/LayoutContainers/HomePageLayout";
import HomePageNavbar from "examples/Navbars/HomePageNavbar";
import Footer from "examples/Footer";
import BasicSelect from "examples/Select";
import TimeManager from "./component/Time_selector/index.js";

import { BASE_URL } from "api/setting";
const API_PREFIX = "/api/auctions/";

function Item_Page_ID() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [controller] = useMaterialUIController();
  const [error, setError] = useState(null);
  const { darkMode } = controller;

  const [product, setProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const toggleFavorite = async () => {
    const action = isFavorite ? "remove" : "add";
    const formData = new FormData();
    formData.append("product_id", id);
    formData.append("action", action);

    try {
      await fetch(`${BASE_URL}/api/favorites/`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      setIsFavorite(!isFavorite);  // 切換狀態
    } catch (err) {
      console.error("收藏操作失敗", err);
    }
  };
  const handleBuyNow = async () => {
    if (!selectedTime) {
      alert("請選擇交易時間！");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("product_id", id); 
      formData.append("number", quantity); 
      formData.append("trading_time", selectedTime);   
      const res = await fetch(`${BASE_URL}/api/auctions/${id}/transact/`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (res.ok) {
        alert("交易請求已送出！");
      } else {
        const msg = await res.text();
        alert("交易失敗：" + msg);
      }
    } catch (err) {
      console.error("Buy Now 錯誤", err);
    }
  };


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${BASE_URL}${API_PREFIX}${id}/`);
        if (!response.ok) {
          setError(response.status === 404 ? "商品不存在" : "發生錯誤，請稍後再試");
          return;
        }

        const data = await response.json();
        setProduct(data);
        console.log("商品資料:", data.total_number);
        setError(null);
      } catch (error) {
        console.error("API 請求失敗", error);
        setError("無法連接伺服器");
      }
    };

    const checkFavorite = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/favorites/list/`, {
          credentials: "include",
        });
        if (res.ok) {
          const list = await res.json();
          setIsFavorite(list.includes(parseInt(id)));
        }
      } catch (err) {
        console.error("收藏查詢失敗", err);
      }
    };

    fetchProduct();
    checkFavorite();
  }, [id]);



  const textColor = darkMode ? "#ffffff" : "#000000";

  return (
    <HomePageLayout>
      <HomePageNavbar />
      <MDBox mt={6} mb={3}>
        <Card>
          {error ? (
            <MDBox p={5} textAlign="center">
              <MDTypography variant="h4" color="error">
                {error}
              </MDTypography>
            </MDBox>
           ) : product ? (
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <MDBox mt={3} mb={3} ml={3}>
                  <CardMedia
                    component="img"
                    src={`${BASE_URL}${product.product_image}` || "https://via.placeholder.com/400"}
                    title={product.product_name}
                    sx={{
                      maxWidth: "100%",
                      width: "100%",
                      height: "60vh",
                      objectFit: "cover",
                      objectPosition: "center",
                      boxShadow: ({ boxShadows: { md } }) => md,
                    }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={7}>
                <MDBox mt={3} mb={3} ml={3}>
                  <MDTypography variant="h2" fontWeight="bold" textTransform="capitalize">
                    {product.product_name}
                  </MDTypography>

                  <MDBox mt={2} ml={2} mr={2}>
                    <Card sx={(theme) => ({
                      boxShadow: "none",
                      padding: 1,
                      backgroundColor: darkMode ? theme.palette.grey[800] : theme.palette.grey[200],
                    })}>
                      <MDTypography variant="h3" fontWeight="bold" sx={{ color: "red" }}>
                        ${product.price}
                      </MDTypography>
                    </Card>
                  </MDBox>

                  <MDBox mt={2} mb={2} mr={4} sx={{ maxHeight: "100px", minHeight: "75px" }}>
                    <MDTypography variant="h4" fontWeight="medium">
                      Trading Location: {product.trading_location || "N/A"}
                    </MDTypography>
                  </MDBox>

                  <MDBox mt={2} mb={2} mr={2}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={2}>
                        <BasicSelect maxNumber={product?.total_number || 3} onChange={setQuantity} />
                      </Grid>
                      <Grid item md={2} sx={{ display: { xs: "none", md: "block" } }} />
                      <Grid item xs={12} md={2}>
                        <MDButton
                          sx={(theme) => ({
                            backgroundColor: darkMode ? theme.palette.grey[800] : theme.palette.grey[200],
                          })}
                          onClick={toggleFavorite}
                        >
                          {isFavorite ? (
                            <FavoriteIcon sx={{ color: "error.main" }} />
                          ) : (
                            <FavoriteBorderIcon sx={{ color: "primary.main" }} />
                          )}
                          <MDTypography variant="h6" fontWeight="medium" color={isFavorite ? "error" : "primary"}>
                            {isFavorite ? "Liked" : "Like"}
                          </MDTypography>
                        </MDButton>
                      </Grid>
                      {/* <Grid item xs={12} md={3}>
                        <MDButton variant="outlined" color="primary">
                          <Icon sx={{ color: "primary.main" }}>shopping_cart</Icon>
                          <MDTypography variant="h6" fontWeight="medium" color="primary">
                            Add to cart
                          </MDTypography>
                        </MDButton>
                      </Grid> */}
                      <Grid item xs={12} md={3}>
                        <MDButton variant="contained" color="primary" onClick={handleBuyNow}>
                          <MDTypography variant="h6" fontWeight="medium" color="white">
                            Buy Now
                          </MDTypography>
                        </MDButton>
                      </Grid>
                    </Grid>
                  </MDBox>

                  <MDBox mt={2} mb={2} mr={4} sx={{ maxHeight: "100px", minHeight: "75px" }}>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <LoyaltyIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Product Type : ${product.product_type || "None"}`}
                          sx={{ "& .MuiTypography-root": { color: textColor } }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <LoyaltyIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Owner Email : ${product.owner_email || "None"}`}
                          sx={{ "& .MuiTypography-root": { color: textColor } }}
                        />
                      </ListItem>
                    </List>
                  </MDBox>
                  <MDBox display="flex" alignItems="center" gap={1} mb={1}>
                      <MDTypography variant="h4" fontWeight="bold" textTransform="capitalize">
                          Trading Times
                      </MDTypography>
                  </MDBox>
                  <MDBox display="flex" alignItems="center" gap={1} mb={1}>
                      <TimeManager
                        value={product?.available_times || []}
                        onChange={(selected) => setSelectedTime(selected)}
                      />
                  </MDBox>
                </MDBox>
              </Grid>
            </Grid>
          ) : (
            <MDBox p={5} textAlign="center">
              <MDTypography variant="h4" color="text">
                Loading product...
              </MDTypography>
            </MDBox>
          )}
        </Card>
      </MDBox>
      <Footer />
    </HomePageLayout>
  );
}

export default Item_Page_ID;
