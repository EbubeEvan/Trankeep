"use client";

import {
  NonNullableInvoice,
  NonNullableOneCustomer,
  Product,
  User,
} from "@app/lib/definitions";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import InvoiceHtml from "@app/ui/invoices/invoicehtml";
import "@/app/ui/invoices/invoice.css";

const ViewForm = ({
  invoice,
  customer,
  products,
  user,
}: {
  invoice: NonNullableInvoice;
  customer: NonNullableOneCustomer;
  products: Product[];
  user: User;
}) => {
  const pdfRef = useRef<any>();

  const handlePrint = useReactToPrint({
    content: () => pdfRef.current!,
    documentTitle: `invoice_${invoice.id}`
  });

  return (
    <>
      <div ref={pdfRef}>
        <InvoiceHtml
          invoice={invoice as NonNullableInvoice}
          customer={customer as NonNullableOneCustomer}
          products={products as Product[]}
          user={user as User}
          ref={pdfRef}
        />
      </div>
      <form
        action=""
        className="flex gap-x-[3rem] justify-center mt-10 mb-10"
      >
        <button className="bg-blue-500 text-white p-3 rounded-md" onClick={(e) => {
          e.preventDefault()
          handlePrint()
        }}>
          Download invoice
        </button>
        {/* <button className="bg-blue-500 text-white p-3 rounded-md">
            Send as Email
          </button> */}
        <button className="bg-blue-500 text-white p-3 rounded-md">
          Generate reciept
        </button>
      </form>
    </>
  );
};

export default ViewForm;
