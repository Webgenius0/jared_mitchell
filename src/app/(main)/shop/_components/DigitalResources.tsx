import { Button } from "@/Components/Common/Button"
import Container from "@/Components/Common/Container"
import { CalendarSvg2, FileTextSvg, GrowthSvg2, LayoutSvg, RobotHeadSvg, RobotHeadSvg2 } from "@/Components/Svg/SvgContainer"
import { FiDownload } from "react-icons/fi"

const resources = [
  {
    id: 1,
    icon: CalendarSvg2,
    title: "Social Media Content Calendar",
    description: "Plan 90 days of content in minutes",
    audience: "Content creators & businesses",
    price: 29,
  },
  {
    id: 2,
    icon: FileTextSvg,
    title: "Business Planning Templates",
    description: "Launch-ready templates for every stage",
    audience: "New entrepreneurs",
    price: 39,
  },
  {
    id: 3,
    icon: RobotHeadSvg2,
    title: "AI Prompt Packs",
    description: "200+ prompts for marketing & growth",
    audience: "Digital marketers",
    price: 19,
  },
  {
    id: 4,
    icon: GrowthSvg2,
    title: "Marketing Playbooks",
    description: "Step-by-step strategies that work",
    audience: "Small business owners",
    price: 49,
  },
  {
    id: 5,
    icon: FileTextSvg,
    title: "Finance & Trading Journal",
    description: "Track investments and build wealth",
    audience: "Aspiring investors",
    price: 24,
  },
  {
    id: 6,
    icon: LayoutSvg ,
    title: "Canva Template Bundle",
    description: "50+ ready-to-use design templates",
    audience: "Visual content creators",
    price: 34,
  },
]

const DigitalResources = () => {
  return (
    <section className="section">
      <Container>
        <h2 className="section_title 2xl:!text-7xl">
          Digital Tools & Resources
        </h2>
        <p className="section_sub_title">
          Instant access. Lifetime value. Scale your business today.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">
          {resources?.map((resource) => (
            <div key={resource.id} className="px-5 py-6 space-y-3 bg-[#EFF6FF] custom_border custom_shadow rounded-xl">
              <div className="flex justify-between">
                <div className="bg-primary-blue text-white flex items-center justify-center size-[70px] rounded-full">
                  {<resource.icon />}
                </div>
                <div className="text-primary-blue h-fit bg-white custom_border px-2 py-1 inline-flex items-center gap-1 rounded-full text-sm">
                  <FiDownload />
                  Instant
                </div>
              </div>
              <div className="space-y-2 border-b border-gray-300 pb-3 md:pb-5">
                <h5 className="text-primary-black text-2xl font-semibold">{resource.title}</h5>
                <p className="text-xl text-secondary-black">{resource.description}</p>
                <p className="text-primary-blue text-xl tracking-wide">For: {resource.audience}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xl text-primary-black">${resource.price}</div>
                <Button size={"lg"}>Get Access</Button>
              </div>
            </div>
          ))

          }
        </div>
      </Container>
    </section>
  )
}

export default DigitalResources
