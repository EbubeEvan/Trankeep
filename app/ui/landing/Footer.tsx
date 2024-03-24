import Image from "next/image";
import Link from "next/link";
import { footerhead, footerLinks } from "./data";
import Copyright from "./Copyright";
const Footer = () => {
  return (
    <footer className="pb-[2rem] md:pb-0 md:pl-[2rem]">
      <div className="flex flex-col gap-y-[2rem] md:flex-row justify-center">
        <div className="text-sm text-gray-600">
          <div className="flex gap-2 ml-5">
            <Image
              src="/logo.svg"
              alt="logo"
              width={20}
              height={20}
            />
            <p className="text-gray-900 font-bold text-lg">Trankeep</p>
          </div>
          <p className="mt-[1rem]">
            Trankeep is your gateway to effortless
            <br />
            buisness management. Join us and
            <br /> supercharge your transactions.
          </p>
        </div>
        <div className="text-sm text-gray-500 max-w-[60rem] md:ml-[4rem]">
          <div className="grid grid-cols-4 mb-[1rem] md:gap-x-[4rem]">
            {footerhead.map((footer, index) => (
              <p key={index}>{footer}</p>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-y-[1rem] md:gap-x-[4rem] font-bold">
            {footerLinks.map((footer, index) => (
              <Link href="/" key={index}>
                {footer}
              </Link>
            ))}
          </div>
        </div> 
      </div>
      <Copyright />
    </footer>
  );
};

export default Footer;
