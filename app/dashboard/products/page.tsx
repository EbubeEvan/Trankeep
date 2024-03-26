import { lusitana } from "@app/ui/common/fonts";
import NewProductForm from "@app/ui/products/new-productform";
import ProductTable from "@app/ui/products/product-table";
import Search from "@app/ui/common/search";
import { fetchProductsPages } from "@app/lib/data";
import Pagination from "@app/ui/invoices/pagination";
import { Suspense } from "react";
import { InvoicesTableSkeleton } from "@app/ui/common/skeletons";
import { Metadata } from 'next';

// export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Products',
};

const Products = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchProductsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Products</h1>
      </div>
      <NewProductForm />
      <Search placeholder="Search products..." />
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <ProductTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Products;
