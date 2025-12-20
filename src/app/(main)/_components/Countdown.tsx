'use client';

import { Button } from '@/Components/Common/Button';
import Container from '@/Components/Common/Container';
import { useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

const getTimeLeft = (targetDate: Date): TimeLeft => {
    const total = targetDate.getTime() - new Date().getTime();

    const seconds = Math.max(Math.floor((total / 1000) % 60), 0);
    const minutes = Math.max(Math.floor((total / 1000 / 60) % 60), 0);
    const hours = Math.max(Math.floor((total / (1000 * 60 * 60)) % 24), 0);
    const days = Math.max(Math.floor(total / (1000 * 60 * 60 * 24)), 0);

    return { days, hours, minutes, seconds };
};

export default function Countdown() {
    const targetDate = new Date('2025-01-01T00:00:00');

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(
        getTimeLeft(targetDate)
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const Item = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col gap-3 items-center">
            <div className="bg-white custom_border custom_shadow rounded-[10px] px-4 py-2.5 text-primary-blue text-lg md:text-2xl text-center">
                {String(value).padStart(2, '0')}
            </div>
            <span className="max-sm:text-sm text-[#62748E] text-center">{label}</span>
        </div>
    );

    return (
        <section className='section'>
            <Container>
                <div className="w-full bg-primary-gray rounded-[20px] py-10 text-center custom_border">
                    <h2 className="text-3xl font-semibold md:font-bold text-primary-black mb-6 md:mb-8">
                        Next Boss Beginnings – Westside Beauty Lounge
                    </h2>

                    <div className="flex justify-center gap-4 mb-7">
                        <Item value={timeLeft.days} label="Days" />
                        <span className="text-blue-500 text-xl font-bold mt-2">:</span>
                        <Item value={timeLeft.hours} label="Hours" />
                        <span className="text-blue-500 text-xl font-bold mt-2">:</span>
                        <Item value={timeLeft.minutes} label="Min" />
                        <span className="text-blue-500 text-xl font-bold mt-2">:</span>
                        <Item value={timeLeft.seconds} label="Sec" />
                    </div>

                    <Button>
                        Get Tickets
                        <BsArrowRight />
                    </Button>
                </div>
            </Container>
        </section>
    );
}
