'use client'
import { Button } from '@/Components/Common/Button'
import SponsorSlider from '@/Components/Common/SponsorSlider'
import { sponsorsData } from '@/Components/Data/data'
import { FaArrowRightLong } from 'react-icons/fa6'

const EventSponsors = () => {
    return (
        <section className='section'>
            <h2 className='section_title 2xl:text-7xl 2xl:font-bold'>Our Event Sponsors</h2>
            <div className='space-y-3 md:space-y-10 mt-6 md:mt-10'>
                <SponsorSlider logos={sponsorsData} />
                <SponsorSlider logos={sponsorsData} reverse={true} />
            </div>
        </section>
    )
}

export default EventSponsors
