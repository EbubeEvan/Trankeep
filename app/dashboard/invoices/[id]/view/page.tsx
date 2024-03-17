import ViewForm from "@app/ui/invoices/view-form";
import {
  fetchProducts,
  fetchCustomerById,
  fetchInvoiceById,
} from "@app/lib/data";
import {
  NonNullableInvoice,
  NonNullableOneCustomer,
  Product,
} from "@app/lib/definitions";
import { auth } from "@auth";
import { getUser } from "@app/lib/data";
import { Onedoc } from "@onedoc/client";
import { compile } from "@onedoc/react-print";
import InvoicePdfContent from "@app/ui/invoices/InvoicePdfContent";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import postcssColorFunctionalNotation from "postcss-color-functional-notation";


const page = async ({ params }: { params: { id: string } }) => {
  const API_KEY = process.env.ONEDOC_API_KEY!

  const id = params.id;
  
  const [invoice, products, session] = await Promise.all([
    fetchInvoiceById(id),
    fetchProducts(),
    auth()
  ]);

  const [customer, user] = await Promise.all([
    fetchCustomerById(invoice?.customer_id!),
    getUser(session?.user?.email!)
  ])

  const onedoc = new Onedoc(API_KEY);

  const html = await compile(<InvoicePdfContent
    invoice={invoice as NonNullableInvoice}
    customer={customer as NonNullableOneCustomer}
    products={products as Product[]}
    user={user}
  />)

  const css = await postcss([
    tailwindcss({
        content: [{ raw: html, extension: "html" }],
    }),
    postcssColorFunctionalNotation,])
    .process(`@tailwind base;@tailwind components;@tailwind utilities;`, {
        from: undefined,
    }); // loads compiled tailwind styles

  let doc = {
    html: html,
    title: `invoice_${invoice?.id}`,
    test: false, // if true, produce a PDF in test mode with a Onedoc's watermark
    save: true, // if true, host the document and provide a download link in the console and your Onedoc's dashboard
    expiresIn: 30, // the number of day you want to host your document
    assets: [
      {
        path: "./global.css",
        content: css.toString(),
      },
    ],
  };
 
  const { link, error } = await onedoc.render(doc); 

  if (error) {
    throw error;
  }

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <ViewForm
        link={link as string}
        invoice={invoice as NonNullableInvoice}
      />
    </main>
  );
};

export default page;

