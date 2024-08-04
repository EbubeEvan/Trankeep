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
  
  const [invoice, session] = await Promise.all([
    fetchInvoiceById(id),
    auth()
  ]);

  const [customer, user] = await Promise.all([
    fetchCustomerById(invoice?.customer_id!),
    getUser(session?.user?.email!)
  ])

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <ViewForm
        invoice={invoice as NonNullableInvoice}
        customer={customer as NonNullableOneCustomer}
        user={user}
      />
    </main>
  );
};

export default page;

