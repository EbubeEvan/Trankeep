"use client";

import { useState } from "react";
import Image from "next/image";
import { EyeIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import { NonNullableInvoice, NonNullableOneCustomer, Product } from "@app/lib/definitions";
import HtmlContent from "@app/dashboard/htmlContent/page";
import { renderToString } from 'react-dom/server';

const ViewForm = ({
  invoice,
  customer,
  products,
}: {
  invoice: NonNullableInvoice;
  customer: NonNullableOneCustomer;
  products: Product[];
}) => {
  const [pdfurl, setPdfUrl] = useState("a");
  const [generate, setGenerate] = useState(false);

  const htmlContent = renderToString(
        <HtmlContent invoice={invoice} customer={customer} products={products}/>
      );

  return (
    <div>
      {!pdfurl ? (
        <div>
          <form action="">
            <button className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400">
              {!generate ? "Generate invoice" : "Generating..."}
            </button>
          </form>
        </div>
      ) : (
        <div>
          <div className="border border-gray-400 p-5 rounded-t-md flex justify-center flex-col gap-2">
            <Image
              src="/pdf-icon.png"
              alt="pdf icon"
              width={150}
              height={150}
              priority={true}
              className="md:ml-[25%]"
            />
            <p className="text-center">Invoice number</p>
          </div>
          <div className="bg-blue-600 flex justify-between w-full h-full border-gray-400 rounded-b-md p-2">
            <EyeIcon width={30} className="text-white cursor-pointer " />
            <ArrowDownIcon width={30} className="text-white cursor-pointer " />
          </div>
          <form
            action=""
            className="flex gap-x-[3rem] gap-y-[1.5rem] flex-col md:flex-row mt-5"
          >
            <button className="bg-blue-500 text-white p-3 rounded-md">
              Send as Email
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-md"
            >
              Generate reciept
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ViewForm;
