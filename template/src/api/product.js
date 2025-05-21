import profilesListData from "layouts/profile/data/profilesListData";
import { useState, useEffect } from "react";
import { BASE_URL } from "./setting";
const API_PREFIX = "/api/auctions";


export function getProduct() {
    constant [productData, setProductData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/products");
                const data = await response.json();
                setProductData(data);
            } catch (error) {
                console.error("Error fetching product list:", error);
            }
        };
        fetchData();
    }, []);
    return productData;
}   

export function getProductList() {
    const [productListData, setProductListData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/products");
                const data = await response.json();
                setProductListData(data);
            } catch (error) {
                console.error("Error fetching product list:", error);
            }
        };
        fetchData();
    }, []);
    return productListData;
}


/**
 * 撈取單一商品資料
 * @param {number|string} id - 商品 ID
 */
export async function fetchProduct(id) {
  const url = `${BASE_URL}${API_PREFIX}/${id}/`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("找不到商品");
    const data = await res.json();
    console.log("商品資料：", data);
    return data;
  } catch (err) {
    console.error("錯誤：", err);
  }
}

/**
 * 更新商品資料
 * @param {number|string} id - 商品 ID
 * @param {Object} updatedData - 要更新的資料
 */
export async function updateProduct(id, updatedData) {
  const url = `${BASE_URL}${API_PREFIX}/${id}/`;
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) throw new Error("更新失敗");
    const data = await res.json();
    console.log("更新成功：", data);
    return data;
  } catch (err) {
    console.error("錯誤：", err);
  }
}

/**
 * 刪除商品
 * @param {number|string} id - 商品 ID
 */
export async function deleteProduct(id) {
  const url = `${BASE_URL}${API_PREFIX}/${id}/`;
  try {
    const res = await fetch(url, {
      method: "DELETE",
    });
    if (res.status === 204) {
      console.log(`已成功刪除商品 ID: ${id}`);
    } else {
      throw new Error("刪除失敗");
    }
  } catch (err) {
    console.error("錯誤：", err);
  }
}

