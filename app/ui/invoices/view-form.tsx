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
import "@/invoice.css";

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
  // const [fetchConfig, setFetchConfig] = useState({
  //   url: "",
  //   loading: false,
  //   error: null,
  // });

  // const generatePdf = async () => {
  //   setFetchConfig({ ...fetchConfig, loading: true });
  //   try {
  //     const response = await fetch("/api/generatepdf", {
  //       method: "POST",
  //       body: JSON.stringify({ invoice, customer, products, user }),
  //     });

  //     const link: string = await response.json();
  //     console.log(link);

  //     setFetchConfig((fetchConfig) => ({ ...fetchConfig, url: link }));
  //     console.log('urlstate:', fetchConfig.url);``

  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setFetchConfig((fetchConfig) => ({ ...fetchConfig, loading: false }));
  //   }
  // };

  const pdfRef = useRef<any>();

  const handlePrint = useReactToPrint({
    content: () => pdfRef.current!,
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
        className="flex gap-x-[3rem] gap-y-[1.5rem] flex-col justify-center md:flex-row mt-10 mb-10"
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
