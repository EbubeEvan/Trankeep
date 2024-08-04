import { FAQs } from "./data"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@app/ui/landing/accordion"

const FAQ = () => {
  return (
    <section className='mt-10  pt-[1rem] md:pt-[5rem] pb-[5rem] md:pl-[2rem]'>
      <div className="flex flex-col md:flex-row gap-y-[4rem] gap-x-[10%]">
        <div className="w-full md:w-[40%]">
          <p className='text-sm text-blue-700 font-bold'>Support</p>
          <h3 className='text-gray-800 text-3xl font-bold mt-[1.3rem] mb-[1.3rem]'>FAQs</h3>
          <p className='text-gray-500'>Everything you need to know about the product<br/> and billing. Can&apos;t find the answer you&apos;re looking<br/> for? Please chat to our friendly team.</p>
        </div>
        <div className="w-full md:w-[50%]">
          <Accordion type="single" collapsible className="custom:w-[35rem] w-full">
            {FAQs.map((faq, index) => (
              <div key={index}>
                <AccordionItem value={`item-${index}`} >
                  <AccordionTrigger className="text-gray-600">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

export default FAQ