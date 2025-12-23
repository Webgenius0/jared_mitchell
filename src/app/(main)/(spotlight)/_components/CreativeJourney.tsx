import Container from '@/Components/Common/Container'
import { LikeSvg, ShareSvg } from '@/Components/Svg/SvgContainer'
import Image from 'next/image'

const CreativeJourney = () => {
  return (
    <section className='section'>
      <Container>
        <h2 className='section_title'>Behind the Creative Journey</h2>
        <p className='section_sub_title'>Celebrating our community's achievements and creative milestones</p>
        <div className='max-w-[1048px] w-full mx-auto rounded-xl custom_border custom_shadow bg-white space-y-8 p-[30px]'>
          <figure className='w-full h-[400px]'>
            <Image src={"/spotlight/artist-pick-img.jpg"} width={988} height={400} alt='' className='size-full object-cover rounded-3xl' />
          </figure>
          <div className='space-y-6'>
            <h3 className='section_title max-w-[600px] !text-left'>
              Artist Interview: Behind the
              Creative Journey
            </h3>
            <p className='text-3xl text-[#909090]'>GO deeper into the stories behind the artists. Hear
              firsthand perspectives on creativity, challenges,
              culture, and the inspiration that drives their work.</p>
            <ul className='text-3xl font-medium list-disc ml-8'>
              <li>Early inspirations</li>
              <li>Defining creative challenges</li>
              <li>Their "why" as an artist</li>
              <li>The role of community</li>
              <li>Their message to future creators</li>
            </ul>
          </div>
        <div className='px-[120px] py-4 flex justify-between items-start self-stretch rounded-[42px] custom_border'>
          <LikeSvg size={38} />
          <ShareSvg size={38} />
        </div>
        </div>
      </Container>
    </section>
  )
}

export default CreativeJourney
