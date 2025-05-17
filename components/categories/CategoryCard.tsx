import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
  id: number;
  image: string;
  name: string;
}

const CategoryCard: FC<Props> = ({ id, image, name }) => {
  return (
    <Link href={`/products/?categoryId=${id}`}>
      <div className="shadow rounded-sm w-[200px] overflow-hidden">
        <Image src={image} alt={name} width={200} height={100} />
        <div className="px-2 py-3">
          <h3 className="font-semibold">{name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
