export default function QueueTradingData({ transactions, currentUsername }) {
  const rows = transactions
    .filter((t) => t.transactionrecord_stat === "Trading")
    .map((t) => ({
      name: t.product_name,
      seller: t.seller,
      buyer: t.buyer,
      price: `$${t.price}`,
      time: new Date(t.trading_time).toLocaleString(),
      status: t.transactionrecord_stat,
    }));

  const columns = [
    { Header: "Product", accessor: "name" },
    { Header: "Seller", accessor: "seller" },
    { Header: "Buyer", accessor: "buyer" },
    { Header: "Price", accessor: "price" },
    { Header: "Time", accessor: "time" },
    { Header: "Status", accessor: "status" },
  ];

  return { columns, rows };
}
