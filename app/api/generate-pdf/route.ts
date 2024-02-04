import { NextApiRequest, NextApiResponse } from 'next';
const PDFDocument = require('pdfkit')

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const htmlContent = req.body.htmlContent; // Assuming HTML content is sent in request body

    const doc = new PDFDocument();
    doc.addPage();
    doc.fontSize(12);
    doc.html(htmlContent, {
      width: doc.pageSize.width - 40, // Adjust margins as needed
      x: 20,
      y: 40,
    });
    doc.end();

    const blob = new Blob([doc.output()], { type: 'application/pdf' });

    const url = URL.createObjectURL(blob); // Generate URL for viewing/downloading

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');

    res.status(201).json({ url }); // Send URL in response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
}
