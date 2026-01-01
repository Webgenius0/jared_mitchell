import Container from '@/Components/Common/Container'

const data = [
  {
    id: "business-shower-event",
    title: "Business Shower Event",
    description: "Full-featured celebration with community",
    icon: "gift",
  },
  {
    id: "video-interview",
    title: "Video Interview",
    description: "Professional OSI Spotlight feature",
    icon: "video",
  },
  {
    id: "photography-package",
    title: "Photography Package",
    description: "Marketing assets for your business",
    icon: "camera",
  },
  {
    id: "gift-packages",
    title: "Gift Packages",
    description: "From community & sponsors",
    icon: "gift",
  },
  {
    id: "homepage-feature",
    title: "Homepage Feature",
    description: "Prominent placement on OSI",
    icon: "location",
  },
  {
    id: "social-media-promotion",
    title: "Social Media Promotion",
    description: "Across all OSI channels",
    icon: "megaphone",
  },
  {
    id: "live-event-recognition",
    title: "Live Event Recognition",
    description: "Speaking opportunity",
    icon: "award",
  },
  {
    id: "newsletter-highlight",
    title: "Newsletter Highlight",
    description: "Featured to all subscribers",
    icon: "document",
  },
];


const WinnerReceives = () => {
  return (
    <section className='section'>
      <Container>
        <h2 className='section_title'>What the Winner Receives</h2>
        <p className='section_sub_title'>A comprehensive package of support, exposure, and resources to launch with confidence.</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mt-11'>
          {data?.map((data, idx) => (
            <div key={idx} className='px-7 py-[55px] custom_border bg-primary-gray rounded-xl text-center'>
              <h5 className='text-primary-black text-2xl font-semibold'>{data.title}</h5>
              <p className='mt-1 text-secondary-black text-xl'>{data.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default WinnerReceives
