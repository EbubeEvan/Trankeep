import ViewForm from "@app/ui/invoices/view-form";
import { fetchProducts, fetchCustomerById, fetchInvoiceById } from "@app/lib/data";
import { NonNullableInvoice, NonNullableOneCustomer, Product } from "@app/lib/definitions";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [invoice, customer, products] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomerById(id),
    fetchProducts()
  ]);
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <ViewForm invoice={invoice as NonNullableInvoice} customer={customer as NonNullableOneCustomer} products={products as Product[]}/>
    </main>
  )
};

export default page;
