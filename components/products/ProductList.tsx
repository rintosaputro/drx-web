"use client";

import { CATEGORY_ID, PRICE_MAX, PRICE_MIN } from "@/constants/params";
import { fetchProducts } from "@/services/productServices";
import { Product } from "@/types/product.type";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const categoryId = searchParams.get(CATEGORY_ID) || "";
    const priceMin = searchParams.get(PRICE_MIN) || "";
    const priceMax = searchParams.get(PRICE_MAX) || "";

    const getProducts = async () => {
      setIsLoading(true);
      try {
        const prdc = await fetchProducts({ categoryId, priceMin, priceMax });
        setProducts(prdc);
      } catch {
        setIsError(true);
      }
      setIsLoading(false);
    };

    getProducts();
  }, [searchParams]);

  if (isError) {
    return (
      <div className="text-red-500 font-semibold text-2xl text-center py-24">
        Server Error
      </div>
    );
  }

  if (isLoading) {
    return (
      <section>
        <ul className="mt-2 lg:mt-5 grid grid-cols-3 justify-center gap-3 lg:gap-6">
          {[...Array(6)].map((_i, idx) => (
            <div key={idx} className="bg-gray-400 animate-pulse w-[80%] h-36" />
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="my-14">
      {products?.length === 0 && (
        <h2 className="text-center py-8 font-semibold text-4xl">
          Product not found
        </h2>
      )}
      <ul className="mt-2 lg:mt-5 grid grid-cols-3 justify-items-center gap-3 lg:gap-6">
        {products?.map((product) => (
          <ProductCard
            id={product.id}
            name={product.title}
            price={product.price}
            image={product.images[0]}
            key={product.id}
          />
        ))}
      </ul>
    </section>
  );
};

export default ProductList;
