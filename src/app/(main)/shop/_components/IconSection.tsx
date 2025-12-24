import Container from "@/Components/Common/Container"
import { BagSvg, CalendarSvg, DownloadSvg, HeartSvg, PowerSvg, TshirtSvg } from "@/Components/Svg/SvgContainer"

const iconData = [
  {
    icon: TshirtSvg,
    title: "Apparel",
    description: "Quality merch that represents the culture."
  },
  {
    icon: DownloadSvg,
    title: "Digital Products",
    description: "Templates, planners, AI tools, and growth resources."
  },
  {
    icon: BagSvg,
    title: "Business Tools",
    description: "Everything you need to scale your business."
  },
  {
    icon: CalendarSvg,
    title: "Event & Vendor Packages",
    description: "Get featured and grow your visibility."
  },
  {
    icon: HeartSvg,
    title: "Community Support",
    description: "Directly fund programs that uplift creators."
  },
  {
    icon: PowerSvg,
    title: "Limited Drops",
    description: "Exclusive releases and collaborations."
  }

]

const IconSection = () => {
  return (
    <div className="section">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {iconData?.map((data, index) => (
            <div key={index} className='space-y-2 py-10 px-[94px] rounded-xl custom_border custom_shadow bg-secondary-gray flex flex-col items-center justify-center text-center'>
              <div className="size-[100px] flex items-center justify-center rounded-full bg-primary-blue/15 text-primary-blue mb-3">
                {<data.icon />}
              </div>
              <p className="text-2xl text-primary-black font-medium">{data.title}</p>
              <p className="text-xl text-[#4A5565]">{data.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default IconSection
