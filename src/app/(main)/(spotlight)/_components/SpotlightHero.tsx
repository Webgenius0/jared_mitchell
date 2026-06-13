import { Button } from '@/Components/Common/Button'
import Container from '@/Components/Common/Container'
import CustomVideoPlayer from '@/Components/Common/CustomVideoPlayer'
import { CMSArtistSpotlightVideo } from '@/Types/cms'

const SpotlightHero = ({ data }: { data?: CMSArtistSpotlightVideo }) => {
  return (
    <section className='section'>
      <Container >
        <div className='w-full h-[300px] md:h-[500px] xl:h-[627px]'>
          <CustomVideoPlayer 
            videoSrc={data?.description || "/home/hero-video.mp4"} 
            className={"!rounded-[20px] md:!rounded-[40px]"} 
          />
        </div>
        {/* <h2 className='text-2xl md:text-3xl xl:text-[40px] font-bold text-center mt-8 md:mt-16'>
          {data?.title || "Taste of Indy Street Kitchen: A Family Legacy of Flavor and Heart"}
        </h2> */}
        {data?.sub_title && (
          <p className="text-center text-lg md:text-xl text-secondary-black mt-4 max-w-[900px] mx-auto">
            {data.sub_title}
          </p>
        )}
      </Container>
    </section>
  )
}

export default SpotlightHero
