"use client";

import { PlusIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { addProduct } from "@app/lib/actions";
import { useFormState } from "react-dom";

const NewProductForm = () => {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(addProduct, initialState);

  return (
    <div className="my-[2rem] pl-3">
      <form action={dispatch}>
        <div className="flex gap-x-[5rem] gap-y-[2rem] flex-col lg:flex-row">
          <div className="flex flex-col lg:flex-row">
            <label htmlFor="name" className="lg:mr-5">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Product name"
              className="peer w-full
             lg:w-[13rem] max-lg:mt-3 max-lg:ml-[-0.5rem] rounded-lg border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:ml-[-3rem]">
            <label htmlFor="price" className="mr-5 max-lg:mr-7">
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="peer w-full lg:w-[10rem] max-lg:ml-[-0.5rem] max-lg:mt-3 rounded-lg border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <CurrencyDollarIcon className="pointer-events-none relative lg:right-[9.5rem] top-[-1.3rem] lg:top-[1.2rem] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <Button />
        </div>
      </form>
    </div>
  );
};

export default NewProductForm;

const Button = () => {
  return (
    <button className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 max-lg:justify-center lg:ml-[-4rem]">
      <span className="max-lg:mr-[1rem]">Add Product</span>{" "}
      <PlusIcon className="h-5 lg:ml-4" />
    </button>
  );
};
