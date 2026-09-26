import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = 1;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/orders/${userId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch orders"
          );
        }

        console.log("ORDERS:", data);

        setOrders(data.orders);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <h2>Loading orders...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (orders.length === 0) {
    return <h2>No orders found</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Orders</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "8px",
          }}
        >
          <h2>Order #{order.id}</h2>

          <p>
            Status: <strong>{order.status}</strong>
          </p>

          <p>
            Payment: <strong>{order.paymentStatus}</strong>
          </p>

          <p>
            Total: ₹{order.totalAmount}
          </p>

          <h3>Items</h3>

          {order.items.map((item) => (
            <div
              key={item.id}
              style={{
                borderTop: "1px solid #eee",
                padding: "10px 0",
              }}
            >
              <p>
                <strong>
                  {item.product.name}
                </strong>
              </p>

              <p>Size: {item.size}</p>

              <p>Quantity: {item.quantity}</p>

              <p>Price: ₹{item.price}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Orders;