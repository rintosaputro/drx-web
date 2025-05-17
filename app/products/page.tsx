import Container from "@/components/layouts/Container";
import FilterCategory from "@/components/categories/FilterCategory";
import FilterPrice from "@/components/products/FilterPrice";
import ProductList from "@/components/products/ProductList";
import ResetFilter from "@/components/products/ResetFilter";
import React from "react";

const Product = () => {
  return (
    <div className="min-h-screen py-8 lg:py-14">
      <Container>
        <nav className="flex justify-between flex-col lg:flex-row gap-4">
          <h2 className="text-3xl font-semibold">Products</h2>
          <form className="flex gap-2 flex-col sm:flex-row">
            <FilterCategory />
            <FilterPrice />
            <ResetFilter />
          </form>
        </nav>
        <section>
          <ProductList />
        </section>
      </Container>
    </div>
  );
};

export default Product;
