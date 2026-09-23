import { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = 1;
  const totalPrice = cart.items.reduce(
  (total, item) =>
    total + Number(item.product.price) * item.quantity,
  0
);
  // Quantity update
  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/cart/${itemId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: newQuantity,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update quantity"
        );
      }

      setCart((previousCart) => ({
        ...previousCart,
        items: previousCart.items.map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity: newQuantity,
              }
            : item
        ),
      }));
    } catch (error) {
      console.error("Quantity update error:", error);
    }
  };

  // Remove item
  const removeItem = async (itemId) => {
    console.log("Removing item:", itemId);

    try {
      const response = await fetch(
        `http://localhost:5000/api/cart/${itemId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      console.log("Delete response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to remove item"
        );
      }

      setCart((previousCart) => ({
        ...previousCart,
        items: previousCart.items.filter(
          (item) => item.id !== itemId
        ),
      }));
    } catch (error) {
      console.error("Remove item error:", error);
    }
  };

  // Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/cart/${userId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch cart"
          );
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

            <div>
              <button
                onClick={() =>
                  updateQuantity(
                    item.id,
                    item.quantity - 1
                  )
                }
                disabled={item.quantity === 1}
              >
                −
              </button>

              <span style={{ margin: "0 15px" }}>
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  updateQuantity(
                    item.id,
                    item.quantity + 1
                  )
                }
              >
                +
              </button>
            </div>

            <p>
              Subtotal: ₹
              {Number(item.product.price) *
                item.quantity}
            </p>

            <button
              onClick={() => removeItem(item.id)}
              style={{
                marginTop: "10px",
                padding: "8px 15px",
                backgroundColor: "#333",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
          <div
  style={{
    borderTop: "2px solid #ddd",
    marginTop: "20px",
    paddingTop: "20px",
  }}
>
  <h2>Cart Total: ₹{totalPrice}</h2>

  <button
    style={{
      padding: "12px 25px",
      backgroundColor: "#FD6F00",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
    }}
  >
    Proceed to Checkout
  </button>
</div>
        </div>
      ))}
    </div>
  );
}

export default Cart;