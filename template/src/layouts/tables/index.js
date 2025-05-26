/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim

Coded by www.creative-tim.com
=========================================================
*/

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Layout components
import HomePageLayout from "examples/LayoutContainers/HomePageLayout";
import HomePageNavbar from "examples/Navbars/HomePageNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";


// Data
import authorsTableData from "layouts/tables/data/traderTableData";

// API
import { BASE_URL } from "api/setting";

const API_URL = `${BASE_URL}/api/auctions/`;

function Tables() {
  const navigate = useNavigate();

  const { columns, rows } = authorsTableData();
  const [pColumns] = useState([
    { Header: "Product", accessor: "product", align: "left" },
    { Header: "name", accessor: "product_name", align: "left" },
    { Header: "Price", accessor: "price", align: "center" },
    { Header: "Position", accessor: "trading_location", align: "center" },
    { Header: "Type", accessor: "product_type", align: "center" },
    { Header: "Trader", accessor: "owner_email", align: "center" },
    { Header: "Unfavorite", accessor: "remove", align: "center" },
  ]);
  
  const [pRows, setPRows] = useState([]);

  const handleRemoveFavorite = async (productId) => {
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("action", "remove");

    try {
      await fetch(`${BASE_URL}/api/favorites/`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      setPRows((prev) => prev.filter((row) => row.product_id !== productId));
    } catch (err) {
      console.error("取消收藏失敗", err);
    }
  };

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/favorites/items/`, {
          credentials: "include",
        });
        const data = await res.json();
        const formatted = data.map((item) => ({
          ...item,
          product: (
            <MDBox
              display="flex"
              alignItems="center"
              gap={2}
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/item/${item.product_id}`)}
            >
              <img
                src={`${BASE_URL}${item.product_image}` || "https://via.placeholder.com/50"}
                alt={item.product_name}
                style={{ width: "150px", height: "150px", borderRadius: "12px", objectFit: "cover" }}
              />
            </MDBox>
          ),
          product_name: (
            <MDTypography
              variant="h6"
              fontWeight="medium"
              color="info"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/item/${item.product_id}`)}
            >
              {item.product_name}
            </MDTypography>
          ),
          price: (
            <MDTypography variant="h6" fontWeight="medium" color="error">
              ${item.price}
            </MDTypography>
          ),
          owner_email: (
            <MDBox display="flex" alignItems="center" gap={1}>
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.owner_email}`}
                alt="avatar"
                style={{ width: 32, height: 32, borderRadius: "50%" }}
              />
              <MDBox display="flex" flexDirection="column">
                <MDTypography variant="button" fontWeight="medium" color="text">
                  {item.owner_email.split("@")[0]}
                </MDTypography>
                <MDTypography variant="caption" color="text">
                  {item.owner_email}
                </MDTypography>
              </MDBox>
            </MDBox>
          ),
          remove: (
            <IconButton onClick={() => handleRemoveFavorite(item.product_id)}>
              <FavoriteIcon sx={{ color: "error.main" }} />
            </IconButton>
          ),
        }));
        setPRows(formatted);
      } catch (err) {
        console.error("載入收藏商品失敗", err);
      }
    };

    fetchFavoriteProducts();
  }, [navigate]);


  return (
    <HomePageLayout>
      <HomePageNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          {/* Trader List */}
          {/* <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="primary"
                borderRadius="lg"
                coloredShadow="primary"
              >
                <MDTypography variant="h6" color="white">
                  Following Trader
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
              <Grid container spacing={3} justifyContent="center">
                <Grid item>
                  <MDBox mb={1} mt={1}>
                    <Pagination count={10} showFirstButton showLastButton />
                  </MDBox>
                </Grid>
              </Grid>
            </Card>
          </Grid> */}

          {/* Product List */}
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="primary"
                borderRadius="lg"
                coloredShadow="primary"
              >
                <MDTypography variant="h6" color="white">
                  Following Product
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
              {/* <Grid container spacing={3} justifyContent="center">
                <Grid item>
                  <MDBox mb={1} mt={1}>
                    <Pagination count={10} showFirstButton showLastButton />
                  </MDBox>
                </Grid>
              </Grid> */}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </HomePageLayout>
  );
}

export default Tables;


// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import Pagination from '@mui/material/Pagination';
// import PaginationItem from "@mui/material/PaginationItem";
// import PropTypes from "prop-types";


// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// // Material Dashboard 2 React example components
// import HomePageLayout from "examples/LayoutContainers/HomePageLayout";
// import HomePageNavbar from "examples/Navbars/HomePageNavbar";
// import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";

// // Data
// import authorsTableData from "layouts/tables/data/traderTableData";
// import projectsTableData from "layouts/tables/data/ProductTableData";

// function Tables() {
//   const { columns, rows } = authorsTableData();
//   const { columns: pColumns, rows: pRows } = projectsTableData();
//   return (
//     <HomePageLayout>
//       <HomePageNavbar />
//       <MDBox pt={6} pb={3}>
//         <Grid container spacing={6}>
//           <Grid item xs={12}>
//             <Card>
//               <MDBox
//                 mx={2}
//                 mt={-3}
//                 py={3}
//                 px={2}
//                 variant="gradient"
//                 bgColor="primary"
//                 borderRadius="lg"
//                 coloredShadow="primary"
//               >
//                 <MDTypography variant="h6" color="white">
//                   Following Trader
//                 </MDTypography>
//               </MDBox>
//               <MDBox pt={3}>
//                 <DataTable
//                   table={{ columns, rows }}
//                   isSorted={false}
//                   entriesPerPage={false}
//                   showTotalEntries={false}
//                   noEndBorder
//                 />
//               </MDBox>
//               <Grid container spacing={3} justifyContent="center">
//                 <Grid item>
//                   <MDBox mb={1} mt={1}>
//                     <Pagination count={10} sx={(theme) => ({
//                       '& .MuiPaginationItem-root': {
//                         color: theme.palette.text.main,
//                       },
//                       '& .Mui-selected': {
//                         backgroundColor: theme.palette.primary.main,
//                         color: theme.palette.text.main,
//                       },
//                     })}  showFirstButton showLastButton />
//                   </MDBox>
//                 </Grid>
//               </Grid>
//             </Card>
//           </Grid>
//           <Grid item xs={12}>
//             <Card>
//               <MDBox
//                 mx={2}
//                 mt={-3}
//                 py={3}
//                 px={2}
//                 variant="gradient"
//                 bgColor="primary"
//                 borderRadius="lg"
//                 coloredShadow="primary"
//               >
//                 <MDTypography variant="h6" color="white">
//                   Following Product
//                 </MDTypography>
//               </MDBox>
//               <MDBox pt={3}>
//                 <DataTable
//                   table={{ columns: pColumns, rows: pRows }}
//                   isSorted={false}
//                   entriesPerPage={false}
//                   showTotalEntries={false}
//                   noEndBorder
//                 />
//               </MDBox>
//               <Grid container spacing={3} justifyContent="center">
//                 <Grid item>
//                   <MDBox mb={1} mt={1}>
//                     <Pagination count={10} sx={(theme) => ({
//                       '& .MuiPaginationItem-root': {
//                         color: theme.palette.text.main,
//                       },
//                       '& .Mui-selected': {
//                         backgroundColor: theme.palette.primary.main,
//                         color: theme.palette.text.main,
//                       },
//                     })}  showFirstButton showLastButton />
//                   </MDBox>
//                 </Grid>
//               </Grid>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
//       <Footer />
//     </HomePageLayout>
//   );
// }
// export default Tables;
