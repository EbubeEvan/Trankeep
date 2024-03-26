import Pagination from '@/app/ui/invoices/pagination';
import Search from '@app/ui/common/search';
import RecieptTable from '@app/ui/reciepts/reciept-table';
import { lusitana } from '@app/ui/common/fonts';
import { InvoicesTableSkeleton } from '@app/ui/common/skeletons';
import { fetchRecieptsPages } from '@app/lib/data';
import { Suspense } from 'react';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Reciepts',
};

// export const dynamic = "force-dynamic";

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
  const totalPages = await fetchRecieptsPages(query)

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Reciepts</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search reciepts..." />
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <RecieptTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default Page