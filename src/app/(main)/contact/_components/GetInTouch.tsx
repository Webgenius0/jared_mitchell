import { Button } from '@/Components/Common/Button'
import Container from '@/Components/Common/Container'
import { LuSend, LuUpload } from 'react-icons/lu'

const GetInTouch = () => {
  return (
    <section className='section'>
      <Container>
        <h2 className='section_title 2xl:!text-[70px]'>Get In Touch</h2>
        <p className='section_sub_title'>For general questions about OSI, event information, partnerships, media inquiries, technical assistance, or billing concerns — use the form below. Our team typically responds within 24–48 hours.</p>
        <form className='mt-[120px]'>
          <div className='space-y-8'>
            <div className='flex items-center gap-6'>
              <div className='space-y-[18px] w-full'>
                <div className='text-primary-black text-2xl'>First Name*</div>
                <input type='text' placeholder='John' className='px-6 py-5 rounded-full bg-[#F5F5F7] border border-[#00000029] text-xl text-[#99A1AF] w-full' />
              </div>
              <div className='space-y-[18px] w-full'>
                <div className='text-primary-black text-2xl'>Last Name *</div>
                <input type='text' placeholder='Doe' className='px-6 py-5 rounded-full bg-[#F5F5F7] border border-[#00000029] text-xl text-[#99A1AF] w-full' />
              </div>
            </div>
            <div className='space-y-[18px]'>
              <div className='text-primary-black text-2xl'>Email Address *</div>
              <input type='text' placeholder='Type your email...' className='px-6 py-5 rounded-full bg-[#F5F5F7] border border-[#00000029] text-xl text-[#99A1AF] w-full' />
            </div>
            <div className='space-y-[18px]'>
              <div className='text-primary-black text-2xl'>Subject *</div>
              <select className='px-6 py-5 rounded-full bg-[#F5F5F7] border border-[#00000029] text-xl text-[#99A1AF] w-full'>
                <option disabled>Select a subject</option>
                <option value="">123454WSEDFG</option>
                <option value="">123454WSEDFG</option>
              </select>
            </div>
            <div className='space-y-[18px]'>
              <div className='text-primary-black text-2xl'>Message *</div>
              <textarea rows={5} placeholder='Tell us how we can help...' className='px-6 py-4 rounded-lg bg-[#F5F5F7] border border-[#00000029] text-xl text-[#99A1AF] w-full'></textarea>
            </div>
            <div className='space-y-[18px]'>
              <div className='text-primary-black text-2xl'>Optional Upload (Screenshots or Files)</div>
              <label className='px-6 py-5 rounded-full flex items-center justify-center cursor-pointer gap-2 bg-white border border-[#00000029] text-xl text-[#364153] w-full'>
                <input type='file' className='hidden' />
                <LuUpload className='text-[#99A1AF]' />
                Click to upload file
              </label>
            </div>
          </div>
          <div className='mt-[40px]'>
            <Button className='w-full'><LuSend className='text-xl' />
              Send Message</Button>
          </div>
        </form>
      </Container>
    </section>
  )
}

export default GetInTouch
