import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { invoices, customers, revenue, users , products} from '../lib/placeholder-data';

const client = await db.connect();

async function seedUsers() {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        company TEXT NOT NULL,
        address TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password, company, address)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.company}, ${user.address})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedProducts() {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "products" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price INT NOT NULL
      );
    `;

    console.log(`Created "products" table`);

    // Insert data into the "products" table
    const insertedProducts = await Promise.all(
      products.map(async (product) => {
        return client.sql`
        INSERT INTO products (id, name, price)
        VALUES (${product.id}, ${product.name}, ${product.price})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedProducts.length} products`);

    return {
      createTable,
      products: insertedProducts,
    };
  } catch (error) {
    console.error("Error seeding products:", error);
    throw error;
  }
}

async function seedInvoices() {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS invoices (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        customer_id UUID NOT NULL,
        items JSONB NOT NULL,
        total INT NOT NULL,
        status VARCHAR(255) NOT NULL,
        date DATE NOT NULL
      );
    `;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(async (invoice) =>  client.sql`
            INSERT INTO invoices (customer_id, status, date, total, items)
            VALUES (${invoice.customer_id}, ${invoice.status}, ${invoice.date}, ${invoice.total}, ${JSON.stringify(invoice.items)})
            ON CONFLICT (id) DO NOTHING;`
       )
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error("Error seeding invoices:", error);
    throw error;
  }
}

async function seedReciepts() {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "reciepts" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS reciepts (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        version_id UUID NOT NULL,
        customer_id UUID NOT NULL,
        items JSONB NOT NULL,
        total INT NOT NULL,
        date DATE NOT NULL
      );
    `;

    console.log(`Created "reciepts" table`);

    // Insert data into the "reciepts" table
    // const insertedReceipts = await Promise.all(
    //   reciepts.map(async (reciept) =>  client.sql`
    //         INSERT INTO reciepts (customer_id, date, total, items)
    //         VALUES (${reciept.customer_id}, ${reciept.date}, ${reciept.total}, ${JSON.stringify(reciept.items)})
    //         ON CONFLICT (id) DO NOTHING;`
    //    )
    // );

    // console.log(`Seeded ${insertedReceipts.length} reciepts`);

    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding reciepts:", error);
    throw error;
  }
}


async function seedCustomers() {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company TEXT NOT NULL,
        address TEXT NOT NULL
      );
    `;

    console.log(`Created "customers" table`);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
        INSERT INTO customers (id, name, email, company, address)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.company}, ${customer.address})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error("Error seeding customers:", error);
    throw error;
  }
}

async function seedRevenue() {
  try {
    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;

    console.log(`Created "revenue" table`);

    // Insert data into the "revenue" table
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error("Error seeding revenue:", error);
    throw error;
  }
}

export async function GET() {
    try {
      await client.sql`BEGIN`;
      await seedUsers();
      await seedCustomers();
      await seedInvoices();
      await seedRevenue();
      await client.sql`COMMIT`;
  
      return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
      await client.sql`ROLLBACK`;
      return Response.json({ error }, { status: 500 });
    }
  }
