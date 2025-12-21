import { successStories } from '@/Components/Data/data'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import { LuArrowRight } from 'react-icons/lu'

const CommunityAchievements = () => {
    return (
        <section className='section'>
            <h2 className='section_title 2xl:text-6xl 2xl:font-semibold'>Past Six Months Highlights</h2>
            <p className='section_sub_title'>Celebrating our community's achievements and creative milestones</p>
            <div className='my-6 md:my-12'>
                <Marquee pauseOnHover>
                    {successStories?.map((data, index) => (
                        <div key={data.id} className='relative flex items-center justify-center w-[500px] h-[300px] mx-3 my-1'>
                            <figure className='w-[500px] h-[300px]'>
                                <Image src={data.image} width={500} height={300} alt='image' className='size-full object-cover' />
                            </figure>
                            <div className='absolute top-0 left-0 size-full bg-[linear-gradient(0deg,_rgba(0,0,0,0.60)_36.37%,_rgba(0,0,0,0.20)_63.02%,_rgba(0,0,0,0.00)_100%)]'>
                                <div className='absolute top-4 left-4 inline bg-white py-1 px-3 rounded-full text-primary-black text-sm'>
                                    {data.category}
                                </div>
                                <div className='size-full flex gap-1.5 items-end px-4 pb-2'>
                                    <div className='space-y-1.5'>
                                        <h4 className='text-2xl font-semibold text-white'>{data.title}</h4>
                                        <p className='text-primary-gray tracking-wider'>{data.description}</p>
                                    </div>
                                    <div className='text-white flex items-center text-nowrap gap-2.5 tracking-wide'>
                                        View Spotlight
                                        <LuArrowRight />
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    )
}

export default CommunityAchievements
