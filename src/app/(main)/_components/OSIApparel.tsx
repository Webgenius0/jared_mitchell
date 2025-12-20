import { Button } from '@/Components/Common/Button'
import Container from '@/Components/Common/Container'
import Image from 'next/image'

const OSIApparel = () => {
    return (
        <Container>
            <section className='text-center py-12'>
                <h2 className='text-primary-black text-4xl sm:text-5xl lg:text-[5vw] font-bold leading-[140px] tracking-[-1.28px] mb-5'>Shop OSI Apparel, Ebooks, and Digital</h2>
                <p className='text-secondary-black text-2xl'>Explore exclusive merchandise, creative tools, and digital resources designed to help you build your brand and elevate your craft.</p>
                <div className='relative flex items-center max-w-[1179px] w-full h-[682px] justify-center my-7 rounded-[40px] overflow-hidden mx-auto'>
                    <div className='absolute top-0 left-0 size-full bg-black/40' />
                    <Image src={'/home/osi-apparel-banner.png'} width={1179} height={682} alt='boss beginnings' className='object-cover size-full' />
                </div>
                <h3 className='section_title'>Become part of a growing network that celebrates art, business, and community.</h3>
                <div className='space-x-4 md:space-x-14 mt-12'>
                    <Button>Join OSI</Button>
                    <Button variant={'outline'}>Become a Sponsor</Button>
                </div>
            </section>
        </Container>
    )
}

export default OSIApparel
