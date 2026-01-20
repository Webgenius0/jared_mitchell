"use client";
import Container from "@/Components/Common/Container";
import { faqs } from "@/Components/Data/data";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const FAQAccordion = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="section">
      <Container className="!max-w-[1333px]">
        <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 md:space-y-7 mt-10">
          {faqs.map(faq => (
            <div
              key={faq.id}
              className="bg-white rounded-[14px] custom_shadow custom_border"
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between p-4 md:p-6 text-left"
              >
                <span className="text-xl text-gray-900">{faq.question}</span>
                <IoIosArrowDown
                  className={`size-7 text-primary-blue transition-transform duration-300 ${
                    openId === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openId === faq.id && (
                <div className="px-4 pb-4 text-lg text-gray-600">
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
