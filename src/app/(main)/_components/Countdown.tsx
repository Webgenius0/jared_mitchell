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
      setTotalSeconds(prev => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [initialTotalSeconds]);

  const Item = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col gap-3 items-center">
      <div className="bg-white custom_border custom_shadow rounded-[10px] px-4 py-2.5 text-primary-blue text-lg md:text-2xl text-center">
        {String(value).padStart(2, "0")}
      </div>
      <span className="max-sm:text-sm text-[#62748E] text-center">{label}</span>
    </div>
  );

  return (
    <section className="section">
      <Container>
        <div className="w-full bg-primary-gray rounded-[20px] py-10 text-center custom_border">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold md:font-bold text-primary-black mb-6 md:mb-8">
            {data?.season?.title ||
              "Next Boss Beginnings – Westside Beauty Lounge"}
          </h2>

          <div className="flex justify-center gap-2 md:gap-4 mb-7">
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
