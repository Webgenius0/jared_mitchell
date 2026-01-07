import Link from "next/link"

const page = () => {
  const data = [
    {
      searchParams: "artist",
      text: "Artist & Business Dashboard"
    },
    {
      searchParams: "community-member",
      text: "Community Member Dashboard"
    },
    {
      searchParams: "sponsor",
      text: "Sponsor Dashboard"
    },
    {
      searchParams: "boss-beginnings",
      text: "Boss Beginnings Dashboard"
    },
  ]
  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center">
      {/* <div className="max-w-[800px] w-full mx-auto "></div> */}
      <h2 className="text-primary-black text-3xl md:text-[74px] font-semibold capitalize">Choose your dashboard</h2>
      <p className="text-secondary-black text-2xl md:text-4xl">
        Sign in to continue to your account
      </p>
      <div className="grid grid-cols-2 max-w-[800px] w-full mt-10 gap-10">
        {data.map((data, index) => (
          <div>
            <Link href={`/auth/login?${data.searchParams}`} key={index} className="p-[25px] h-[289px] flex items-center justify-center text-center rounded-2xl custom_border bg-[#F5F5F7] custom_shadow text-[32px] text-secondary-black font-medium hover:text-white hover:bg-tertiary-blue hover:border hover:!border-tertiary-blue transition-all duration-300">{data.text}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
