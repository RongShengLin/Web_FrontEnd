import { BASE_URL } from "./setting";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";


const API_PREFIX = "/api/auctions";

function ProductList({spcaing = 3, xs = 12, md = 6, xl = 3 }) {
    const [products, setProducts] = useState([]);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        product_name: "",
        price: "",
        position: "",
        product_type: "",
        picture_url: "",
        owner_email: "",
    });

    const fetchProducts = async () => {
        try {
            const res = await fetch(`${BASE_URL}${API_PREFIX}/`);
            if (!res.ok) throw new Error("找不到商品");
            const data = await res.json();
            setProducts(data);
            setFormData(data);
        } catch (err) {
            console.error("撈資料失敗", err);
        }
    };

    // 撈商品清單
    useEffect(() => {
        fetchProducts(); // 初次撈 data

        const interval = setInterval(() => {
        if (!editing) fetchProducts(); // 編輯中就不自動撈，避免干擾
        }, 60000); // 60 秒撈一次

        return () => clearInterval(interval); // 卸載時清掉定時器
    }, []);

    return (
    <Grid container spacing={spcaing}>
    {products.map((product) => (
        <Grid item xs={xs} md={md} xl={xl} key={product.product_id}>
        <DefaultProjectCard
            image={product.picture_url}
            label={product.product_type}
            title={product.product_name}
            description={product.position}
            price={`$${product.price}`}
            action={{
            type: "internal",
            route: `/product/${product.product_id}`,
            color: "primary",
            label: "查看商品",
            }}
        />
        </Grid>
    ))}
    </Grid>
    );
}

ProductList.propTypes = {
    spcaing: PropTypes.number,
    xs: PropTypes.number,
    md: PropTypes.number,
    xl: PropTypes.number,
};

export default ProductList;
