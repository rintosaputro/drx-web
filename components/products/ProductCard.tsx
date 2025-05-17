import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
  name: string;
  image: string;
  price: number;
  id: number;
}

const ProductCard: FC<Props> = ({ name, image, price, id }) => {
  return (
    <Link href={`/products/${id}`}>
      <div className="shadow rounded-sm w-[200px] overflow-hidden">
        <Image src={image} alt={name} width={200} height={100} />
        <div className="px-2 py-3">
          <div>${price}</div>
          <h3 className="font-semibold">{name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
