import { API_URL } from "@/constants/api";
import { Category, Product } from "@/types/product.type";

export const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/categories`);
  const categories: Category[] = await res.json();
  return categories;
};

interface FetchProduct {
  limit?: number | string;
  offset?: number | string;
  categoryId?: number | string;
  priceMin?: number | string;
  priceMax?: number | string;
}

export const fetchProducts = async (props: FetchProduct) => {
  const { limit, offset, categoryId, priceMax, priceMin } = props;
  const query = new URLSearchParams();

  if (limit) query.set("limit", limit.toString());
  if (offset) query.set("offset", offset.toString());
  if (categoryId) query.set("categoryId", categoryId.toString());
  if (priceMin) query.set("price_min", priceMin.toString());
  if (priceMax) query.set("price_max", priceMax.toString());

  const res = await fetch(`${API_URL}/products?${query.toString()}`);
  const products: Product[] = await res.json();
  return products;
};
