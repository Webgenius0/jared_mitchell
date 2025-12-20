import Container from "@/Components/Common/Container"
import { BlueBigBadge, BlueBigPower, BlueBigStars, StarSvg } from "@/Components/Svg/SvgContainer"

const data = [
    {
        id: 1,
        icon: StarSvg,
        title: "A chance to be featured"
    },
    {
        id: 2,
        icon: BlueBigStars,
        title: "A chance to tell your story"
    },
    {
        id: 3,
        icon: BlueBigPower,
        title: "Access to tools help you grow"
    },
    {
        id: 4,
        icon: BlueBigBadge,
        title: "Professional credibility"
    },
]

const Features = () => {
    return (
        <section className='section'>
            <Container>
                <h2 className='section_title md:font-bold 2xl:text-7xl'>This is where your membership reveals its value, not just its features.</h2>
                <div className='flex flex-wrap justify-center items-center gap-6 self-stretch mt-11'>
                    {data?.map((data) => (
                        <div key={data.id} className='rounded-xl max-w-[369px] w-full py-20 px-7 flex items-center flex-col space-y-4'>
                            <div className='flex items-center justify-center aspect-square bg-[rgba(25,119,221,0.16)] size-[100px] rounded-full'>
                                <data.icon />
                            </div>
                            <h4 className='text-[22px] text-center self-stretch font-semibold text-primary-black'>{data.title}</h4>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

export default Features
