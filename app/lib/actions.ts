"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ date: true, id: true });

// This is temporary
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

// create invoice
export const createInvoice = async (prevState: State, formData: FormData) => {
  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  console.log(validatedFields);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
};

// update invoice
export const updateInvoice = async (
  id: string,
  prevState: State,
  formData: FormData
) => {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
};

//delete invoice
export const deleteInvoice = async (id: string) => {
  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath("/dashboard/invoices");
    return { message: "Deleted Invoice" };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Invoice." };
  }
};

//Add customer
export const addCustomer = async (
  image_url: string,
  prevState: string | undefined,
  formData: FormData
) => {
  const validatedFields = z
    .object({
      name: z.string(),
      email: z.string().email(),
    })
    .safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to register.",
    };
  }

  const { name, email } = validatedFields.data;

  let savedImageUrl = "/customers/profile.png"; // Default URL

  // Add image to customers folder
  if (image_url) {
    const dataUrlParts = image_url.split(";base64,");
    if (dataUrlParts.length === 2) {
      const imageBuffer = Buffer.from(dataUrlParts[1], "base64");

      const uploadFolderPath = path.join(process.cwd(), "/public/customers");
      const customerName = name.split(" ");
      const fileName = `${customerName[0]}-${customerName[1]}.png`;
      const filePath = path.join(uploadFolderPath, fileName);

      // Save the file to customers folder
      fs.writeFileSync(filePath, imageBuffer);

      savedImageUrl = `/customers/${fileName}`;
    }
  }

  try {
    const id = uuidv4();
    await sql`
      INSERT INTO customers (id, name, email, image_url)
      VALUES (${id}, ${name}, ${email}, ${savedImageUrl})`;
  } catch (error) {
    return {
      message: "Database Error: Failed to Add Customer.",
    };
  }
  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
};

// Add Product
export const addProduct = async (
  prevState: string | undefined,
  formData: FormData
) => {
  const validatedFields = z
    .object({
      name: z.string({
        invalid_type_error: "Please input product name.",
      }),
      price: z.coerce
        .number()
        .gt(0, { message: "Please enter an amount greater than $0." }),
    })
    .safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to add product.",
    };
  }

  const { name, price } = validatedFields.data;
  const priceInCents = price * 100;

  try {
    const id = uuidv4();
    await sql`
      INSERT INTO products (id, name, price)
      VALUES (${id}, ${name}, ${priceInCents})`;
  } catch (error) {
    return {
      message: "Database Error: Failed to add product.",
    };
  }
  revalidatePath('/dashboard/products');
};

// Delete Product
export const deleteProduct = async (id: string) => {

  try {
    await sql`DELETE FROM products WHERE id = ${id}`;
    revalidatePath('/dashboard/products');
    return { message: "Deleted Product" };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Product." };
  }
};

//register new user
export const register = async (
  prevState: string | undefined,
  formData: FormData
) => {
  const validatedFields = z
    .object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })
    .safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to register.",
    };
  }

  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const userId = uuidv4(); // Generate UUID for the user ID
    await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${userId}, ${name}, ${email}, ${hashedPassword})`;
  } catch (error) {
    return {
      message: "Database Error: Failed to register.",
    };
  }

  redirect("/login");
};

//sign in
export const authenticate = async (
  prevState: string | undefined,
  formData: FormData
) => {
  try {
    await signIn("credentials", Object.fromEntries(formData.entries()));
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialsSignin";
    }
    throw error;
  }
};
