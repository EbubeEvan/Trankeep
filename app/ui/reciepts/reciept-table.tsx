import Image from 'next/image';
import { DeleteReciept, ViewReciept } from '@/app/ui/invoices/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredReciepts } from '@/app/lib/data';

 const RecieptTable = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const reciepts = await fetchFilteredReciepts(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile view */}
          <div className="md:hidden">
            {reciepts?.map((reciept) => (
              <div
                key={reciept.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src='/profile.png'
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt='profile pic'
                      />
                      <p>{reciept.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{reciept.email}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(reciept.total)}
                    </p>
                    <p>{formatDateToLocal(reciept.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <DeleteReciept id={reciept.id} />
                    <ViewReciept id={reciept.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop view */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  total
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {reciepts?.map((reciept) => (
                <tr
                  key={reciept.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src='/profile.png'
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt='profile pic'
                      />
                      <p>{reciept.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {reciept.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(reciept.total)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(reciept.date)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <DeleteReciept id={reciept.id} />
                      <ViewReciept id={reciept.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RecieptTable;
