import React from "react";
import Link from "next/link";

const MenuOverlay = () => {
  return (
    <div className="px-10 py-2 grid grid-cols-2 text-sm mt-[-1rem] rounded-md">
      <div className="flex flex-col mt-4 gap-4 mb-2">
        <Link href="/login" className="text-white">
        Login
        </Link>
        <Link href="/signup" className="text-white">
        Sign up 
        </Link>
      </div>
    </div>
  );
};

export default MenuOverlay;
