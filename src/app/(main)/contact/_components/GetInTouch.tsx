"use client";

import { Button } from "@/Components/Common/Button";
import Container from "@/Components/Common/Container";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { LuSend, LuUpload } from "react-icons/lu";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";

const GetInTouch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const axiosPublic = useAxiosPublic();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const file = formData.get("file") as File;
    if (file && file.size === 0) {
      formData.delete("file");
    }

    setIsLoading(true);
    try {
      const res = await axiosPublic.post("/v1/contact", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success(
          res.data.message || "Your message has been sent successfully.",
        );
        form.reset();
        setFileName(null);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error: any) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section">
      <Container>
        <h2 className="section_title ">Get In Touch</h2>
        {/* <h2 className="section_title 2xl:!text-[70px]">Get In Touch</h2> */}
        <p className="section_sub_title">
          For general questions about OSI, event information, partnerships,
          media inquiries, technical assistance, or billing concerns — use the
          form below. Our team typically responds within 24–48 hours.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 md:mt-8 lg:mt-12 xl:mt-[120px]">
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 lg:gap-5 xl:gap-6">
              <div className="space-y-3 md:space-y-[18px] w-full">
                <div className="text-primary-black text-base md:text-lg lg:text-xl xl:text-2xl">First Name*</div>
                <input
                  type="text"
                  name="first_name"
                  required
                  placeholder="John"
                  className="px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full bg-[#F5F5F7] border border-[#00000029] text-sm sm:text-base lg:text-xl text-[#99A1AF] w-full"
                />
              </div>
              <div className="space-y-3 md:space-y-[18px] w-full">
                <div className="text-primary-black text-base md:text-lg lg:text-xl xl:text-2xl">Last Name *</div>
                <input
                  type="text"
                  name="last_name"
                  required
                  placeholder="Doe"
                  className="px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full bg-[#F5F5F7] border border-[#00000029] text-sm sm:text-base lg:text-xl text-[#99A1AF] w-full"
                />
              </div>
            </div>              <div className="space-y-3 md:space-y-[18px]">
              <div className="text-primary-black text-base md:text-lg lg:text-xl xl:text-2xl">Email Address *</div>
              <input
                type="email"
                name="email"
                required
                placeholder="Type your email..."
                className="px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full bg-[#F5F5F7] border border-[#00000029] text-sm sm:text-base lg:text-xl text-[#99A1AF] w-full"
              />
            </div>              <div className="space-y-3 md:space-y-[18px]">
              <div className="text-primary-black text-base md:text-lg lg:text-xl xl:text-2xl">Subject *</div>
              <select
                name="subject"
                required
                defaultValue=""
                className="px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full bg-[#F5F5F7] border border-[#00000029] text-sm sm:text-base lg:text-xl text-[#99A1AF] w-full"
              >
                <option disabled value="">
                  Select a subject
                </option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Event Information">Event Information</option>
                <option value="Partnerships">Partnerships</option>
                <option value="Media Inquiries">Media Inquiries</option>
                <option value="Technical Assistance">
                  Technical Assistance
                </option>
                <option value="Billing Concerns">Billing Concerns</option>
              </select>
            </div>              <div className="space-y-3 md:space-y-[18px]">
              <div className="text-primary-black text-base md:text-lg lg:text-xl xl:text-2xl">Message *</div>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell us how we can help..."
                className="px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-lg bg-[#F5F5F7] border border-[#00000029] text-sm sm:text-base lg:text-xl text-[#99A1AF] w-full"
              ></textarea>
            </div>              <div className="space-y-3 md:space-y-[18px]">
              <div className="text-primary-black text-base md:text-lg lg:text-xl xl:text-2xl">
                Optional Upload (Screenshots or Files)
              </div>
              <label className="px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full flex items-center justify-center cursor-pointer gap-2 bg-white border border-[#00000029] text-sm sm:text-base lg:text-xl text-[#364153] w-full hover:bg-gray-50 transition-colors">
                <input
                  type="file"
                  name="file"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    setFileName(file ? file.name : null);
                  }}
                />
                <LuUpload className="text-[#99A1AF]" />
                {fileName ? (
                  <span className="text-[#364153] truncate max-w-[80%]">
                    {fileName}
                  </span>
                ) : (
                  "Click to upload file"
                )}
              </label>
            </div>
          </div>
          <div className="mt-[40px]">
            <Button disabled={isLoading} className="w-full">
              {isLoading ? (
                "Sending..."
              ) : (
                <>
                  <LuSend className="text-xl" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </form>
      </Container>
    </section>
  );
};

export default GetInTouch;
