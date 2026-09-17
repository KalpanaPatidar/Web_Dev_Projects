import React,{useState} from "react";
function ProductCard({ product }) {

     const [selectedSize, setSelectedSize] = useState("");
     const handleAddToCart = async () => {
  if (!selectedSize) {
    alert("Please select a size");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 1,
        productId: product.id,
        quantity: 1,
        size: selectedSize,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add product");
    }

    console.log("Cart Response:", data);

    alert("Product added to cart");
  } catch (error) {
    console.error("Cart Error:", error);
    alert(error.message);
  }
};
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "250px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      <h2>{product.name}</h2>

      <p>{product.description}</p>

      <h3>₹{product.price}</h3>

      <p>
        Category: {product.category?.name}
      </p>

     <div>
  <p>Select Size:</p>

  {product.sizes?.map((item) => (
    <button
      key={item.id}
      onClick={() => setSelectedSize(item.size)}
      style={{
        marginRight: "8px",
        padding: "8px 12px",
        border: "1px solid #333",
        borderRadius: "5px",
        backgroundColor:
          selectedSize === item.size ? "#FD6F00" : "white",
        color:
          selectedSize === item.size ? "white" : "black",
        cursor: "pointer",
      }}
    >
      {item.size}
    </button>
  ))}
</div>
    <button
  onClick={handleAddToCart}
  style={{
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "#FD6F00",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Add to Cart
</button>
    </div>
  );
}

export default ProductCard;