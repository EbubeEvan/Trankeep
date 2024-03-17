import Pagination from '@/app/ui/invoices/pagination';
import CustomersTable from '@app/ui/customers/table';
import { InvoicesTableSkeleton } from '@app/ui/common/skeletons';
import { fetchCustomersPages } from '@app/lib/data';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchFilteredCustomers } from '@app/lib/data';
 
export const metadata: Metadata = {
  title: 'Customers',
};

 const Page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCustomersPages(query)

  const customers = await fetchFilteredCustomers(query, currentPage);

  return (
    <div className="w-full">
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <CustomersTable customers={customers} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default Page