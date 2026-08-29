"use client";
import { useEffect, useState } from "react";
import { RoundCountdownResponse } from "@/Types/cms";
import Container from "@/Components/Common/Container";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const deriveTimeLeft = (totalSeconds: number): TimeLeft => {
  const total = Math.max(totalSeconds, 0);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return { days, hours, minutes, seconds };
};

interface CountdownProps {
  data?: RoundCountdownResponse | null;
}

export default function Countdown({ data }: CountdownProps) {
  const initialTotalSeconds = data?.countdown?.total_seconds ?? 0;

  const [totalSeconds, setTotalSeconds] = useState(initialTotalSeconds);

  const timeLeft = deriveTimeLeft(totalSeconds);

  useEffect(() => {
    // Reset when API data changes
    setTotalSeconds(initialTotalSeconds);
  }, [initialTotalSeconds]);

  useEffect(() => {
    if (initialTotalSeconds <= 0) return;
    const timer = setInterval(() => {
      setTotalSeconds((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [initialTotalSeconds]);

  const Item = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col gap-2 md:gap-2.5 lg:gap-3 items-center">
      <div className="bg-white custom_border custom_shadow px-3 md:px-3.5 lg:px-4 py-2 md:py-2 lg:py-2.5 text-primary-blue text-base md:text-lg lg:text-xl xl:text-2xl text-center">
        {String(value).padStart(2, "0")}
      </div>
      <span className="max-sm:text-sm text-[#62748E] text-center">{label}</span>
    </div>
  );

  return (
    <section className="section">
      <Container>
        <div className="w-full bg-primary-gray py-7 md:py-8 lg:py-10 text-center custom_border">
          <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold md:font-bold text-primary-black mb-5 md:mb-6 lg:mb-8">
            {data?.season?.title ||
              "Next OSI Top Business Award – Westside Beauty Lounge"}
          </h2>

          <div className="flex justify-center gap-1.5 md:gap-2.5 lg:gap-3 xl:gap-4 mb-5 md:mb-6 lg:mb-7">
            <Item value={timeLeft.days} label="Days" />
            <span className="text-blue-500 text-xl font-bold mt-2">:</span>
            <Item value={timeLeft.hours} label="Hours" />
            <span className="text-blue-500 text-xl font-bold mt-2">:</span>
            <Item value={timeLeft.minutes} label="Min" />
            <span className="text-blue-500 text-xl font-bold mt-2">:</span>
            <Item value={timeLeft.seconds} label="Sec" />
          </div>

          {/* <Button>
            Get Tickets
            <BsArrowRight />
          </Button> */}
        </div>
      </Container>
    </section>
  );
}
