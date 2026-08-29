import { Button } from '@/Components/Common/Button'
import Container from '@/Components/Common/Container'
import { BadgeSvg, HandShakeSvg, HomeSvg } from '@/Components/Svg/SvgContainer'
import { IoArrowForwardSharp } from 'react-icons/io5'

const data = [
  {
    icon: BadgeSvg,
    title: "Gifts & Resources",
    description: "Community members and sponsors provide tangible support, business tools, and resources to help launch successfully."
  },
  {
    icon: HomeSvg,
    title: "Apply as a Vendor",
    description: "Showcase your products or services at OSI events and reach an engaged audience."
  },
  {
    icon: HandShakeSvg,
    title: "Request a Collaboration",
    description: "Work with us on community projects, events, or creative partnerships."
  },
]
const VendorOpportunities = () => {
  return (
    <section className='section'>
      <Container>
        <h2 className='section_title '>Sponsorship & Vendor Opportunities</h2>
        {/* <h2 className='section_title 2xl:!text-[76px]'>Sponsorship & Vendor Opportunities</h2> */}
        <p className='section_sub_title'>If you're interested in sponsoring OSI events, promoting your brand through our channels, securing vendor space at upcoming OSI events, or collaborating on community projects — our team would love to connect.</p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6 mt-8 md:mt-10 lg:mt-12'>
          {data?.map((data, index) => (
            <div key={index} className='flex flex-col px-5 md:px-6 lg:px-7 py-6 md:py-7 lg:py-8 gap-5 md:gap-6 lg:gap-7 custom_border bg-white'>
              <div className='size-16 md:size-18 lg:size-20 xl:size-[100px] flex items-center justify-center rounded-full shrink-0 bg-[#1977DD29]'>
                <data.icon />
              </div>
              <div className='space-y-2 md:space-y-3'>
                <h5 className='text-primary-black text-xl md:text-2xl lg:text-[28px] xl:text-[32px] font-semibold'>{data.title}</h5>
                <p className='text-secondary-black text-sm md:text-base lg:text-lg xl:text-2xl'>{data.description}</p>
              </div>
                <div className='mt-auto'>
                  <Button className='w-full'>Score This Business <IoArrowForwardSharp /></Button>
                </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default VendorOpportunities
