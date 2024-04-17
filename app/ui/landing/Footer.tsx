import Image from "next/image";
import Link from "next/link";
import { footer1, footer2, footer3, footer4 } from "./data";
import Copyright from "./Copyright";
const Footer = () => {
  return (
    <footer className="pb-[2rem] md:pb-0 md:pl-[2rem]">
      <div className="flex flex-col gap-y-[2rem] gap-x-[10%] md:flex-row">
        <div className="text-sm text-gray-600 mt-[-2rem] mb-[2rem] md:mt-0 md:mb-0 w-full md:w-[30%]">
          <div className="flex gap-2 ml-5">
            <Image src="/logo.svg" alt="logo" width={20} height={20} />
            <p className="text-gray-900 font-bold text-lg">Trankeep</p>
          </div>
          <p className="mt-[1rem] leading-7">
            Trankeep is your gateway to effortless
            <br />
            buisness management. Join us and
            <br /> supercharge your transactions.
          </p>
        </div>
        <div className="text-sm text-gray-500 w-full md:w-[60%] md:ml-[4rem] grid grid-cols-2 md:grid-cols-4 gap-x-16 gap-y-10">
          <div className="flex flex-col gap-5 font-bold">
            {footer1.map((footer, index) => (
              <Link href="/" key={index}>{footer}</Link>
            ))}
          </div>
          <div className="flex flex-col gap-5 font-bold">
            {footer2.map((footer, index) => (
              <Link href="/" key={index}>{footer}</Link>
            ))}
          </div>
          <div className="flex flex-col gap-5 font-bold">
            {footer3.map((footer, index) => (
              <Link href="/" key={index}>{footer}</Link>
            ))}
          </div>
          <div className="flex flex-col gap-5 font-bold">
            {footer4.map((footer, index) => (
              <Link href="/" key={index}>{footer}</Link>
            ))}
          </div>
        </div>
      </div>
      <Copyright />
    </footer>
  );
};

export default Footer;
