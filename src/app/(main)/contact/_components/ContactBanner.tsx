import contactBg from "@/Assets/contact.png";

const ContactBanner = () => {
  return (
    <section
      style={{
        backgroundImage: `
          linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2)),
          url(${contactBg.src})
        `,
      }}
      className="min-h-[260px] md:min-h-[300px] h-[340px] md:h-[380px] lg:h-[420px] xl:h-[500px] bg-no-repeat bg-center bg-cover"
    >
      <div className="container mx-auto h-full flex flex-col items-center justify-center px-5 sm:px-8 lg:px-12">
        <h2 className="max-w-[1000px] text-center text-[22px] leading-[1.15] font-bold text-white sm:text-[28px] md:text-[34px] lg:text-[42px] xl:text-[70px]">
          We're Here To Support You.
        </h2>

        <p className="max-w-[1100px] text-center pt-2 md:pt-3 text-[11px] sm:text-[13px] md:text-[15px] lg:text-[17px] xl:text-[26px] leading-[1.5] text-[#F5F5F7]">
          Whether you're reaching out for support, partnership opportunities,
          sponsorship interest, or general questions — OSI is committed to
          providing fast, reliable assistance.
        </p>
      </div>
    </section>
  );
};

export default ContactBanner;
