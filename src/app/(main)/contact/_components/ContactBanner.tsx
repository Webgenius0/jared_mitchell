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
      className="h-[500px] bg-no-repeat bg-center bg-cover"
    >
      <div className="h-full container flex flex-col items-center justify-center">
        <h2 className="text-[70px] font-bold text-white">
          We're Here To Support You.
        </h2>

        <p className="text-[#F5F5F7] text-[26px] text-center pt-5">
          Whether you're reaching out for support, partnership opportunities,
          sponsorship interest, or general questions — OSI is committed to
          providing fast, reliable assistance.
        </p>
      </div>
    </section>
  );
};

export default ContactBanner;
