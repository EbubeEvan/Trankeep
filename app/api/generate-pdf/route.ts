const PDFDocument = require("pdfkit");

export default async function POST(req: Request) {
  try {
    const { htmlContent } = await req.json(); // Assuming HTML content is sent in request body

    const doc = new PDFDocument();
    doc.addPage();
    doc.fontSize(12);
    doc.html(htmlContent, {
      width: doc.pageSize.width - 40, // Adjust margins as needed
      x: 20,
      y: 40,
    });
    doc.end();

    const blob = new Blob([doc.output()], { type: "application/pdf" });

    const url = URL.createObjectURL(blob); // Generate URL for viewing/downloading

    return new Response(JSON.stringify({ url }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch generate pdf", { status: 500 });
  }
}
