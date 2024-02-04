"use client";

import { useState } from "react";
import Image from "next/image";
import { EyeIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import ViewForm from "@app/ui/invoices/view-form";

const page = () => {
  const [pdfurl, setPdfUrl] = useState("");
  const [generate, setGenerate] = useState(false);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div>
        {!pdfurl ? (
          <div>
            <button className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400">
              {!generate ? "Generate invoice" : "Generating..."}
            </button>
          </div>
        ) : (
          <div>
            <div className="border border-gray-400 p-5 rounded-t-md flex justify-center">
              <Image
                src="/pdf-icon.png"
                alt="pdf icon"
                width={150}
                height={150}
              />
              </div>
              <div className="bg-blue-600 flex justify-between w-full h-full border-gray-400 rounded-b-md p-2">
                <EyeIcon width={30} className="text-white cursor-pointer "/>
                <ArrowDownIcon width={30} className="text-white cursor-pointer "/>
              </div>
               <ViewForm/>
          </div>
        )}
      </div>
    </main>
  );
};

export default page;
