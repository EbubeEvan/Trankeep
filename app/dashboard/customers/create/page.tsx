import CustomerForm from '@app/ui/customers/customer-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 

const page = async () => {
    const customers = await fetchCustomers();
 
    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Customers', href: '/dashboard/customers' },
            {
              label: 'Add Customer',
              href: '/dashboard/customers/create',
              active: true,
            },
          ]}
        />
        <CustomerForm/>
      </main>
    );
}

export default page