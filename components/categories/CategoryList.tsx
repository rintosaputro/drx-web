import React from "react";
import CategoryCard from "./CategoryCard";
import { API_URL } from "@/constants/api";
import { Category } from "@/types/product.type";

const CategoryList = async () => {
  const resCategory = await fetch(`${API_URL}/categories/?limit=6&offset=0`);
  const categories: Category[] = await resCategory.json();

  return (
    <section className="mt-14">
      <h2 className="text-3xl font-semibold">Products</h2>
      <ul className="mt-2 lg:mt-5 grid grid-cols-3 gap-3 lg:gap-6">
        {categories.map((category) => (
          <li key={category.id}>
            <CategoryCard
              id={category.id}
              name={category.name}
              image={category.image}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CategoryList;
