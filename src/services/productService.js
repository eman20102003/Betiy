const BASE_URL = "https://api.escuelajs.co/api/v1";

export async function getAllProducts() {
  const res = await fetch(`${BASE_URL}/products`);

  if (!res.ok) throw new Error("Failed to fetch");

  return await res.json();
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);

  if (!res.ok) throw new Error("Failed to fetch");

  return await res.json();
}