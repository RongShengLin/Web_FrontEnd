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
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Pagination from '@mui/material/Pagination';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Icon from "@mui/material/Icon";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";

// Material Dashboard 2 React example components
import HomePageLayout from "examples/LayoutContainers/HomePageLayout";
import HomePageNavbar from "examples/Navbars/HomePageNavbar";
import BasicSelect from "examples/Select";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import BannerCarousel from "examples/BannerCarousel"
import TransactionTimeList from "examples/Time_select"

// Data
import reportsBarChartData from "layouts/HomePage/data/reportsBarChartData";
import reportsLineChartData from "layouts/HomePage/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/HomePage/components/Projects";
import OrdersOverview from "layouts/HomePage/components/OrdersOverview";

import homeDecor1 from "assets/images/home-decor-1.jpg";
import { dark } from "@mui/material/styles/createPalette";
import { maxHeight, minHeight } from "@mui/system";
import theme from "assets/theme";
import MDInput from "components/MDInput";
import { useParams } from "react-router-dom";
import { number } from "prop-types";
import { BASE_URL } from "api/setting";
import { useNavigate } from "react-router-dom";

function Item_Edit() {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        number: 1,
        trading_location: "",
        product_type: "",
    });
    const { id } = useParams(); 
    const categoryGroups = {
        "3C": ["Phone", "Laptop", "Screen"],
        "Tool": ["Hammer", "Screwdriver"],
        "Accessories": ["Bag", "Ring", "Necklace"],
        "Others": ["Camera", "TV"],
    };
    const [tradingTimes, setTradingTimes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [uploadImage, setUploadImage] = useState(null);
    const navigate = useNavigate();
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const { sales, tasks } = reportsLineChartData;
    const textColor = darkMode ? "#ffffff" : "#000000";

    // console.log(darkMode);
    // console.log(textColor);

    useEffect(() => {
        if (id) {
            fetch(`${BASE_URL}/api/auctions/${id}/`, {
                method: "GET",
                credentials: "include",
            })
            .then((res) => res.json())
            .then((data) => {
                setProduct({
                    name: data.product_name,
                    price: data.price,
                    description: data.product_description || "",
                    number: data.total_number || -1,
                    trading_location: data.trading_location || "",
                    product_type: data.product_type,
                    product_image: data.product_image || "",
                });
                setTradingTimes((data.available_times || []).map(t =>
                    new Date(t).toISOString().slice(0, 16) // ISO to datetime-local input 格式
                ));
            });
        }
        }, [id]);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("product_name", product.name);
        formData.append("price", product.price);
        formData.append("trading_location", product.trading_location);
        formData.append("product_type", JSON.stringify(categories));
        formData.append("total_number", product.number);
        formData.append("product_description", product.description);
        // formData.append("owner_email", sessionStorage.getItem("email"));
        formData.append("available_times", JSON.stringify(tradingTimes));
        if (uploadImage) formData.append("product_image", uploadImage);

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        const method = id ? "POST" : "POST";
        const url = id
            ? `${BASE_URL}/api/auctions/${id}/`
            : `${BASE_URL}/api/auctions/`;

        for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
            console.log(`${key}: [File] ${value.name}, size: ${value.size}`);
        } else {
            console.log(`${key}:`, value);
        }
        }
        try {
            const res = await fetch(url, {
                method,
                credentials: "include",
                body: formData,
            });

            const data = await res.json(); // ← 讀取回傳資料

            if (res.ok) {
                alert(id ? `商品已更新：${data.message || "成功"}` : `商品已新增：${data.message || "成功"}`);
                console.log("成功回傳內容:", data);
                navigate(`/profile`);
            } else {
                alert(`操作失敗：${data.message || data.error || "未知錯誤"}`);
                console.error("錯誤內容:", data);
            }
        } catch (err) {
            alert("伺服器連線錯誤");
            console.error("發生例外錯誤:", err);
        }

    };


    const handleCategoryChange = (event) => {
        const { name, checked } = event.target;
            setCategories((prev) =>
                checked ? [...prev, name] : prev.filter((item) => item !== name)
        );
    };

  return (
    <HomePageLayout>
      <HomePageNavbar />
      <MDBox mt={6} mb={3}>
        <Card>
            <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                    <MDBox mt={3} mb={3} ml={3}>
                        <CardMedia
                            src={product.product_image ? `${BASE_URL}${product.product_image}` : homeDecor1}
                            component="img"
                            title="item_image"
                            sx={{
                                maxWidth: "100%",
                                width: "100%",
                                height: "60vh",
                                margin: 0,
                                boxShadow: ({ boxShadows: { md } }) => md,
                                objectFit: "cover",
                                objectPosition: "center",
                            }}
                        />
                    </MDBox>
                    <MDBox display="flex" alignItems="center" gap={1} mb={2} ml={2}>
                        <MDTypography variant="h4" fontWeight="bold" textTransform="capitalize">
                            Upload Image:
                        </MDTypography>
                        <MDInput
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setUploadImage(file);
                                }
                            }}
                        />
                    </MDBox>
                </Grid>
                <Grid item xs={12} md={7}>
                    <MDBox mt={3} mb={3} ml={3}>
                        <MDBox display="flex" alignItems="center" gap={1} mb={2}>
                            <MDTypography variant="h4" fontWeight="bold" textTransform="capitalize">
                                Product Name:
                            </MDTypography>
                             <MDInput
                                name="name"
                                value={product.name}
                                onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
                                placeholder="Product Name"
                            />
                        </MDBox>
                        <MDBox display="flex" alignItems="center" gap={1} mb={2}>
                            <MDTypography variant="h4" fontWeight="bold" sx={{ color: "red" }}>
                                Price:
                            </MDTypography>
                            <MDInput
                                name="price"
                                value={product.price}
                                onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
                                placeholder="Price"
                            />
                        </MDBox>
                        <MDBox display="flex" alignItems="center" gap={1} mb={2}>
                            <MDTypography variant="h4" fontWeight="medium">
                                description:
                            </MDTypography>
                        </MDBox>
                        <MDBox mr={1} mb={2}>
                            <MDInput
                                multiline
                                name="description"
                                value={product.description}
                                onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
                                rows={4}
                                placeholder="Description"
                                fullWidth
                            />
                        </MDBox>
                        {/* <MDBox display="flex" alignItems="center" gap={1} mb={2}>
                            <MDTypography variant="h4" fontWeight="bold" textTransform="capitalize">
                                Number:
                            </MDTypography>
                            <MDInput
                                name="number"
                                value={product.number}
                                onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
                                placeholder="Number"
                            />
                        </MDBox> */}
                        <MDBox mt={2} mb={2} mr={4} sx={{
                            maxHeight: "100px",
                            minHeight: "75px",
                        }}>
                            <List>
                                <ListItem sx={{
                                    gap: 2,
                                    mb: 1,
                                }}>
                                    <ListItemIcon>
                                        <LoyaltyIcon color="primary"></LoyaltyIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Number:" sx={{
                                        '& .MuiTypography-root': {
                                            color: darkMode? "#ffffff" : "#000000",
                                        },
                                        flex: "0 0 auto"
                                    }}/>
                                    <MDInput
                                        name="number"
                                        value={product.number}
                                        onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
                                        placeholder="Number"
                                    />
                                </ListItem>
                                 <ListItem sx={{
                                    gap: 2,
                                }}>
                                    <ListItemIcon>
                                        <LoyaltyIcon color="primary"></LoyaltyIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Trading Location:" sx={{
                                        '& .MuiTypography-root': {
                                            color: darkMode? "#ffffff" : "#000000",
                                        },
                                        flex: "0 0 auto"
                                    }}/>
                                    <MDInput
                                        name="trading_location"
                                        value={product.trading_location}
                                        onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
                                        placeholder="Place"
                                    />
                                </ListItem>
                            </List>
                        </MDBox>
                        <MDBox display="flex" alignItems="center" gap={1} mb={1}>
                            <MDTypography variant="h4" fontWeight="bold" textTransform="capitalize">
                                Trading Times
                            </MDTypography>
                        </MDBox>
                        <MDBox display="flex" alignItems="center" gap={1} mb={2}>
                            <TransactionTimeList value={tradingTimes} onChange={setTradingTimes} />
                        </MDBox>
                        <MDBox display="flex" alignItems="center" gap={1} mb={2}>
                            <MDTypography variant="h4" fontWeight="bold" textTransform="capitalize">
                                Tags
                            </MDTypography>
                        </MDBox>
                        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0} mr={2}>
                            {Object.entries(categoryGroups).map(([groupName, items]) => (
                            <Accordion key={groupName} sx={{ background: "transparent", boxShadow: "none" }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <MDTypography sx={{ fontWeight: "bold", color:"text" }}>
                                    {groupName}
                                </MDTypography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <FormGroup>
                                    {items.map((item) => (
                                    <FormControlLabel
                                        key={item}
                                        control={
                                        <Checkbox
                                            name={item}
                                            checked={categories.includes(item)}
                                            onChange={handleCategoryChange}
                                        />
                                        }
                                        label={item}
                                        sx={{ color: darkMode ? "#fff" : "#000" }}
                                    />
                                    ))}
                                </FormGroup>
                                </AccordionDetails>
                            </Accordion>
                            ))}
                        </MDBox>
                        <MDBox
                            height="100px"
                            position="relative"
                        >
                            <MDBox position="absolute" bottom={0} right={0} p={2}>
                                <MDBox display="flex" gap={2}>
                                    <MDButton color="success" onClick={handleSubmit}>
                                        {id ? "Update" : "Create"}
                                    </MDButton>
                                    <MDButton color="error">Cancel</MDButton>
                                </MDBox>
                            </MDBox>
                        </MDBox>
                    </MDBox>
                </Grid>
            </Grid>
        </Card>
      </MDBox>
      <Footer />
    </HomePageLayout>
  );
}

export default Item_Edit;