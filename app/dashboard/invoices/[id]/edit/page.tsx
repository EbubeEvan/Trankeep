import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomers, fetchProducts, fetchInvoiceById } from "@/app/lib/data";
import { notFound } from 'next/navigation';

export const dynamic = "force-dynamic";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [invoice, customers, products] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
    fetchProducts()
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} products={products} />
    </main>
  );
};

export default page;
