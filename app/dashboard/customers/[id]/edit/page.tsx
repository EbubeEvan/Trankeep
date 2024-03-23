import EditCustomer from "@app/ui/customers/edit-customer";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomerById } from "@/app/lib/data";
import { notFound } from 'next/navigation';

export const dynamic = "force-dynamic";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const customer =  await fetchCustomerById(id)
  if (!customer) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Customers", href: "/dashboard/customers" },
          {
            label: "Edit Invoice",
            href: `/dashboard/customers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditCustomer customer={customer} />
    </main>
  );
};

export default page;
