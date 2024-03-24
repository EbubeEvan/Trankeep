import { featureSet } from "./data";
import Image from "next/image";

const Features = () => {
  return (
    <section className="md:p-[2rem]">
      <div className="flex flex-col md:flex-row gap-x-[5rem] gap-y-[2rem]">
        <div>
          <div>
            {/* <p className="text-blue-700 text-sm font-bold">
              The ClearLink Advantage
            </p> */}
            <h2 className="text-gray-800 text-3xl font-bold mt-[1rem] mb-[1rem]">
              Why choose Trankeep?
            </h2>
            <p className="text-gray-500 mb-[5rem]">
              Trankeep offers increased effieciency <br />
              and improves organization
              <br /> Through these features:
            </p>
          </div>
          <div className="max-w-[40rem] grid md:grid-cols-2 gap-y-[2rem] gap-x-[1.5rem]">
            {featureSet.map((feature, index) => (
              <article key={index} className="md:max-w-[20rem]">
                <feature.icon className="mb-[2rem] w-5 h-5" />
                <h3 className="font-bold text-lg mb-[0.7rem] text-gray-900">
                  {feature.heading}
                </h3>
                <p className="text-gray-600">{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="md:mt-[12rem] md:ml-5 mt-10">
          <Image
            src="/landing/dashboardPic.png"
            alt="image of dashboard"
            width={600}
            height={600}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
