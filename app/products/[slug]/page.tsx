import Container from "@/components/layouts/Container";
import SafeImage from "@/components/ui/SafeImage";
import { API_URL } from "@/constants/api";
import { Product } from "@/types/product.type";
import { notFound } from "next/navigation";
import React from "react";

export async function generateStaticParams() {
  const res = await fetch(`${API_URL}/products`);
  const products: Product[] = await res.json();

  return products.map((product) => ({
    slug: product.id.toString(),
  }));
}

export default async function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(`${API_URL}/products/${params.slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    notFound();
  }

  const product: Product = await res.json();

  return (
    <div className="min-h-screen py-8 lg:py-14">
      <Container>
        <section className="grid grid-cols-2 gap-8">
          <div className="flex overflow-auto">
            {product.images.map((image) => (
              <SafeImage
                key={image}
                src={image}
                alt={product.slug}
                width={500}
                height={500}
              />
            ))}
          </div>
          <div>
            <h1 className="text-2xl font-semibold mt-3">{product.title}</h1>
            <div className="mt-9">
              <span className="font-semibold text-cyan-700 text-xl">
                $ {product.price}
              </span>
              <span>
                {" "}
                {`> `}
                {product.category.name}
              </span>
            </div>
            <p className="mt-9">{product.description}</p>
          </div>
        </section>
      </Container>
    </div>
  );
}
