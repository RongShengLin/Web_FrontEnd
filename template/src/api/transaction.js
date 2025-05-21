import { useState, useEffect } from "react";

export function getTransactionList() {
  const [transactionListData, setTransactionListData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/transactions");
        const data = await response.json();
        setTransactionListData(data);
      } catch (error) {
        console.error("Error fetching transaction list:", error);
      }
    };
    fetchData();
  }, []);
  return transactionListData;
}

export function getTransaction() {
  const [transactionData, setTransactionData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/transactions");
        const data = await response.json();
        setTransactionData(data);
      } catch (error) {
        console.error("Error fetching transaction list:", error);
      }
    };
    fetchData();

    
  }, []);
  return transactionData;
}