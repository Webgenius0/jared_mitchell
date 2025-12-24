import { Button } from '@/Components/Common/Button'
import Container from '@/Components/Common/Container'
import { topPerformers } from '@/Components/Data/data'
import Image from 'next/image'
import Link from 'next/link'
import { FaRegClock } from 'react-icons/fa'
import { FiBookmark, FiExternalLink, FiGithub, FiShare2, FiTwitter } from 'react-icons/fi'
import { GoArrowUpRight } from 'react-icons/go'
import { LuHand } from 'react-icons/lu'

const VoteNow = () => {
  return (
    <section className='pb-24'>
      <Container>
        <div className='py-[52px] px-[54px] space-y-[44px] bg-secondary-gray rounded-2xl custom_border custom_shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='section_title !text-left 2xl:!text-6xl'>Final 6 — Vote Now</h2>
              <p className='section_sub_title !text-left'>Top performers from last week's Top 12. Winner becomes next Spotlight of the Week.</p>
            </div>
            <div className='flex items-center gap-3 py-4 px-6 text-primary-blue rounded-full custom_border bg-white'>
              <FaRegClock />
              <span>4d 11h remaining</span>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            {topPerformers?.map((user) => (
              <>
                <div className='space-y-14 bg-white custom_border rounded-2xl custom_shadow py-14 px-12'>
                  <div className='flex gap-5'>
                    <figure className='size-[60px] shrink-0 relative'>
                      <Image src={user.avatar} width={60} height={60} alt='' className='size-full rounded-full object-cover' />
                      <div className='absolute -top-[5px] -left-2.5 size-[32px] flex items-center justify-center rounded-full bg-primary-black text-white text-sm'>#{user.rank}</div>
                    </figure>
                    <div className='space-y-3'>
                      <div>
                        <h5 className='text-2xl text-primary-black font-medium'>{user.name}</h5>
                        <p className='text-secondary-black'>{user.title}</p>
                      </div>
                      <p className='text-lg text-primary-black'>{user.description}</p>
                      <div className='py-2 px-4 bg-[#F1F5F9] text-lg rounded-lg inline-block text-secondary-black'>{user.tag}</div>
                      {user.socials && (
                        <div className='flex items-center gap-5 text-xl text-primary-blue'>
                          {user.socials.website && <Link href={user.socials.website}><FiExternalLink /></Link>}
                          {user.socials.twitter && <Link href={user.socials.twitter}><FiTwitter /></Link>}
                          {user.socials.github && <Link href={user.socials.github}><FiGithub /></Link>}
                        </div>
                      )}
                      <div className='flex items-center gap-9 text-xl text-secondary-black'>
                        <div className='flex items-center gap-2'>
                          <span>👏</span> {user.claps ?? "0"}
                        </div>
                        <div className='flex items-center gap-2'>
                          <span>🔖</span> {user.saves ?? "0"}
                        </div>
                        <div className='flex items-center gap-2'>
                          <span><GoArrowUpRight className='text-2xl' /></span> {user.shares ?? "0"}
                        </div>
                        <div>
                          Weekly Score: {user.weeklyScore ?? "0"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex gap-5'>
                    <Button variant={"outline"} className='flex-1'><LuHand /> Clap</Button>
                    <Button variant={"outline"} className='flex-1'><FiBookmark />Save</Button>
                    <Button variant={"outline"} className='flex-1'><FiShare2 /> Share </Button>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default VoteNow
