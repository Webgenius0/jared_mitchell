import { Button } from '@/Components/Common/Button'
import Container from '@/Components/Common/Container'
import { BsArrowRight } from 'react-icons/bs'

const SpotlightLadder = () => {
  return (
    <section className='section bg-primary-gray'>
      <Container>
        <h2 className='section_title'>Weekly Spotlight Ladder</h2>
        <p className='section_sub_title'>Community-driven recognition for outstanding developers</p>
        <div className='text-center mt-10'>
        <Button>Explore Spotlight Ladder <BsArrowRight className='text-2xl'/></Button>
        </div>
      </Container>
    </section>
  )
}

export default SpotlightLadder
