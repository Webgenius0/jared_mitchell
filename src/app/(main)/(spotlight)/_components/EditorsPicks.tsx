import { Button } from '@/Components/Common/Button'
import Container from '@/Components/Common/Container'
import { editorPicks } from '@/Components/Data/data'
import Image from 'next/image'
import Link from 'next/link'
import { BsArrowRight } from 'react-icons/bs'

const EditorsPicks = () => {
  return (
    <>
      <section className="section">
        <Container>
          <div className="">
            <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
              Editor&apos;s Picks
            </h2>
            <p className="section_sub_title">
              Celebrating our community&apos;s achievements and creative milestones
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-11">
            {editorPicks.map(({ name,
              role,
              description,
              image,
              href, }, index) => (
              <div key={index} className="bg-white p-[30px] rounded-xl custom_border custom_shadow">
                <figure className="w-full">
                  <Image
                    src={image}
                    alt={name}
                    width={500}
                    height={290}
                    className="w-full object-cover rounded-3xl"
                  />
                </figure>

                {/* Content */}
                <div className="pt-6 space-y-6">
                  <h3 className="text-2xl font-bold text-primary-black">
                    {name}
                  </h3>

                  <div className="bg-[#8F8F8F2E] px-3.5 py-[7px] rounded-full inline-block">
                    {role}
                  </div>

                  <p className="text-xl text-[#909090]">
                    {description}
                  </p>

                  <div className="pt-2">
                    <Button asChild size="xl">
                      <Link href={href}>
                        View Spotlight
                        <BsArrowRight className='text-2xl' />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

export default EditorsPicks
