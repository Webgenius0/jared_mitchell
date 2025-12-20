import { Button } from '@/Components/Common/Button'
import Container from '@/Components/Common/Container'

const NewsLetter = () => {
    return (
        <section className='bg-[#F5F5F7] section'>
            <Container>
                <div className='space-y-8'>
                    <h1 className='section_title 2xl:text-7xl font-bold leading-[130%]'>Stay inspired. Get the latest spotlights and events delivered to your inbox.</h1>
                    <p className='section_sub_title'>Be the first to hear about new creators, rising businesses, upcoming events, and OSI announcements.</p>
                    <form className='flex items-center justify-between max-w-[870px] w-full py-3 px-5 rounded-full bg-white mx-auto'>
                        <input type="text" placeholder='Enter your email address' className='w-full outline-none text-lg' />
                        <Button>Get started now</Button>
                    </form>
                </div>
            </Container>
        </section>
    )
}

export default NewsLetter
