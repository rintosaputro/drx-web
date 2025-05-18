import Link from "next/link";
import React, { FC } from "react";
import SafeImage from "../ui/SafeImage";

interface Props {
  name: string;
  image: string;
  price: number;
  id: number;
}

const ProductCard: FC<Props> = ({ name, image, price, id }) => {
  return (
    <Link
      href={`/products/${id}`}
      className="w-fit block hover:shadow-cyan-600 hover:shadow-xl"
    >
      <div className="shadow rounded-sm w-[150px] sm:w-[200px] overflow-hidden">
        <div className="w-[200px] h-[200px] overflow-hidden">
          <SafeImage
            src={image}
            alt={name}
            width={200}
            height={100}
            className="w-[150px] sm:w-[200px] h-auto"
          />
        </div>
        <div className="px-2 py-3">
          <div>${price}</div>
          <h3 className="font-semibold">{name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
