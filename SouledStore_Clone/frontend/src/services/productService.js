const API_URL = "http://localhost:5000/api";

export const getProducts = async (search) => {
    const params=new URLSearchParams()
    if(search)params.append('search',search)
  const response = await fetch(`${API_URL}/products?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data;
};