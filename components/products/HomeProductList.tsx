import { API_URL } from "@/constants/api";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { Product } from "@/types/product.type";

const fetchProducts = async () => {
  const resProduct = await fetch(`${API_URL}/products?limit=6&offset=0`);
  const products: Product[] = await resProduct.json();
  return products;
};

const HomeProductList = async () => {
  const products = await fetchProducts();

  return (
    <section className="mt-14">
      <Link href="/products" className="hover:text-cyan-600">
        <h2 className="text-3xl font-semibold">Products</h2>
      </Link>
      <ul className="mt-2 lg:mt-5 grid grid-cols-3 gap-3 lg:gap-6">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard
              id={product.id}
              name={product.title}
              image={product.images[0]}
              price={product.price}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HomeProductList;
