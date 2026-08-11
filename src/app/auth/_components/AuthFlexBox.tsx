import Image from "next/image";
import { ReactNode } from "react";

const AuthFlexBox = ({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <section className="w-full min-h-screen flex items-center justify-between container px-5 lg:px-10 mx-auto">
      <div className="py-3 md:py-5 w-full flex items-center gap-5 lg:gap-10 2xl:gap-20 h-full">
        <figure className="hidden lg:block w-[500px] xl:w-[600px] 2xl:w-[762px] h-[650px] xl:h-[820px] shrink-0 rounded-[32px] overflow-hidden relative">
          <div className="bg-[#00000099] size-full absolute flex flex-col justify-center px-9 text-white">
            <h5 className="text-4xl xl:text-[60px] font-medium mb-2">
              {title}
            </h5>
            <p className="xl:text-xl tracking-wide capitalize">{description}</p>
          </div>

          <Image
            src="https://i.ibb.co.com/84gNb7Wc/photo-1541976844346-f18aeac57b06.jpg"
            width={762}
            height={981}
            alt=""
            className="size-full object-cover h-screen"
          />
        </figure>

        <div className="flex-1 w-full flex flex-col relative justify-center">
          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthFlexBox;
