"use client"
import { LogoSliderProps } from "@/Types/type"
import {cn} from '@/lib/utils'

const SponsorSlider = ({ logos, reverse = false }: LogoSliderProps) => {

    return (
        <div className={cn(reverse ? "reverse-marquee" : "marquee", "flex gap-6 md:gap-10 w-max my-5")}>
            {[...logos, ...logos].map((logo, index) => (
                <div key={index} className="flex items-center justify-center w-[332px] h-[158px] md:h-[200px] rounded-3xl border border-[#E5E7EB] bg-[#F9FAFB] shadow-[0_1.597px_4.79px_0_rgba(0,0,0,0.10),_0_1.597px_3.193px_-1.597px_rgba(0,0,0,0.10)]">
                    <logo.icon />
                </div>
            ))}
        </div>
    )
}

export default SponsorSlider
