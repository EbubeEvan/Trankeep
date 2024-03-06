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

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [invoice, products] = await Promise.all([
    fetchInvoiceById(id),
    fetchProducts(),
  ]);

  const customer = await fetchCustomerById(invoice?.customer_id!)

  const session = await auth();

  const user = await getUser(session?.user?.email!);

  return (
    <main className="flex h-full flex-col items-center justify-center ">
      <ViewForm
        invoice={invoice as NonNullableInvoice}
        customer={customer as NonNullableOneCustomer}
        products={products as Product[]}
        user={user}
      />
    </main>
  );
};

export default page;
