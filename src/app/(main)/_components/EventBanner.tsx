import Image from 'next/image'

const EventBanner = () => {
  return (
     <section className="w-full max-h-[580px] h-full overflow-hidden flex items-center relative">
        <Image src={"/home/home-banner-2.jpg"} width={1920} height={580} alt="home banner" className="object-cover w-full" />
        <div className="w-full h-full absolute top-0 bg-black/60">
          <div className="flex flex-col max-w-[1200px] w-full mx-auto h-full items-center justify-center">
            <h2 className="section_title text-white 2xl:text-6xl">Events</h2>
            <p className="section_sub_title text-[#F5F5F7]">Discover celebrations, workshops, and community moments.<br />
              A curated look at the newest and most important events happening inside Our Social Image.</p>
          </div>
        </div>
      </section>
  )
}

export default EventBanner
