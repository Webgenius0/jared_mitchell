import { testimonials } from "@/Components/Data/data";
import { QuoteSvg } from "@/Components/Svg/SvgContainer";
import { FaStar } from "react-icons/fa";

export default function Testimonials() {
  return (
    <section className="section container">
      <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
        What Our Members Are Saying
      </h2>

      <div className="grid gap-4 xl:gap-6 md:grid-cols-2 mt-10">
        {testimonials.map(testimonial => (
          <div
            key={testimonial.id}
            className="bg-white rounded-2xl custom_border custom_shadow p-5 xl:p-6 space-y-4"
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <FaStar key={i} className="size-5 text-yellow-400" />
              ))}
              {Array.from({ length: 5 - testimonial.rating }).map((_, i) => (
                <FaStar key={i} className="size-5 text-gray-300" />
              ))}
            </div>

            <div className="flex gap-1 border-b border-gray-200 pb-2 md:pb-4">
              <QuoteSvg />
              <p className="text-lg md:text-xl xl:text-2xl text-primary-black mt-2">
                {testimonial.quote}
              </p>
            </div>

            <div>
              <p className="font-semibold text-primary-black text-lg md:text-xl">
                {testimonial.name}
              </p>
              <p className="text-sm text-primary-blue">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
