import Container from "@/Components/Common/Container"
import CustomVideoPlayer from "@/Components/Common/CustomVideoPlayer"
import Image from "next/image"

const BossBeginningWinner = () => {
  return (
    <section>
      <Container>
        <h2 className="section_title 2xl:!text-[76px]">BOSS BEGINNINGS Winner</h2>
        <p className="text-3xl text-center text-primary-black">See the joy, support, and community love from our previous Boss Beginnings events.</p>
        <div className='w-full h-[808px] mt-12'>
          <CustomVideoPlayer videoSrc="/home/hero-video.mp4" className={"!rounded-none"} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center my-6 gap-6">
          <figure className="max-h-[808px] !h-full relative">
            <div  className="size-full absolute bg-black/30"/>
            <Image src={"https://i.ibb.co.com/k6DFZKwC/9e1987c943d5e121f56e8ac83b24e787088b66fc.jpg"} width={762} height={808} alt="" className="size-full object-cover"/>
          </figure>
          <figure className="max-h-[808px] !h-full relative">
            <div className="size-full absolute bg-black/30"/>
            <Image src={"https://i.ibb.co.com/k6DFZKwC/9e1987c943d5e121f56e8ac83b24e787088b66fc.jpg"} width={762} height={808} alt="" className="size-full object-cover"/>
          </figure>
        </div>
          <figure className="h-[808px] relative">
            <div className="size-full absolute bg-black/30"/>
            <Image src={"https://i.ibb.co.com/gMLwC1cv/88a9b44f64799f20774ea6aaabfc36a83cadcd94.jpg"} width={762} height={808} alt="" className="size-full object-cover"/>
          </figure>
      </Container>
    </section>
  )
}

export default BossBeginningWinner
