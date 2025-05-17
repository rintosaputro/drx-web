import CategoryList from "@/components/categories/CategoryList";
import Container from "@/components/layouts/Container";
import ProductList from "@/components/products/HomeProductList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen pb-14">
      <Container>
        <header className="flex justify-between flex-col-reverse lg:flex-row items-center gap-3">
          <div>
            <h1 className="text-xl">
              Welcome to{" "}
              <span className="text-3xl sm:text-5xl font-semibold text-blue-900 pl-1">
                DRX Store
              </span>
            </h1>
            <p className="mt-2">Everything you need, all in one place.</p>
          </div>
          <Image
            src="/images/img-header.jpg"
            alt="shope logo"
            width={700}
            height={400}
            className="w-[300px] lg:w-[600px] xl:w-[700px] h-auto"
          />
        </header>

        <main>
          <ProductList />

          <CategoryList />
        </main>
      </Container>
    </div>
  );
}
