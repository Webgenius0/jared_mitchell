import { Button } from '@/Components/Common/Button'
import { upcomingEvents } from '@/Components/Data/data'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import { FaRegHeart } from 'react-icons/fa6'
import { FiBookmark } from 'react-icons/fi'
import { GrLocation } from 'react-icons/gr'
import { PiCalendarBlank } from 'react-icons/pi'
import { RxShare1 } from 'react-icons/rx'

const UpcomingEvents = () => {
    return (
        <section className='section'>
            <h2 className='section_title 2xl:text-7xl 2xl:font-bold'>Upcoming Events</h2>
            <div className='my-10'>
            <Marquee pauseOnHover>
                {upcomingEvents?.map((data) => (
                    <div key={data.id} className="w-[500px] rounded-[20px] bg-white custom_shadow custom_border overflow-hidden mx-3">
                        <div className='relative w-full' >
                            <div className="absolute size-full bg-[linear-gradient(0deg,_rgba(0,0,0,0.5)_0%,_rgba(0,0,0,0.5)_100%)]" />
                            <Image
                                src={data.image}
                                width={500}
                                height={300}
                                alt="Artist painting"
                                className="object-cover w-full h-[300px]"
                            />
                        </div>
                        <div className="py-7 px-5">
                            <h2 className="text-2xl text-primary-black font-semibold">
                                {data.title}
                            </h2>
                            <p className='text-xl text-primary-black flex items-center gap-2 mt-2'>
                                <PiCalendarBlank className='text-primary-blue' />
                                {data.date}
                            </p>
                            <p className='text-xl text-primary-black flex items-center gap-2 mt-2'>
                                <GrLocation className='text-primary-blue' />
                                {data.location}
                            </p>
                            <div className="pb-4 my-4 border-b border-gray-200 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center justify-center size-[30px] aspect-square rounded-full bg-white custom_shadow custom_border">
                                            <FaRegHeart className="size-[18px] text-primary-black" />
                                        </div>
                                        <span className="text-secondary-black text-xl">1,204</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center justify-center size-[30px] aspect-square rounded-full bg-white custom_shadow custom_border">
                                            <FiBookmark className="size-[18px] text-primary-black" />
                                        </div>
                                        <span className="text-secondary-black text-xl">Save</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center justify-center size-[30px] aspect-square rounded-full bg-white custom_shadow custom_border">
                                            <RxShare1 className="size-[18px] text-primary-black" />
                                        </div>
                                        <span className="text-secondary-black text-xl">Share</span>
                                    </div>
                                </div>
                            </div>
                            <Button size={"lg"}>
                                View Event Details
                            </Button>
                        </div>
                    </div>
                ))}
            </Marquee>
            </div>
        </section>
    )
}

export default UpcomingEvents
