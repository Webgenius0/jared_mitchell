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
      className="min-h-[300px] md:min-h-[350px] h-[400px] md:h-[450px] lg:h-[500px] bg-no-repeat bg-center bg-cover"
    >
      <div className="container mx-auto h-full flex flex-col items-center justify-center px-5 sm:px-8 lg:px-12">
        <h2 className="max-w-[1000px] text-center text-[28px] leading-[1.15] font-bold text-white sm:text-[36px] md:text-[42px] lg:text-[50px] xl:text-[70px]">
          We're Here To Support You.
        </h2>

        <p className="max-w-[1100px] text-center pt-3 md:pt-4 text-[13px] sm:text-[15px] md:text-[17px] lg:text-[20px] xl:text-[26px] leading-[1.5] text-[#F5F5F7]">
          Whether you're reaching out for support, partnership opportunities,
          sponsorship interest, or general questions — OSI is committed to
          providing fast, reliable assistance.
        </p>
      </div>
    </section>
  );
};

export default ContactBanner;
