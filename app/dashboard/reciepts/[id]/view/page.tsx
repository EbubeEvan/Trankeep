import ViewReciept from "@app/ui/reciepts/view-reciept";
import {
  fetchCustomerById,
  fetchRecieptById,
} from "@app/lib/data";
import {
  NonNullableReciept,
  NonNullableOneCustomer,
} from "@app/lib/definitions";
import { auth } from "@auth";
import { getUser } from "@app/lib/data";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  
  const [reciept, session] = await Promise.all([
    fetchRecieptById(id),
    auth()
  ]);

  const [customer, user] = await Promise.all([
    fetchCustomerById(reciept?.customer_id!),
    getUser(session?.user?.email!)
  ])

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <ViewReciept
        reciept={reciept as NonNullableReciept}
        customer={customer as NonNullableOneCustomer}
        user={user}
      />
    </main>
  );
};

export default page;

