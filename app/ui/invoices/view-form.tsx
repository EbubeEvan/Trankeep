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

    // Scale factor to fit content within A4 size
    const scaleFactor = 210 / canvas.width; // 210 is A4 width in mm

    // Calculate scaled height
    const imgHeight = canvas.height * scaleFactor;

    // Add first page
    pdf.addImage(canvas, "PNG", 0, 0, 210, imgHeight);

    // Calculate remaining height for additional pages
    let remainingHeight = canvas.height - imgHeight;
    let currentPage = 1;

    // Add additional pages if necessary
    while (remainingHeight > 0) {
      pdf.addPage();
      const pageHeight = Math.min(remainingHeight, 297); // A4 height in mm
      pdf.addImage(canvas, "PNG", 0, currentPage * 297, 210, pageHeight);
      remainingHeight -= pageHeight;
      currentPage++;
    }
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
        className="flex gap-x-[3rem] gap-y-[1.5rem] flex-col justify-center md:flex-row mt-10 mb-10"
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
