"use client";

import {
  NonNullableInvoice,
  NonNullableOneCustomer,
  Product,
  User,
} from "@app/lib/definitions";
import { useState } from "react";

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
  const [fetchConfig, setFetchConfig] = useState({
    url: "",
    loading: false,
    error: null,
  });

  const generatePdf = async () => {
    setFetchConfig({ ...fetchConfig, loading: true });
    try {
      const response = await fetch("/api/generatepdf", {
        method: "POST",
        body: JSON.stringify({ invoice, customer, products, user }),
      });

      const link: string = await response.json();
      console.log(link);
      
      setFetchConfig((fetchConfig) => ({ ...fetchConfig, url: link }));
      console.log('urlstate:', fetchConfig.url);``
      
    } catch (error) {
      console.log(error);
    } finally {
      setFetchConfig((fetchConfig) => ({ ...fetchConfig, loading: false }));
    }
  };

  return (
    <>
      {!fetchConfig.url ? (
        <button
          className="bg-blue-500 text-white p-3 rounded-md"
          onClick={(e) => {
            e.preventDefault();
            generatePdf();
          }}
        >
          {fetchConfig.loading ? "Generating..." : "Generate invoice"}
        </button>
      ) : (
        <form
          action=""
          className="flex gap-x-[3rem] gap-y-[1.5rem] flex-col justify-center md:flex-row mt-10 mb-10"
        >
          <a
            className="bg-blue-500 text-white p-3 rounded-md"
            href={fetchConfig.url}
            download={`invoice_${invoice.id}`}
          >
            Download invoice
          </a>
          <button className="bg-blue-500 text-white p-3 rounded-md">
            Send as Email
          </button>
          <button className="bg-blue-500 text-white p-3 rounded-md">
            Generate reciept
          </button>
        </form>
      )}
    </>
  );
};

export default ViewForm;
