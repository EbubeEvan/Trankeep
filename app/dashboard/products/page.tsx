import { lusitana } from '@/app/ui/fonts';
import NewProductForm from '@app/ui/products/new-product';
import ProductTable from '@app/ui/products/product-table';
import Search from '@app/ui/search';
import { fetchProductsPages } from '@app/lib/data';
import Pagination from '@app/ui/invoices/pagination';

const Products = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchProductsPages(query)

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Products</h1>
      </div>
    <NewProductForm/>
    <Search placeholder='Search products...'/>
    <ProductTable/>
    <Pagination totalPages={totalPages} />
    </div>
  )
}

export default Products