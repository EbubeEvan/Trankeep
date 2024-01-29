// import { useState, useEffect } from 'react';

// // ...

// const [pdfUrl, setPdfUrl] = useState('');

// const handleGeneratePdf = async () => {
//   const htmlContent = /* Get HTML content to be converted to PDF */;

//   try {
//     const response = await fetch('/api/generate-pdf', {
//       method: 'POST',
//       body: JSON.stringify({ htmlContent }),
//     });

//     const data = await response.json();
//     setPdfUrl(data.url);
//   } catch (error) {
//     // Handle errors
//   }
// };

// // ... render a button to trigger handleGeneratePdf

// // Use pdfUrl to open the PDF in a new tab or trigger a download

// import { useSession } from "next-auth/react";

// function MyComponent() {
//   const { data: session } = useSession();

//   // Use session data here, for example:
//   if (session) {
//     console.log(session.user);
//   }
//   // ...
// }

// const base64Pdf = await pdfkit.finalize().toString('base64'); // or convert pdf stream to base64

// const email = {
//   from: 'your-email@domain.com',
//   to: 'recipient@domain.com',
//   subject: `Invoice #${invoiceId}`,
//   html: `<p>Please find your invoice attached.</p>`,
//   attachments: [
//     {
//       content: base64Pdf,
//       filename: `invoice-${invoiceId}.pdf`,
//       contentType: 'application/pdf',
//     },
//   ],
// };

// const resend = new Resend(process.env.RESEND_API_KEY); // initialize Resend client with your API key
// await resend.emails.send(email);

// res.json({ message: 'Invoice sent successfully!' });

// InvoiceGenerator.js
// import React from 'react';
// import InvoiceHTML from './InvoiceHTML';
// import pdfkit from 'pdfkit';

// const InvoiceGenerator = async () => {
//   // ... fetch or load invoice data

//   const invoiceHTML = renderToString(
//     <InvoiceHTML invoiceData={invoiceData} />
//   );

//   const doc = new pdfkit();
//   doc.html(invoiceHTML);

//   // ... PDF generation and download logic ...
// };
