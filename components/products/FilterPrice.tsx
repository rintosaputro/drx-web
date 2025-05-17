"use client";

import { PRICE_MAX, PRICE_MIN } from "@/constants/params";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const FilterPrice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const price_min = searchParams.get(PRICE_MIN);
  const price_max = searchParams.get(PRICE_MAX);

  const onOpen = () => {
    setPriceMin(Number(price_min || 0));
    setPriceMax(Number(price_max || 0));
    setIsOpen(!isOpen);
  };

  const onChangeMin = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (!priceMax || (priceMax && value < priceMax)) {
      setPriceMin(Number(value));
    }
  };

  const onChangeMax = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value <= priceMin && value) {
      setError("Maximum price cannot be less than minimum price");
    } else {
      setError("");
    }
    setPriceMax(value);
  };

  const handleSave = () => {
    if (error) {
      return;
    }

    if (!priceMax) {
      return setError("Maximum price must be filled");
    }

    const params = new URLSearchParams(searchParams.toString());
    if (priceMin) params.set(PRICE_MIN, priceMin.toString());
    if (priceMax) params.set(PRICE_MAX, priceMax.toString());

    router.replace(`?${params.toString()}`);

    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setError("");
  };

  useEffect(() => {
    if (!price_max && !price_min) {
      setPriceMax(0);
      setPriceMin(0);
    }
  }, [price_min, price_max]);

  return (
    <div className="relative w-full sm:w-[200px]">
      <button
        type="button"
        onClick={onOpen}
        className="bg-gray-50 border border-gray-300 py-3 px-5 rounded w-full text-start text-sm"
      >
        {priceMax ? `min: ${priceMin} - max: ${priceMax}` : "Price Range"}
      </button>
      {isOpen && (
        <div className="absolute top-14 bg-gray-50 border border-gray-300 z-10">
          <input
            type="number"
            onChange={onChangeMin}
            value={priceMin || undefined}
            placeholder="minimal"
            className="py-2.5 px-2.5 border w-full"
          />
          <input
            type="number"
            onChange={onChangeMax}
            value={priceMax || undefined}
            placeholder="maximal"
            className="py-2.5 px-2.5 border w-full"
          />
          {error && <p className="text-red-400">{error}</p>}
          <div className="grid grid-cols-2">
            <button
              type="button"
              className="border bg-cyan-600 text-white cursor-pointer"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="border bg-gray-600 text-white cursor-pointer"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPrice;
