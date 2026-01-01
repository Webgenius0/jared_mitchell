'use client'
import SponsorSlider from '@/Components/Common/SponsorSlider'
import { sponsorsData } from '@/Components/Data/data'

const PartnerWithBossBeginnings = () => {
    return (
        <section className='section'>
            <h2 className='section_title 2xl:!text-7xl 2xl:font-bold'>Partner With Boss Beginnings</h2>
            <p className='section_sub_title'>Support new entrepreneurs and gain visibility through our signature program.</p>
            <div className='space-y-3 md:space-y-10 mt-6 md:mt-10'>
                <SponsorSlider logos={sponsorsData} />
                <SponsorSlider logos={sponsorsData} reverse={true} />
            </div>
        </section>
    )
}

export default PartnerWithBossBeginnings
