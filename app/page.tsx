import Header from "./ui/landing/Header";
import Hero from "./ui/landing/Hero";
import Features from "./ui/landing/Features";
import Testimonials from "./ui/landing/Testimonials";
import FAQ from "./ui/landing/FAQ";
import Footer from "./ui/landing/Footer";

const Page = () => {
  return (
    <div className="pt-[2rem] pl-[2rem] pr-[2rem] pb-0 md:p-[6rem]">
      <Header />
      <main>
        <Hero/>
        <Features/>
        <Testimonials/>
        <FAQ/>
      </main>
      <Footer/>
    </div>
  );
};

export default Page;
