"use client";

import { CustomerField, Product } from "@/app/lib/definitions";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@app/ui/common/button";
import { createInvoice } from "@app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import { InputSet } from "@/app/lib/definitions";

const Form = ({
  customers,
  products,
}: {
  customers: CustomerField[];
  products: Product[];
}) => {
  const [inputSets, setInputSets] = useState<InputSet[]>([
    { name: "", unit: "", price: "" },
  ]);
  const [foundProduct, setFoundProduct] = useState<Product>({
    id: "",
    name: "",
    price: 0,
  });

  const handleInputChange = (
    index: number,
    field: keyof InputSet,
    value: string
  ) => {
    const updatedSets = [...inputSets];

    if (field === "name") {
      const selectedProduct = products.find(
        (product) => product.name === value
      );

      if (selectedProduct) {
        setFoundProduct(selectedProduct);
        updatedSets[index].price = selectedProduct.price.toString();
      }
      updatedSets[index][field] = value;
      
    } else if (field === "unit") {
      updatedSets[index][field] = value;

      if (value !== "") {
        const unitAsNumber = Number(value);

        if (!isNaN(unitAsNumber) && !isNaN(foundProduct.price)) {
          updatedSets[index].price = (
            foundProduct.price * unitAsNumber
          ).toString();
        }
      } else {
        updatedSets[index].price = foundProduct.price.toString();
      }
      console.log('updatedSets[index].price', updatedSets[index].price)

    } else {
      updatedSets[index][field] = value;
    }

    setInputSets(updatedSets);
  };

  const handleAddSet = () => {
    setInputSets([...inputSets, { name: "", unit: "", price: "" }]);
  };

  const handleRemoveSet = (index: number) => {
    const updatedSets = [...inputSets];
    updatedSets.splice(index, 1);
    setInputSets(updatedSets);
  };

  const totalPrice = inputSets.reduce((acc, inputSet) => {
    const priceAsNumber = Number(inputSet.price);
    if (!isNaN(priceAsNumber)) {
      acc += priceAsNumber;
    }
    return acc;
  }, 0);
  console.log('totalPrice', totalPrice);
  
  const productData : [InputSet[] , number] = [inputSets, totalPrice]
  console.log( 'productData', productData);
  

  const initialState = { message: null, errors: {} };
  const createInvoiceData = createInvoice.bind(null, productData)
  const [state, dispatch] = useFormState(createInvoiceData, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Product section */}
        <div className="my-[2rem] text-sm">
          <p className="mb-2">Choose Products</p>
          {inputSets.map((inputSet, index) => (
            <div key={index} className="flex flex-col lg:flex-row  gap-7 mb-4">
              <select
                id="customer"
                className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="customer-error"
                value={inputSet.name}
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
              >
                <option value="" disabled>
                  Select a product
                </option>
                {products.map((product) => (
                  <option key={product.id} value={product.name}>
                    {product.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Unit"
                className="peer block w-[5rem] rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                value={"" ? 1 : inputSet.unit}
                onChange={(e) =>
                  handleInputChange(index, "unit", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Price"
                className="peer block w-[10rem] rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                readOnly
                value={Number(inputSet.price) / 100}
                onChange={(e) =>
                  handleInputChange(index, "price", e.target.value)
                }
              />
              <CurrencyDollarIcon className="relative top-[-2.8rem] right-[-0.8rem] lg:top-[1.2rem] lg:right-[11rem] h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
              {inputSets.length > 1 && (
                <button
                  type="button"
                  className="bg-red-500 text-slate-100 rounded-md px-3"
                  onClick={() => handleRemoveSet(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="bg-green-500 text-slate-100 rounded-md px-3"
            onClick={handleAddSet}
          >
            Add
          </button>
        </div>

        {/* Total amount */}
        <div className="mb-[2rem] flex flex-col text-sm">
          <label htmlFor="total">Total Amount</label>
          <input
            type="number"
            readOnly
            className="peer block w-[10rem] rounded-md border border-gray-200 py-2 pl-10 mt-2 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={totalPrice / 100}
          />
          <CurrencyDollarIcon className="relative top-[-1.2rem] left-[0.8rem] h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white dark:text-gray-300"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors?.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.customerId &&
            state.errors.customerId.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {state.message}
              </p>
            ))}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <CreateButton />
      </div>
    </form>
  );
};

function CreateButton() {
  const { pending } = useFormStatus();

  return <Button aria-disabled={pending}>Create Invoice</Button>;
}

export default Form;
