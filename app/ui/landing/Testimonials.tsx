import Image from "next/image";
import { stars } from "./data";

const Testimonials = () => {
  return (
    <section className="p-[2rem] mt-[4rem]">
      <div className="flex flex-col md:flex-row gap-y-[8rem] max-[280px]:gap-y-[7rem] gap-x-[6rem]">
        <div className="md:pr-[4rem]">
          <div className="flex mb-[2rem]">
            {stars.map((star, index) => (
              <Image
                src={star}
                alt="rating"
                width={15}
                height={15}
                key={index}
              />
            ))}
          </div>
          <p className="text-xl md:text-3xl font-bold mb-[2rem] text-gray-900">
            Trankeep has optimized our processes,
            <br />  reducing the risk of mistakes 
            <br /> and ensuring financial accuracy.
          </p>
          <div className="flex max-w-[30rem] h-10">
            <Image
              src="/landing/Avatar (2).png"
              alt="avatar"
              width={30}
              height={30}
            />
            <div className="ml-2">
              <p className="text-gray-900 font-bold">Chidinma Okonkwo</p>
              <p>Store Manager, LifeSecure</p>
            </div>
            <div className="flex gap-5 md:gap-10 mt-4 ml-[5rem]">
              <Image
                src="/landing/arrow-left.svg"
                alt="arrow-left"
                width={20}
                height={20}
              />
              <Image
                src="/landing/arrow-right.svg"
                alt="arrow-left"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
        <div className="max-w-[20rem]">
          <Image src='/landing/businesswoman.png' alt="businesswoman" width={500} height={500}/>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
