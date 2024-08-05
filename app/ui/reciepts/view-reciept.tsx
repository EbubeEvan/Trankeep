"use client";

import {
  NonNullableReciept,
  NonNullableOneCustomer,
  Product,
  User,
} from "@app/lib/definitions";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import RecieptHtml from "./recieptHtml";
import "@/app/ui/invoices/invoice.css";

const ViewReciept = ({
  reciept,
  customer,
  user,
}: {
    reciept: NonNullableReciept;
  customer: NonNullableOneCustomer;

  user: User;
}) => {
  const pdfRef = useRef<any>();

  const handlePrint = useReactToPrint({
    content: () => pdfRef.current!,
    documentTitle: `reciept_${reciept.id}`,
  });

  return (
    <div className="lg:pb-8">
      <div ref={pdfRef}>
        <RecieptHtml
          reciept={reciept as NonNullableReciept}
          customer={customer as NonNullableOneCustomer}
          user={user as User}
          ref={pdfRef}
        />
      </div>
      <form
        action=''
        className="flex gap-x-[3rem] justify-center mt-10 mb-10"
      >
        <button
          className="bg-blue-500 text-white p-3 rounded-md"
          onClick={(e) => {
            e.preventDefault();
            handlePrint();
          }}
        >
          Download reciept
        </button>
      </form>
    </div>
  );
};

export default ViewReciept;
