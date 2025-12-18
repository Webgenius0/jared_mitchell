import { Button } from '@/Components/Common/Button'
import Container from '@/Components/Common/Container'
import CustomVideoPlayer from '@/Components/Common/CustomVideoPlayer'

const Hero = () => {
  return (
    <Container>
      <section className='text-center py-12'>
        <h1 className='text-primary-black text-4xl sm:text-5xl lg:text-[6vw] font-bold leading-[140px] tracking-[-1.28px]'>Our Social Image</h1>
        <p className='text-secondary-black md:text-4xl'>We are the image of our society.</p>
        <div className='flex items-center justify-center my-7 rounded-[40px] overflow-hidden'>
          <CustomVideoPlayer videoSrc="/home/hero-video.mp4" />
        </div>
        <p className='text-secondary-black text-3xl'>Welcome to Our Social Image — the platform where creativity meets community. Here, we celebrate small businesses, artists, and cultural innovators shaping the world around us. Explore stories, attend events, and join a growing network of creators who believe in unity, progress, and purpose. Your image is our image — and together, we create something powerful.</p>
        <div className='space-x-4  mt-12'>
          <button className='bg-primary-blue text-white border border-primary-blue rounded-full px-16 py-3.5 text-xl font-medium'>Join OSI</button>
          <button className='bg-white text-primary-blue border border-[#D1D5DC] rounded-full px-16 py-3.5 text-xl font-medium'>Sponsor Us</button>
          {/* <Button>Join OSI</Button> */}
          {/* <Button variant={'outline'}>Sponsor Us</Button> */}
        </div>
      </section>
    </Container>
  )
}

export default Hero
