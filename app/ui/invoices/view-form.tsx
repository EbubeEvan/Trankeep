"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  NonNullableInvoice,
  NonNullableOneCustomer,
  Product,
  User,
} from "@app/lib/definitions";
import InvoicePdfContent from "./InvoicePdfContent";

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
  const generatePDF = () => {
    const input = document.getElementById("invoice-pdf-content");

    html2canvas(input!).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      const url = pdf.output("datauristring");
      
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = `invoice_${invoice.id}`;
      downloadLink.click();
    });
  };

  return (
    <div>
      <div id="invoice-pdf-content">
        <InvoicePdfContent
          invoice={invoice as NonNullableInvoice}
          customer={customer as NonNullableOneCustomer}
          products={products as Product[]}
          user={user}
        />
      </div>
      <form
        action=""
        className="flex gap-x-[3rem] gap-y-[1.5rem] flex-col md:flex-row mt-10 mb-10 lg:ml-7"
      >
        <button
          className="bg-blue-500 text-white p-3 rounded-md"
          onClick={(e) => {
            e.preventDefault();
            generatePDF()
          }}
        >
          Download invoice
        </button>
        <button className="bg-blue-500 text-white p-3 rounded-md">
          Send as Email
        </button>
        <button className="bg-blue-500 text-white p-3 rounded-md">
          Generate reciept
        </button>
      </form>
    </div>
  );
};

export default ViewForm;
