"use client";

import {
  NonNullableInvoice,
} from "@app/lib/definitions";

const ViewForm = ({
  link,
  invoice
}: {
  link: string,
  invoice: NonNullableInvoice
}) => {

  return (
    <>
      <form
        action=""
        className="flex gap-x-[3rem] gap-y-[1.5rem] flex-col justify-center md:flex-row mt-10 mb-10"
      >
        <a
          className="bg-blue-500 text-white p-3 rounded-md"
          href={link}
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
    </>
  );
};

export default ViewForm;
