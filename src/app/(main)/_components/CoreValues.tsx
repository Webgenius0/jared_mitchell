import Container from '@/Components/Common/Container'
import { BadgeSvg, BagSvg, HeartSvg, PowerSvg, StarsSvg, ThreeCircleSvg } from '@/Components/Svg/SvgContainer'

const data = [
    {
        id: 1,
        icon: BagSvg,
        title: "Local businesses",
        description: "wanting real customers"
    },
    {
        id: 2,
        icon: StarsSvg,
        title: "Creators",
        description: "looking for exposure"
    },
    {
        id: 3,
        icon: BadgeSvg,
        title: "Small Business",
        description: "needing marketing support"
    },
    {
        id: 4,
        icon: ThreeCircleSvg,
        title: "Entrepreneurs",
        description: "who want structure & growth"
    },
    {
        id: 5,
        icon: HeartSvg,
        title: "Anyone",
        description: "who wants their story told"
    },
    {
        id: 6,
        icon: PowerSvg,
        title: "Anyone",
        description: "with limited time, budget, or resources"
    },
]

const CoreValues = () => {
    return (
        <section className='bg-[#FAFAFA] section'>
            <Container>
                <h2 className='section_title'>Our Core Values</h2>
                <div className='grid grid-cols-3 gap-[70px] mt-14 md:mt-20'>
                    {data?.map((data) => (
                        <div key={data.id} className='relative rounded-2xl py-20 pl-[74px] pr-[27px] border space-y-4 border-[rgba(0,0,0,0.16)] bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.07)]'>
                            <h4 className='text-3xl font-medium text-primary-black'>{data.title}</h4>
                            <p className='text-2xl text-secondary-black'>{data.description}</p>
                            <div className='absolute flex items-center justify-center aspect-square size-[120px] left-[-46px] top-[-46px] rounded-full border border-[rgba(0,0,0,0.16)] shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] bg-white '>
                                <data.icon />
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

export default CoreValues
