import {
  NonNullableInvoice,
  NonNullableOneCustomer,
  Product,
  User,
} from "@app/lib/definitions";
import { Onedoc } from "@onedoc/client";
import { compile } from "@onedoc/react-print";
import InvoicePdfContent from "@app/ui/invoices/InvoicePdfContent";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import postcssColorFunctionalNotation from "postcss-color-functional-notation";
import React from "react";

export const POST = async (request: Request) => {
  const { invoice, customer, products, user } = await request.json();

  const API_KEY = process.env.ONEDOC_API_KEY!;

  try {
    const onedoc = new Onedoc(API_KEY);

    const html = await compile(
      React.createElement(InvoicePdfContent, {
        invoice: invoice as NonNullableInvoice,
        customer: customer as NonNullableOneCustomer,
        products: products as Product[],
        user: user as User,
      })
    );

    const css = await postcss([
      tailwindcss({
        content: [{ raw: html, extension: "html" }],
      }),
      postcssColorFunctionalNotation,
    ]).process(`@tailwind base;@tailwind components;@tailwind utilities;`, {
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
    console.log(link);
    
    return new Response(JSON.stringify(link), { status: 200 });
  } catch (error) {
    return new Response('failed to generate pdf', { status: 500 });
  } 
};
