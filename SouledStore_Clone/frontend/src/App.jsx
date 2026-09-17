import { useEffect, useState } from "react";
import { getProducts } from "./services/productService";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async (searchValue = "") => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts(searchValue);

      console.log("DATA:", data);
      console.log("PRODUCTS:", data.products);

      setProducts(data.products);
    } catch (error) {
      console.error("ERROR:", error);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(search);
  };

 return (
  <div>
    <h1>SouledStore Products</h1>

    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button type="submit">Search</button>
    </form>

    {loading && <h2>Loading products...</h2>}

    {error && <h2>{error}</h2>}

    {!loading && !error && (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          padding: "20px",
        }}
      >
        {products.length === 0 ? (
          <h2>No products found</h2>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        )}
      </div>
    )}

    <hr />

    <Cart />
  </div>
);
}

export default App;