import { BASE_URL } from "./setting";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import data from "layouts/tables/data/ProductTableData";


const API_PREFIX = "/api/auctions";

function ProductList({ spacing = 3, xs = 12, md = 6, xl = 3, keyword, filters }) {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);

  const buildSearchURL = () => {
    const url = new URL(`${BASE_URL}/api/auctions/`);
    if (keyword) url.searchParams.append("product_name", keyword);
    if (filters?.price?.length === 2) {
      url.searchParams.append("min_price", filters.price[0]);
      url.searchParams.append("max_price", filters.price[1]);
    }
    if (filters?.categories?.length > 0) {
      filters.categories.forEach((cat) => url.searchParams.append("product_type", cat));
    }
    return url.toString();
  };

  const fetchProducts = async () => {
    try {
      const searchURL = buildSearchURL();
      const res = await fetch(searchURL);
      if (!res.ok) throw new Error("找不到商品");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("撈資料失敗", err);
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/favorites/list/`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("無法取得收藏清單");
      const data = await res.json(); // 假設是 array of product_id
      setFavoriteIds(data);
    } catch (err) {
      console.error("載入收藏失敗", err);
    }
  };

  const toggleFavorite = async (productId) => {
    const isFav = favoriteIds.includes(productId);
    const action = isFav ? "remove" : "add";

    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("action", action);

    try {
      await fetch(`${BASE_URL}/api/favorites/`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      setFavoriteIds((prev) =>
        isFav ? prev.filter((id) => id !== productId) : [...prev, productId]
      );
    } catch (err) {
      console.error("切換收藏失敗", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchFavorites();

    const interval = setInterval(() => {
      if (!editing) fetchProducts();
    }, 60000);

    return () => clearInterval(interval);
  }, [filters, keyword]);

  return (
    <Grid container spacing={spacing}>
      {products.map((product) => (
        <Grid item xs={xs} md={md} xl={xl} key={product.product_id}>
          <DefaultProjectCard
            image={product.product_image ? `${BASE_URL}${product.product_image}` : ""}
            label={Array.isArray(product.product_type) ? product.product_type.join(", ") : product.product_type}
            title={product.product_name}
            description={product.position}
            price={`$${product.price}`}
            isFavorite={favoriteIds.includes(product.product_id)}
            onToggleFavorite={() => toggleFavorite(product.product_id)}
            action={{
              type: "internal",
              route: `/item/${product.product_id}`,
              color: "primary",
              label: "查看商品",
              iconOnly: false,
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
}



ProductList.propTypes = {
    spacing: PropTypes.number,
    xs: PropTypes.number,
    md: PropTypes.number,
    xl: PropTypes.number,
    keyword: PropTypes.string,         
    filters: PropTypes.shape({
        price: PropTypes.arrayOf(PropTypes.number),
        categories: PropTypes.arrayOf(PropTypes.string),
    }),
};

export default ProductList;
