import { Button } from '@/Components/Common/Button'
import Container from '@/Components/Common/Container'
import { pricingPlans } from '@/Components/Data/data'
import { GoArrowRight } from 'react-icons/go'
import { IoCheckmarkOutline } from 'react-icons/io5'

const PricingPlan = () => {
  return (
    <section className='section'>
      <Container>
        <h2 className='section_title'>Choose Your Growth Plan</h2>
        <div className="w-full py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex flex-col custom_shadow rounded-2xl custom_border px-5 py-8 ${plan.highlighted
                  ? "bg-primary-blue text-white border-blue-600"
                  : "bg-white text-primary-black border-gray-200"
                  }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-[20%] -translate-x-1/2 rounded-full bg-primary-blue px-3 py-1 text-sm font-medium text-white">
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-2xl font-semibold uppercase">
                  {plan.title}
                </h3>
                <div className="mt-2 flex items-end gap-1">
                  <span className="text-3xl xl:text-4xl">{plan.price}</span>
                  <span className="text-sm opacity-70">{plan.period}</span>
                </div>
                <p className="mt-4 text-xl">
                  Best for:
                </p>
                <p className=''>
                  {plan.bestFor}
                </p>
                {plan.id === "growth" && <p className='text-xl mt-3 text-primary-blue'>Everything in Basic, Plus:</p>}
                {plan.id === "pro" && <p className='text-xl mt-3'>Everything in Growth, Plus:</p>}
                <div className="mt-6 space-y-6">
                  {plan.sections.map((section) => (
                    <div key={section.title}>
                      <h4 className="mb-3 text-lg font-medium">
                        {section.title}
                      </h4>
                      <ul className="space-y-2">
                        {section?.items?.map((item) => (
                          <li key={item} className="flex gap-2">
                            <IoCheckmarkOutline className={`size-5 shrink-0 ${plan.id === "pro" ? "text-white" : "text-primary-blue"}`} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className='mt-auto'>
                  <div className="my-6 border-t border-gray-200 pt-6 opacity-80">
                    <p className={`text-xl mb-1 ${plan.highlighted ? "text-white" : "text-primary-blue"}`}>Outcome:</p>
                    {plan.outcome}
                  </div>
                  <Button
                    className={`flex w-full ${plan.highlighted
                      ? "!bg-white text-primary-blue hover:bg-gray-100"
                      : "bg-primary-blue text-white hover:bg-blue-700"
                      }`}
                  >
                    Get Started <GoArrowRight />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default PricingPlan
