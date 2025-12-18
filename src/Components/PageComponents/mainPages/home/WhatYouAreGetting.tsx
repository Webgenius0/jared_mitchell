import Container from "@/Components/Common/Container"
import { AnnouncementSvg, BlueHeartSvg, GrowthSvg, PeopleSvg } from "@/Components/Svg/SvgContainer"

const data = [
    {
        id: 1,
        icon: AnnouncementSvg,
        title: "Business visibility"
    },
    {
        id: 2,
        icon: PeopleSvg,
        title: "A marketing team"
    },
    {
        id: 3,
        icon: GrowthSvg,
        title: "A platform promoting you"
    },
    {
        id: 4,
        icon: BlueHeartSvg,
        title: "A community supporting you"
    },
]

const WhatYouAreGetting = () => {
  return (
      <section className='section'>
            <Container>
                <h2 className='section_title md:font-bold 2xl:text-7xl'>What You're Really Getting</h2>
                <p className="text-2xl text-center text-secondary-black mt-4">You're not buying a membership — you're buying:</p>
                <div className='flex flex-wrap justify-center items-center gap-6 self-stretch mt-11'>
                    {data?.map((data) => (
                        <div key={data.id} className='rounded-xl max-w-[369px] w-full py-20 px-7 flex items-center flex-col border space-y-4 border-[rgba(0,0,0,0.16)] bg-[#F5F5F7]'>
                            <div className='flex items-center justify-center aspect-square bg-[rgba(25,119,221,0.16)] size-[100px] rounded-full'>
                                <div className="scale-[160%]">

                                <data.icon />
                                </div>
                            </div>
                            <h4 className='text-[22px] text-center self-stretch font-semibold text-primary-black'>{data.title}</h4>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
  )
}

export default WhatYouAreGetting
