"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import bcrypt from "bcrypt";
import { uuidv7 } from "@kripod/uuidv7";
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

  const id = uuidv7();

  const dataUrlParts = image_url.split(";base64,");
  const imageBuffer = Buffer.from(dataUrlParts[1], "base64");

  const uploadFolderPath = path.join(process.cwd(), "customers-photos");
  const fileName = `${id}_${Date.now()}_image.png`;
  const filePath = path.join(uploadFolderPath, fileName);

  // Save the file to the upload folder
  fs.writeFileSync(filePath, imageBuffer);

  if (image_url === "") {
    image_url = "/customers-photos/profile.png";
  } else {
    image_url = `/customers-photos/${filePath}`;
  }

  console.log(image_url)

  try {
    await sql`
      INSERT INTO customers (id, name, email, image_url)
      VALUES (${id}, ${name}, ${email}, ${image_url})`;
  } catch (error) {
    return {
      message: "Database Error: Failed to Add Customer.",
    };
  }
  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
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
    const userId = uuidv7(); // Generate UUID for the user ID
    await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${userId}, ${name}, ${email}, ${hashedPassword})`;
  } catch (error) {
    console.log(`error is: ${(error as Error).message}`);
    if ((error as Error).message.includes("db error")) {
      return "db error";
    }
    throw error;
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
