"use client";
import Container from "@/Components/Common/Container";
import { faqs as defaultFaqs } from "@/Components/Data/data";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { CMSFAQ } from "@/Types/cms";

const FAQAccordion = ({ data: cmsData }: { data?: CMSFAQ[] }) => {
  const items = cmsData || defaultFaqs;
  const [openId, setOpenId] = useState<number | null>(items[0]?.id || 1);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="section">
      <Container className="!max-w-[1333px]">
        <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3 md:space-y-4 lg:space-y-5 xl:space-y-7 mt-6 md:mt-8 lg:mt-10">
          {items.map(faq => (
            <div
              key={faq.id}
              className="bg-white rounded-[14px] custom_shadow custom_border"
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between p-3 md:p-4 lg:p-5 xl:p-6 text-left"
              >
                <span className="text-base md:text-lg lg:text-xl text-gray-900">{faq.question}</span>
                <IoIosArrowDown
                  className={`size-7 text-primary-blue transition-transform duration-300 ${
                    openId === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openId === faq.id && (
                <div className="px-3 pb-3 md:px-4 md:pb-4 lg:px-6 lg:pb-6 text-sm md:text-base lg:text-lg text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FAQAccordion;
