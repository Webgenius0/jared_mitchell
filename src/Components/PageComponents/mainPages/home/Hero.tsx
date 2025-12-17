import Image from 'next/image'
import HeroVideoImg from '../../../../Assets/home/hero-video-img.jpg'
// import HeroVideo from '../../../../Assets/home/hero-video.mp4'
import { VideoPlayer } from '@/Components/Svg/SvgContainer'

const Hero = () => {
  return (
    <section className='text-center py-12'>
      <h1 className='text-primary-black text-4xl sm:text-5xl lg:text-[6vw] font-bold leading-[140px] tracking-[-1.28px]'>Our Social Image</h1>
      <p className='text-secondary-black md:text-4xl'>We are the image of our society.</p>
      <div className='flex items-center justify-center my-[44px] relative'>
        <Image src={HeroVideoImg} width={1246} height={682} alt='hero video' className='w-[1246px] h-[682px] rounded-[40px] object-cover' />
        <div className='w-[1246px] h-[682px] rounded-[40px] absolute bg-black/25 flex items-center justify-center'>
          <button>
            <VideoPlayer />
          </button>
        </div>
        <div>
          {/* <video src={'https://vimeo.com/1147298100?fl=pl&fe=sh'}></video> */}
        </div>
      </div>
      <p className='text-secondary-black text-3xl'>Welcome to Our Social Image — the platform where creativity meets community. Here, we celebrate small businesses, artists, and cultural innovators shaping the world around us. Explore stories, attend events, and join a growing network of creators who believe in unity, progress, and purpose. Your image is our image — and together, we create something powerful.</p>
      <div className='space-x-4  mt-12'>
        <button className='bg-primary-blue text-white border border-primary-blue rounded-full px-16 py-3.5 text-xl font-medium'>Join OSI</button>
        <button className='bg-white text-primary-blue border border-[#D1D5DC] rounded-full px-16 py-3.5 text-xl font-medium'>Sponsor Us</button>
      </div>
    </section>
  )
}

export default Hero
