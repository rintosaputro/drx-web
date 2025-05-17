"use client";

import { CATEGORY_ID } from "@/constants/params";
import { fetchCategories } from "@/services/productServices";
import { Category } from "@/types/product.type";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const FilterCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [value, setValue] = useState<number | "">("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryId = searchParams.get(CATEGORY_ID);

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value) {
      const params = new URLSearchParams(searchParams.toString());
      params.set(CATEGORY_ID, String(value));
      router.replace(`?${params.toString()}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const category = await fetchCategories();
      setCategories(category);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (categoryId && categories?.length > 0) {
      setValue(Number(categoryId));
    }
  }, [categories, categoryId]);

  useEffect(() => {
    if (!categoryId) {
      console.log("okeeee", categoryId);
      setValue("");
    }
  }, [categoryId]);

  console.log("okeee valueee", value);

  return (
    <>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto sm:w-fit p-2.5"
        onChange={onChange}
        value={value}
      >
        <option value="">Select Category</option>
        {categories?.length > 0 &&
          categories?.map((category) => (
            <option key={category?.id} value={category?.id}>
              {category?.name}
            </option>
          ))}
      </select>
    </>
  );
};

export default FilterCategory;
