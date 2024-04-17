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
import { addReciept } from "@app/lib/actions";
import { useFormStatus } from "react-dom";
import Link from "next/link";

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
    documentTitle: `invoice_${invoice.id}`,
  });

  const addRecieptWithInvoice = addReciept.bind(null, invoice);

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
        action={addRecieptWithInvoice}
        className="flex gap-x-[3rem] justify-center mt-10 mb-10"
      >
        <button
          className="bg-blue-500 text-white p-3 rounded-md"
          onClick={(e) => {
            e.preventDefault();
            handlePrint();
          }}
        >
          Download invoice
        </button>
        {/* <button className="bg-blue-500 text-white p-3 rounded-md">
            Send as Email
          </button> */}
        {invoice.status === "pending" ? (
          <Link href={`/dashboard/invoices/${invoice.id}/edit`}>
            <button className="bg-blue-500 text-white p-3 rounded-md">
              Invoice still pending <br /> Edit invoice
            </button>
          </Link>
        ) : (
          <RecieptButton />
        )}
      </form>
    </>
  );
};

import React from "react";
import { link } from "fs";

const RecieptButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      className="bg-blue-500 text-white p-3 rounded-md active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
    >
      Generate reciept
    </button>
  );
};

export default ViewForm;
