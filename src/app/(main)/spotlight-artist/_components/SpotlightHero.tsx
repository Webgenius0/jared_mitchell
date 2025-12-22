import { Button } from '@/Components/Common/Button'
import Container from '@/Components/Common/Container'
import CustomVideoPlayer from '@/Components/Common/CustomVideoPlayer'
import { BookmarkSvg, LikeSvg, ShareSvg } from '@/Components/Svg/SvgContainer'
import { BsArrowRight } from 'react-icons/bs'

const SpotlightHero = () => {
  return (
    <section className='section'>
      <Container >
        <div className='w-full h-[627px]'>
          <CustomVideoPlayer videoSrc="/home/hero-video.mp4" className={"!rounded-[40px]"} />
        </div>
        <h2 className='text-[40px] font-bold text-center mt-16'>Taste of Indy Street Kitchen: A Family Legacy of Flavor and Heart</h2>
        <div className='max-w-[1181px] custom_border mx-auto mt-16 mb-[54px] py-10 px-9 rounded-xl'>
          <h3 className='text-3xl font-semibold mb-4'>Summary</h3>
          <p className='text-2xl font-medium'>Aaliyah Monet blends abstract creativity with deeply personal storytelling to illuminate themes of identity, community, and healing. This feature explores the meaning behind her work, the evolution of her craft, and the message she hopes to share with the world.
          </p>
          <div className='mt-8 px-6 py-4 flex justify-around items-start self-stretch rounded-[42px] custom_border'>
            <div className='flex items-center gap-2.5'>
              <LikeSvg size={38}/>
              <p className='text-3xl font-medium text-[#939393]'>Like</p>
            </div>
            <div className='flex items-center gap-2.5'>
              <BookmarkSvg size={38}/>
              <p className='text-3xl font-medium text-[#939393]'>Save</p>
            </div>
            <div className='flex items-center gap-2.5'>
              <ShareSvg size={38}/>
              <p className='text-3xl font-medium text-[#939393]'>Share</p>
            </div>
          </div>
        </div>
          <div className='text-center'>
            <Button>
              View Full Spotlight
              <BsArrowRight className='text-2xl'/>
            </Button>
          </div>
      </Container>
    </section>
  )
}

export default SpotlightHero
