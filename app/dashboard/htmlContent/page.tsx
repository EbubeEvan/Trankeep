import { NonNullableInvoice, NonNullableOneCustomer, Product } from "@app/lib/definitions";

const HtmlContent = ({
  invoice,
  customer,
  products,
}: {
  invoice: NonNullableInvoice;
  customer: NonNullableOneCustomer;
  products: Product[];
}) => {
  return (
    <main className="pl-[2rem] pr-[2rem]">
      <div>
        <h1 className="text-center text-4xl font-bold text-blue-700">
          Company Name
        </h1>
        <p className="text-center mt-5">Address</p>
        <div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-3">
              <h2 className="font-bold text-xl text-center">From</h2>
              <p className="text-center">User name</p>
            </div>
            <div className="flex flex-col gap-3 text-center">
              <h2 className="font-bold text-xl">Invoice</h2>
              <p className="text-center">Invoice number</p>
            </div>
          </div>
          <div className="flex justify-between mt-10">
            <div className="flex flex-col gap-3">
              <h2 className="font-bold text-xl text-center">To</h2>
              <p className="text-center">Customer name</p>
            </div>
            <div className="flex flex-col gap-3 text-center ml-[-3rem]">
              <h2 className="font-bold text-xl text-center">Address</h2>
              <p className="text-center">address</p>
            </div>
            <div className="flex flex-col gap-3 mr-[2rem]">
              <h2 className="font-bold text-xl text-center">Date</h2>
              <p className="text-center">date</p>
            </div>
          </div>
        </div>
        <table className="min-w-full border border-solid border-gray-900 mt-10 pl-[5rem]">
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
              <th scope="col" className="px-4 py-5 font-bold text-center">
                QTY
              </th>
              <th scope="col" className="px-3 py-5 font-bold text-center">
                Description
              </th>
              <th scope="col" className="px-3 py-5 font-bold text-center">
                Unit Price
              </th>
              <th scope="col" className="px-3 py-5 font-bold text-center">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="whitespace-nowrap py-3 pl-6 pr-3 text-center">
                1
              </td>
              <td className="whitespace-nowrap py-3 pl-6 pr-3 text-center">
                Clofenac
              </td>
              <td className="whitespace-nowrap py-3 pl-6 pr-3 text-center">
                75
              </td>
              <td className="whitespace-nowrap py-3 pl-6 pr-3 text-center">
                75
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-between mt-10 px-[5rem] border-2 py-3 border-solid border-gray-900">
          <p className="text-xl font-bold">Total</p>
          <p className="text-xl font-bold">75</p>
        </div>
        <div className="mt-10 flex flex-col gap-8">
          <div>
            <h2 className="text-blue-700 font-bold">Terms and Conditions</h2>
            <p>Payment due a month from reciept of this invoice</p>
          </div>
          <div>
            <h2 className="text-blue-700 font-bold">Payment Instructions</h2>
            <p>
              Bank transfer to Jane Doe <br />
              28046102393 <br />
              Gold Safe Bank Plc.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HtmlContent;
