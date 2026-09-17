import { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = 1; // testing ke liye

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/cart/${userId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch cart");
        }

        setCart(data.cart);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) {
    return <h2>Loading cart...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!cart || cart.items.length === 0) {
    return <h2>Your cart is empty</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Cart</h1>

      {cart.items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            gap: "20px",
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <img
            src={item.product.image}
            alt={item.product.name}
            width="150"
            height="150"
            style={{ objectFit: "cover" }}
          />

          <div>
            <h2>{item.product.name}</h2>

            <p>Price: ₹{item.product.price}</p>

            <p>Size: {item.size}</p>

            <p>Quantity: {item.quantity}</p>

            <p>
              Subtotal: ₹
              {Number(item.product.price) * item.quantity}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;