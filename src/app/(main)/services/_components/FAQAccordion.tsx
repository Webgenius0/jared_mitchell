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

        <div className="space-y-2.5 md:space-y-3 lg:space-y-4 xl:space-y-7 mt-4 md:mt-5 lg:mt-7 2xl:px-5 3xl:px-5">
          {items.map(faq => (
            <div
              key={faq.id}
              className="bg-white rounded-[14px] custom_shadow custom_border"
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between p-2.5 md:p-3 lg:p-4 xl:p-6 text-left"
              >
                <span className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-900">{faq.question}</span>
                <IoIosArrowDown
                  className={`size-7 text-primary-blue transition-transform duration-300 ${
                    openId === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openId === faq.id && (
                <div className="px-2.5 pb-2.5 md:px-3 md:pb-3 lg:px-5 lg:pb-5 text-xs md:text-sm lg:text-base text-gray-600">
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
