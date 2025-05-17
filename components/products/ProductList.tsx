import { API_URL } from "@/constants/api";
import { Product } from "@/types/product.type";
import ProductCard from "./ProductCard";

const ProductList = async () => {
  const resProduct = await fetch(`${API_URL}/products?limit=6&offset=0`);
  const products: Product[] = await resProduct.json();

  return (
    <section className="mt-14">
      <h2 className="text-3xl font-semibold">Products</h2>
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

export default ProductList;
