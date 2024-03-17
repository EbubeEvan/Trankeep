import { NonNullableInvoice, NonNullableOneCustomer, Product, User } from "@app/lib/definitions";
import { formatCurrency } from "@app/lib/utils";

const InvoicePdfContent = ({
  invoice,
  customer,
  products,
  user
}: {
  invoice: NonNullableInvoice;
  customer: NonNullableOneCustomer;
  products: Product[];
  user: User;
}) => {
  const unitPrice = (name : string) : number => {
    const oneProduct = products.find((product) => product.name === name)
    return oneProduct?.price!  
  }

  const totalPrice = invoice?.items?.reduce((acc, item) => {
    const priceAsNumber = Number(item.price);
    if (!isNaN(priceAsNumber)) {
      acc += priceAsNumber;
    }
    return acc;
  }, 0);

  return (
    <main className="pl-[2rem] pr-[2rem] lg:mt-[23rem]">
      <div>
        <h1 className="text-center text-4xl font-bold text-blue-700">
          {user.company}
        </h1>
        <p className="text-center mt-5 mb-10">{user.address}</p>
        <div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-3">
              <p className="font-bold text-lg text-center">From</p>
              <p className="text-center">{user.name}</p>
            </div>
            <div className="flex flex-col gap-3 text-center">
              <p className="font-bold text-lg">Invoice</p>
              <p className="text-center max-w-[15rem]">{invoice?.id}</p>
            </div>
          </div>
          <div className="flex justify-between mt-10">
            <div className="flex flex-col gap-3">
              <p className="font-bold text-lg text-center">To</p>
              <p className="text-center max-w-[10rem] mb-[-0.5rem]">{customer?.name}</p>
              <p className="text-center max-w-[10rem]">{customer?.company}</p>
            </div>
            <div className="flex flex-col gap-3 text-center">
              <p className="font-bold text-lg text-center">Address</p>
              <p className="text-center max-w-[10rem]">{customer?.address}</p>
            </div>
            <div className="flex flex-col gap-3 mr-[2rem]">
              <p className="font-bold text-lg text-center">Date</p>
              <p className="text-center">{new Date().toISOString().split("T")[0]}</p>
            </div>
          </div>
        </div>
        <table className="w-full border border-solid border-gray-900 mt-10">
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
            {
              invoice?.items?.map((item, index) => (
                <tr key={index}>
              <td className="whitespace-nowrap py-3 pl-6 pr-3 text-center text-sm">
                {item.unit}
              </td>
              <td className="whitespace-nowrap py-3 pl-6 pr-3 text-center text-sm">
                {item.name}
              </td>
              <td className="whitespace-nowrap py-3 pl-6 pr-3 text-center text-sm">
                {formatCurrency(Number(unitPrice(item.name)))}
              </td>
              <td className="whitespace-nowrap py-3 pl-6 pr-3 text-center text-sm">
                {formatCurrency(Number(item.price))}
              </td>
            </tr>
              ))
            }
          </tbody>
        </table>
        <div className="flex justify-between mt-10 px-[5rem] border-2 py-3 border-solid border-gray-900">
          <p className="text-lg font-bold">Total</p>
          <p className="text-lg font-bold">{formatCurrency(Number(totalPrice))}</p>
        </div>
        <div className="mt-10 flex justify-between">
          <div>
            <p className="text-blue-700 font-bold">Terms and Conditions</p>
            <p className="max-w-[10rem]">Payment due a month from reciept of this invoice</p>
          </div>
          <div>
            <p className="text-blue-700 font-bold">Payment Instructions</p>
            <p className="mb-5">
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

export default InvoicePdfContent;