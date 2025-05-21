import { BASE_URL } from "./setting";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import { Grid } from "@mui/material";

const API_PREFIX = "/api/auctions";

function ProductDetail({ productId }) {
  const [product, setProduct] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    product_name: "",
    price: "",
    position: "",
    product_type: "",
    picture_url: "",
    owner_email: "",
  });

  // 撈資料的函式
  const fetchProduct = async () => {
    try {
      const res = await fetch(`${BASE_URL}${API_PREFIX}/${productId}/`);
      if (!res.ok) throw new Error("找不到商品");
      const data = await res.json();
      setProduct(data);
      setFormData(data);
    } catch (err) {
      console.error("撈資料失敗", err);
    }
  };

  // 撈資料 + 啟動 polling（每 5 秒撈一次）
  useEffect(() => {
    fetchProduct(); // 初次撈

    const interval = setInterval(() => {
      if (!editing) fetchProduct(); // 編輯中就不自動撈，避免干擾
    }, 5000);

    return () => clearInterval(interval); // 卸載時清掉定時器
  }, [productId, editing]);

  const updateProduct = async () => {
    try {
      const res = await fetch(`${BASE_URL}${API_PREFIX}/${productId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("更新失敗");
      const updated = await res.json();
      setProduct(updated);
      setEditing(false);
      alert("更新成功！");
    } catch (err) {
      console.error("更新錯誤", err);
    }
  };

  const deleteProduct = async () => {
    if (!window.confirm("確定要刪除這個商品嗎？")) return;
    try {
      const res = await fetch(`${BASE_URL}${API_PREFIX}/${productId}/`, {
        method: "DELETE",
      });
      if (res.status === 204) {
        alert("商品已刪除");
        setProduct(null);
      } else {
        throw new Error("刪除失敗");
      }
    } catch (err) {
      console.error("刪除錯誤", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!product) return <p>載入中...</p>;

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} md={6} lg={4} key={product.product_id}>
          <DefaultProjectCard
            image={product.picture_url}
            label={product.product_type}
            title={product.product_name}
            description={product.position}
            action={{
              type: "internal",
              route: `/product/${product.product_id}`, // 跳轉到單一商品頁
              color: "primary",
              label: "查看商品",
            }}
            price={`$${product.price}`}
          />
        </Grid>
      ))}
    </Grid>
  );

//   return (
//     <div style={{ maxWidth: "500px", margin: "auto" }}>
//       <h2>商品詳細資料</h2>

//       {editing ? (
//         <>
//           <input name="product_name" value={formData.product_name} onChange={handleChange} placeholder="商品名稱" /><br />
//           <input name="price" value={formData.price} onChange={handleChange} placeholder="價格" /><br />
//           <input name="position" value={formData.position} onChange={handleChange} placeholder="地點" /><br />
//           <input name="product_type" value={formData.product_type} onChange={handleChange} placeholder="分類" /><br />
//           <input name="picture_url" value={formData.picture_url} onChange={handleChange} placeholder="圖片連結" /><br />
//           <input name="owner_email" value={formData.owner_email} onChange={handleChange} placeholder="Email" /><br />

//           <button onClick={updateProduct}>💾 儲存</button>
//           <button onClick={() => setEditing(false)}>❌ 取消</button>
//         </>
//       ) : (
//         <>
//           <p><strong>名稱：</strong>{product.product_name}</p>
//           <p><strong>價格：</strong>{product.price}</p>
//           <p><strong>位置：</strong>{product.position}</p>
//           <p><strong>分類：</strong>{product.product_type}</p>
//           <p><strong>Email：</strong>{product.owner_email}</p>
//           <img src={product.picture_url} alt="商品圖" width="200" />
//           <br /><br />
//           <button onClick={() => setEditing(true)}>✏️ 編輯</button>
//           <button onClick={deleteProduct} style={{ color: "red" }}>🗑 刪除</button>
//         </>
//       )}
//     </div>
//   );
}

ProductDetail.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default ProductDetail;
