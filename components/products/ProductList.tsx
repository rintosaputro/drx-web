"use client";

import { CATEGORY_ID, PRICE_MAX, PRICE_MIN } from "@/constants/params";
import { fetchProducts } from "@/services/productServices";
import { Product } from "@/types/product.type";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import ProductCard from "./ProductCard";

const LIMIT = 6;

const ProductList = () => {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getQueryParams = () => ({
    categoryId: searchParams.get(CATEGORY_ID) || "",
    priceMin: searchParams.get(PRICE_MIN) || "",
    priceMax: searchParams.get(PRICE_MAX) || "",
  });

  useEffect(() => {
    const fetchInitialProducts = async () => {
      setIsLoading(true);
      setIsError(false);
      setOffset(0);
      setProducts([]);
      setHasMore(true);

      const { categoryId, priceMin, priceMax } = getQueryParams();

      try {
        const data = await fetchProducts({
          limit: LIMIT,
          offset: 0,
          categoryId: categoryId ? +categoryId : undefined,
          priceMin: priceMin ? +priceMin : undefined,
          priceMax: priceMax ? +priceMax : undefined,
        });

        setProducts(data);
        if (data.length < LIMIT) setHasMore(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_err) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchInitialProducts();
  }, [searchParams.toString()]);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setIsError(false);

    const { categoryId, priceMin, priceMax } = getQueryParams();

    try {
      const data = await fetchProducts({
        limit: LIMIT,
        offset: offset + LIMIT,
        categoryId: categoryId ? +categoryId : undefined,
        priceMin: priceMin ? +priceMin : undefined,
        priceMax: priceMax ? +priceMax : undefined,
      });

      setProducts((prev) => [...prev, ...data]);
      setOffset((prev) => prev + LIMIT);
      if (data.length < LIMIT) setHasMore(false);
    } catch {
      setIsError(true);
    }

    setIsLoading(false);
  }, [offset, hasMore, isLoading, searchParams]);

  // Detect scroll bottom
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 300 &&
        hasMore &&
        !isLoading
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore, hasMore, isLoading]);

  if (isError) {
    return (
      <div className="text-red-500 font-semibold text-2xl text-center py-24">
        Server Error
      </div>
    );
  }

  return (
    <section className="my-14">
      {products.length === 0 && !isLoading ? (
        <h2 className="text-center py-8 font-semibold text-4xl">
          Product not found
        </h2>
      ) : (
        <ul className="mt-2 lg:mt-5 grid grid-cols-3 justify-items-center gap-3 lg:gap-6">
          {products.map((product) => (
            <ProductCard
              id={product.id}
              name={product.title}
              price={product.price}
              image={product.images[0]}
              key={product.id}
            />
          ))}
        </ul>
      )}

      {isLoading && (
        <ul className="mt-6 grid grid-cols-3 justify-items-center gap-3 lg:gap-6">
          {[...Array(LIMIT)].map((_, idx) => (
            <div
              key={idx}
              className="bg-gray-300 animate-pulse w-[80%] h-36 rounded"
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProductList;
