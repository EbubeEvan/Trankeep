// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
    company: 'Health Plus',
    address: '25 Estate Avenue, Green Field, Lagos State.'
  },
];

const products = [
  {
    id: '45bcc7d9-6016-4c6e-bc0e-6decba215fc9',
    name: 'Doxycap 100mg',
    price: 4064,
  },
  {
    id: '929c5032-bc5f-4f75-b673-58eec61b37b3',
    name: 'Flovid 200mg',
    price: 1232,
  },
  {
    id: '99fcbec5-34ab-4adf-8b7b-5126aeb0f6a8',
    name: 'Hovimax 250mg',
    price: 1386,
  },
  {
    id: '545680bb-be5c-4863-af8c-27e424e8cb16',
    name: 'Coloseal',
    price: 2359,
  },
  {
    id: 'd3bd3ca0-a01d-40a7-b9bc-a223ec14d326',
    name: 'Omezole 20mg',
    price: 3124,
  },
  {
    id: 'f34241d0-3f77-4f6f-91ab-7f4d26c89188',
    name: 'Famotab 40mg',
    price: 9950,
  },
  {
    id: '95f413f9-c863-4e84-ba63-ba599b1d046c',
    name: 'Diabetmin 500',
    price: 2904,
  },
  {
    id: '7b8d4e22-7a30-4e3a-adc8-a83ba8f75a5f',
    name: 'Clamide',
    price: 3421,
  },
  {
    id: '6539e8a2-eb18-46a5-abaa-5e7a6e5ae947',
    name: 'MET-GLIM',
    price: 48125,
  },
  {
    id: 'd37d1aba-5c61-4352-a37b-20d77088f200',
    name: 'Hobetic',
    price: 6968,
  },
  {
    id: 'fffee206-609d-4d18-ad90-aeaf6e1741e9',
    name: 'Clofenac SR',
    price: 5230,
  },
  {
    id: 'ffe3dd4e-b9ff-4baf-b0de-07116e890389',
    name: 'Clofenac 50',
    price: 2062,
  }
]

const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    company: 'Antidote ltd',
    address: '35 Hartigan street, Belgravia'
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    company: 'Antidote ltd',
    address: '35 Hartigan street, Belgravia'
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    company: 'Antidote ltd',
    address: '35 Hartigan street, Belgravia'
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    company: 'Antidote ltd',
    address: '35 Hartigan street, Belgravia'
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    company: 'Antidote ltd',
    address: '35 Hartigan street, Belgravia'
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    company: 'Antidote ltd',
    address: '35 Hartigan street, Belgravia'
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    company: 'Antidote ltd',
    address: '35 Hartigan street, Belgravia'
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    company: 'Antidote ltd',
    address: '35 Hartigan street, Belgravia'
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    company: 'Antidote ltd',
    address: '35 Hartigan street, Belgravia'
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    company: 'Antidote ltd',
    address: '35 Hartigan street, Belgravia'
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    status: 'pending',
    date: '2022-12-06',
    items: [{ name: "Clamide", unit: 1, price: 3421 }, { name: "Clofenac 50", unit: 5, price: 2062 }],
    total: 5483
  },
  {
    customer_id: customers[1].id,
    status: 'pending',
    date: '2022-11-14',
    items: [{ name: "Diabetmin 500", unit: 3, price: 8712 }, { name: "Coloseal", unit: 2, price: 4718 }],
    total: 13430
  },
  {
    customer_id: customers[4].id,
    status: 'paid',
    date: '2022-10-29',
    items: [{ name: "Famotab 40mg", unit: 10, price: 12320 }, { name: "Hovimax 250mg", unit: 20, price: 139360 }],
    total: 151680
  },
  {
    customer_id: customers[3].id,
    status: 'paid',
    date: '2023-09-10',
    items: [{ name: "MET-GLIM", unit: 8, price: 385000 }, { name: "Omezole 20mg", unit: 7, price: 21868 }],
    total: 406868
  },
  {
    customer_id: customers[5].id,
    status: 'pending',
    date: '2023-08-05',
    items: [{ name: "Hobetic", unit: 8, price: 55744 }, { name: "Flovid 200mg", unit: 7, price: 8624 }],
    total: 64368
  },
  {
    customer_id: customers[7].id,
    status: 'pending',
    date: '2023-07-16',
    items: [{ name: "Omezole 20mg", unit: 412496, price: 385000 }, { name: "Clofenac 50", unit: 3, price: 6186 }],
    total: 18682
  },
  {
    customer_id: customers[6].id,
    status: 'pending',
    date: '2023-06-27',
    items: [{ name: "MET-GLIM", unit: 8, price: 385000 }, { name: "Omezole 20mg", unit: 7, price: 21868 }],
    total: 406868
  },
  {
    customer_id: customers[3].id,
    status: 'paid',
    date: '2023-06-09',
    items: [{ name: "MET-GLIM", unit: 8, price: 385000 }, { name: "Diabetmin 500", unit: 2, price: 37821}],
    total: 474902
  },
  {
    customer_id: customers[4].id,
    status: 'paid',
    date: '2023-06-17',
    items: [{ name: "Doxycap 100mg", unit: 10, price: 40640 }, { name: "Omezole 20mg", unit: 7, price: 21868 }],
    total: 706868
  },
  {
    customer_id: customers[5].id,
    status: 'paid',
    date: '2023-06-07',
    items: [{ name: "Clofenac 50", unit: 3, price: 6186 }, { name: "Clofenac SR", unit: 5, price: 26520 }],
    total: 85620
  },
  {
    customer_id: customers[1].id,
    status: 'paid',
    date: '2023-08-19',
    items: [{ name: "Coloseal", unit: 8, price: 385000 }, { name: "Clamide", unit: 7, price: 21868 }],
    total: 406868
  },
  {
    customer_id: customers[5].id,
    status: 'paid',
    date: '2023-06-03',
    items: [{ name: "MET-GLIM", unit: 1, price: 48125 }, { name: "Hovimax 250mg", unit: 7, price: 13860 }],
    total: 61745
  },
  {
    customer_id: customers[2].id,
    status: 'paid',
    date: '2023-06-18',
    items: [{ name: "Hobetic", unit: 2, price: 2745 }, { name: "Omezole 20mg", unit: 10, price: 69680 }],
    total: 76840
  },
  {
    customer_id: customers[0].id,
    status: 'paid',
    date: '2023-10-04',
    items: [{ name: "Flovid 200mg", unit: 8, price: 385000 }, { name: "Doxycap 100mg", unit: 7, price: 21868 }],
    total: 406868
  },
  {
    customer_id: customers[2].id,
    status: 'paid',
    date: '2022-06-05',
    items: [{ name: "Clamide", unit: 10, price: 34210 }, { name: "Diabetmin 500", unit: 10, price: 29040 }],
    total: 63728
  },
];

// const reciepts = [
//   {
//     customer_id: customers[0].id,
//     date: '2022-12-06',
//     items: [{ name: "Clamide", unit: 1, price: 3421 }, { name: "Clofenac 50", unit: 5, price: 2062 }],
//     total: 5483
//   },
//   {
//     customer_id: customers[1].id,
//     date: '2022-11-14',
//     items: [{ name: "Diabetmin 500", unit: 3, price: 8712 }, { name: "Coloseal", unit: 2, price: 4718 }],
//     total: 13430
//   },
//   {
//     customer_id: customers[4].id,
//     date: '2022-10-29',
//     items: [{ name: "Famotab 40mg", unit: 10, price: 12320 }, { name: "Hovimax 250mg", unit: 20, price: 139360 }],
//     total: 151680
//   },
//   {
//     customer_id: customers[3].id,
//     date: '2023-09-10',
//     items: [{ name: "MET-GLIM", unit: 8, price: 385000 }, { name: "Omezole 20mg", unit: 7, price: 21868 }],
//     total: 406868
//   },
//   {
//     customer_id: customers[5].id,
//     date: '2023-08-05',
//     items: [{ name: "Hobetic", unit: 8, price: 55744 }, { name: "Flovid 200mg", unit: 7, price: 8624 }],
//     total: 64368
//   },
//   {
//     customer_id: customers[7].id,
//     date: '2023-07-16',
//     items: [{ name: "Omezole 20mg", unit: 412496, price: 385000 }, { name: "Clofenac 50", unit: 3, price: 6186 }],
//     total: 18682
//   }
// ];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

module.exports = {
  users,
  customers,
  invoices,
  revenue,
  products,
};
