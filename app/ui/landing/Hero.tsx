"use client";

import Image from "next/image";


const Hero = () => {
  return (
    <section className="w-full h-full pt-[5rem] mb:pt-[2rem] pb-[5rem]">
      <div className="flex flex-col md:flex-row md:gap-[10%]">
        <div className="lg:mt-[5rem] w-full md:w-[45%]">
          <h1 className="text-gray-800 text-3xl md:text-[3rem] font-bold leading-[2rem] md:leading-[3.5rem]">
            Business Management <br /> Platform
          </h1>
          <p className="mt-[1rem] text-xl text-gray-500">
            Streamline buisness transactions with Trankeep
          </p>
        </div>
        <div className="md:ml-[5rem] mt-10 w-full md:w-[45%]">
          <Image src='/landing/business.avif' className="rounded-md" alt="hero-image of dashboard" width={800} height={1000}/>
        </div>
      </div>
    </section>
  );
};

export default Hero;
