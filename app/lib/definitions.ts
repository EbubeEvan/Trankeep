export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Product = {
  id: string,
  name: string,
  price: number
}

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  items: InputSet[]
  total: number;
  date: string;
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  total: string;
};

export type LatestInvoiceRaw = Omit<LatestInvoice, 'total'> & {
  total: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  total: number;
  status: 'pending' | 'paid';
};

export type CustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  items: InputSet[]
  total: number;
  status: 'pending' | 'paid';
};

export type InvoiceState = {
  errors?: {
    customerId?: string[];
    total?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type CustomerState = {
  errors?: {
    name?: string[];
    email?: string[];
  };
  message?: string | null;
};

export type ProductState = {
  errors?: {
    name?: string[];
    price?: string[];
  };
  message?: string | null;
};

export type RegisterState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export interface InputSet {
  name: string;
  unit: string;
  price: string;
}