import Container from '@/Components/Common/Container'
import { AnnouncementSvg, GrowthSvg, BlueHeartSvg, MediaSvg, PeopleSvg, BlueStarsSvg } from '@/Components/Svg/SvgContainer'

const data = [
    {
        id: 1,
        icon: BlueStarsSvg,
        text: "A spotlight on your story"
    },
    {
        id: 2,
        icon: AnnouncementSvg,
        text: "A platform sharing your business across the city"
    },
    {
        id: 3,
        icon: PeopleSvg,
        text: "An audience ready to support you"
    },
    {
        id: 4,
        icon: MediaSvg,
        text: "Interviews, features, and media-style promotion"
    },
    {
        id: 5,
        icon: GrowthSvg,
        text: "Tools that help you grow"
    },
    {
        id: 6,
        icon: BlueHeartSvg,
        text: "A support system focused on your success"
    },
]
const WhyChoose = () => {
    return (
        <div className='bg-[#F5F5F7]'>
            <Container>
                <section className='section'>
                    <h2 className='section_title'>Why Choose OSI?</h2>
                    <p className='section_sub_title'>Because OSI gives you what small businesses and creators desperately need but rarely get: consistent visibility, support, and community.</p>
                    <div className='flex items-center justify-center w-full rounded-[20px] border border-[rgba(0,0,0,0.16)] bg-white min-h-[400px] mt-10'>
                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-8 xl:gap-10 p-4'>
                            {data?.map((data) => (
                                <div key={data.id} className='flex max-w-[300px] items-center justify-center px-4 py-3 gap-3 md:gap-5 rounded-lg bg-white border border-[rgba(0,0,0,0.16)] shadow-[0_4px_20px_0_rgba(0,0,0,0.07)]'>
                                    <div className='shrink-0'>
                                        <data.icon />
                                    </div>
                                    <p className='font-medium text-secondary-black text-lg'>

                                        {data.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </Container>
        </div>
    )
}

export default WhyChoose
