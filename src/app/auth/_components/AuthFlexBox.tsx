import Image from 'next/image'
import { ReactNode } from 'react'

const AuthFlexBox = ({ children, title, description }: { children: ReactNode, title: string, description: string }) => {
  return (
    <section className='w-full min-h-screen bg-whit py-[50px] max-w-[1527px] mx-auto flex items-center gap-[128px]'>
      <div className='w-full'>
        <figure className='w-[762px] h-[981px] rounded-[32px] overflow-hidden relative'>
          <div className='bg-[#00000099] size-full absolute flex flex-col justify-center px-9 text-white'>
            <h5 className='text-[60px] font-medium'>{title}</h5>
            <p className='text-xl tracking-wide capitalize'>{description}</p>
          </div>
          <Image src={"https://i.ibb.co.com/84gNb7Wc/photo-1541976844346-f18aeac57b06.jpg"} width={762} height={981} alt='' className='size-full object-cover' />
        </figure>
      </div>
      <div className='w-full min-h-screen flex flex-col relative justify-center'>
        {children}
      </div>
    </section>
  )
}

export default AuthFlexBox
