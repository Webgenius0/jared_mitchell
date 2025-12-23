import Container from "@/Components/Common/Container"
import { CelebrationSvg, HomeSvg, MicroPhoneSvg, RobotHeadSvg } from "@/Components/Svg/SvgContainer"

const iconData = [
  {
    icon: MicroPhoneSvg,
    title: "Artist & Business Spotlights",
    description: "Amplify voices and showcase talent across our platforms."
  },
  {
    icon: CelebrationSvg,
    title: "Boss Beginnings Celebrations",
    description: "Celebrate new business launches with community support."
  },
  {
    icon: HomeSvg,
    title: "Vendor Opportunities & Events",
    description: "Create spaces for local businesses to thrive and connect."
  },
  {
    icon: RobotHeadSvg,
    title: "AI Tools for Small Businesses",
    description: "Provide cutting-edge resources to level the playing field."
  }
]

const PurchaseSupports = () => {
  return (
    <section className="section">
      <Container>
        <div className="section rounded-[20px] custom_border bg-secondary-gray space-y-11">
          <div>
            <h2 className="section_title 2xl:!text-7xl">What Your Purchase Supports</h2>
            <p className="section_sub_title">Your purchase directly funds visibility, resources, and real opportunities for our community.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-5">
            {iconData?.map((data, index) => (
                <div key={index} className='space-y-2 p-5 rounded-xl custom_border custom_shadow bg- flex flex-col items-center bg-white justify-center text-center'>
                  <div className="size-[100px] flex items-center justify-center rounded-full bg-primary-blue/15 text-primary-blue mb-3">
                    {<data.icon />}
                  </div>
                  <p className="text-2xl text-primary-black font-medium">{data.title}</p>
                  <p className="text-xl text-[#4A5565]">{data.description}</p>
                </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default PurchaseSupports
