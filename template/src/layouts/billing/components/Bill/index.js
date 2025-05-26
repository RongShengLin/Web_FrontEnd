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
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "api/setting";

function Bill({ image, name, price, number_items, noGutter, product_id, onDelete}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("確定要刪除這個商品嗎？")) return;
    try {
      const res = await fetch(`${BASE_URL}/api/auctions/delete/${product_id}`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        alert("商品已刪除");
        if (onDelete) onDelete(product_id); 
      } else {
        const msg = await res.text();
        alert("刪除失敗：" + msg);
      }
    } catch (err) {
      console.error("刪除商品失敗", err);
    }
  };

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
                  <MDButton variant="text" color="error" onClick={handleDelete}>
                    <Icon>delete</Icon>&nbsp;delete
                  </MDButton>
                </MDBox>
                <MDButton variant="text" color={darkMode ? "white" : "dark"} onClick={() => navigate(`/item_edit/${product_id}`)}>
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
  product_id: PropTypes.number.isRequired,
  onDelete: PropTypes.func,
};

export default Bill;
