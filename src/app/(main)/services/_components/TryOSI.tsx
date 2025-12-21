import Container from '@/Components/Common/Container'
import React from 'react'
import { FiCheck } from 'react-icons/fi'

const TryOSI = () => {
  return (
    <section className='section bg-[#4680FF] text-center text-white'>
      <Container>
        <div className='flex items-center mx-auto mb-5 justify-center size-[83px] bg-[#DAE9F9] rounded-full'>
          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="46" viewBox="0 0 38 46" fill="none">
            <path d="M36.0007 25.1673C36.0007 36.0006 28.4173 41.4173 19.404 44.559C18.932 44.7189 18.4193 44.7113 17.9523 44.5373C8.91732 41.4173 1.33398 36.0006 1.33398 25.1673V10.0006C1.33398 9.42601 1.56226 8.87491 1.96859 8.46858C2.37492 8.06226 2.92602 7.83398 3.50065 7.83398C7.83398 7.83398 13.2507 5.23398 17.0207 1.94065C17.4797 1.54848 18.0636 1.33301 18.6673 1.33301C19.2711 1.33301 19.855 1.54848 20.314 1.94065C24.1057 5.25565 29.5007 7.83398 33.834 7.83398C34.4086 7.83398 34.9597 8.06226 35.3661 8.46858C35.7724 8.87491 36.0007 9.42601 36.0007 10.0006V25.1673Z" stroke="#1977DD" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <h2 className='text-7xl font-bold'>Try OSI Risk-Free</h2>
        <p className='text-2xl max-w-[920px] mx-auto mt-4 mb-7'>Memberships are flexible. You can cancel or switch anytime. No long-term commitments. Join with confidence knowing OSI grows with you at your pace.</p>
        <div className='flex items-center justify-center gap-11'>
          <div className='flex items-center gap-3 text-xl font-medium'>
            <FiCheck className='text-xl' />
            Cancel Anytime
          </div>
          <div className='flex items-center gap-3 text-xl font-medium'>
            <FiCheck className='text-xl' />
            No Penalties
          </div>
          <div className='flex items-center gap-3 text-xl font-medium'>
            <FiCheck className='text-xl' />
            Flexible Plans
          </div>
        </div>
      </Container>
    </section>
  )
}

export default TryOSI
