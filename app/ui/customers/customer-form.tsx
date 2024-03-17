"use client";

import Link from "next/link";
import { AtSymbolIcon } from "@heroicons/react/24/outline";
import { Button } from "@app/ui/common/button";
import { addCustomer } from "@app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { useState, ChangeEvent } from "react";

const CustomerForm = () => {
  const [imageSrc, setImageSrc] = useState<string>("");

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === "string") {
          setImageSrc(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const initialState = { message: null, errors: {} };
  const addCustomerSrc = addCustomer.bind(null, imageSrc);
  const [state, dispatch] = useFormState(addCustomerSrc, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Enter full name"
              required
            />
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="email"
                type="email"
                placeholder="Enter email address"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <label className="mb-2 block text-sm font-medium">Upload Photo</label>
          <div className="rounded-md px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  type="file"
                  onChange={handleImageChange}
                  className=" border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                  accept="image/*"
                  aria-describedby="status-error"
                />
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-[5rem]">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <CustomerButton/>
      </div>
    </form>
  );
};

const CustomerButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 max-lg:justify-center lg:ml-[-4rem]" aria-disabled={pending}>
      Add Customer
    </Button>
  );
}

export default CustomerForm;
