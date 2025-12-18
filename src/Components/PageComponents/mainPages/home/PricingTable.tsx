import Container from '@/Components/Common/Container'

export const pricingTableData = [
    {
        feature: "AI Automated Social Posting",
        basic: "2 days/week (3 posts/day)",
        growth: "4 days/week (3 posts/day)",
        pro: "Unlimited posting (3–5/day)",
    },
    {
        feature: "AI Scheduling Assistant",
        basic: "Basic",
        growth: "Advanced",
        pro: "Full automation + repurposing",
    },
    {
        feature: "Platforms Posted To",
        basic: "1–2",
        growth: "3–4",
        pro: "Unlimited",
    },
    {
        feature: "Spotlight Submissions",
        basic: "1 Monthly",
        growth: "Unlimited",
        pro: "Unlimited + Priority",
    },
    {
        feature: "Homepage Visibility",
        basic: "No",
        growth: "Yes (rotating)",
        pro: "Premium",
    },
    {
        feature: "Newsletter Highlights",
        basic: "Basic mention",
        growth: "Priority",
        pro: "Featured section",
    },
    {
        feature: "Dashboard Access",
        basic: "Basic insights",
        growth: "Full insights",
        pro: "Full dashboard + trend reports",
    },
    {
        feature: "AI Market Insights",
        basic: "Basic snapshot",
        growth: "Audience deep-dive",
        pro: "Behavioral heatmaps + monthly trends",
    },
    {
        feature: "Canva Integration",
        basic: "Basic templates",
        growth: "OSI template library",
        pro: "Full Canva library + custom templates",
    },
    {
        feature: "Templates & Tools",
        basic: "Basic",
        growth: "Full Library",
        pro: "Full Library + Custom Assets",
    },
    {
        feature: "Ad Promotion on OSI Channels",
        basic: "No",
        growth: "Limited",
        pro: "Featured + Premium Ads",
    },
    {
        feature: "Video Channel Promotion",
        basic: "No",
        growth: "Limited",
        pro: "Guaranteed monthly feature",
    },
    {
        feature: "Event Access & Vendor Discounts",
        basic: "Discounted tickets",
        growth: "10% vendor discount",
        pro: "25% vendor discount + VIP",
    },
    {
        feature: "Community Access",
        basic: "Yes",
        growth: "Yes",
        pro: "Yes (VIP)",
    },
    {
        feature: "Submit Your Spotlight",
        basic: "Yes",
        growth: "Yes",
        pro: "Yes (Priority)",
    },
    {
        feature: "Ad Promotion on OSI Channels",
        basic: "Yes",
        growth: "Yes",
        pro: "Yes",
    },
]


const PricingTable = () => {
    return (
        <section className='section bg-[#F5F5F7]'>
            <Container>
                <div className='w-full overflow-x-auto p-5'>
                    <table className="w-full border-collapse text-nowrap shadow-[0_4px_20px_0_rgba(0,0,0,0.07)]">
                        <thead className='rounded-2xl md:text-2xl'>
                            <tr className='border-b border-gray-200 bg-white'>
                                <th className='font-bold py-[26px] rounded-tl-xl'>Feature</th>
                                <th className='font-bold py-[26px]'>Basic ($25)</th>
                                <th className='font-bold py-[26px]'>Growth ($50)</th>
                                <th className='font-bold py-[26px] rounded-tr-xl'>Pro Business ($100)</th>
                            </tr>
                        </thead>
                        <tbody className='rounded-2xl [&>tr:last-child>td:first-child]:rounded-bl-2xl [&>tr:last-child>td:last-child]:rounded-br-2xl [&>tr:last-child]:border-none'>
                            {pricingTableData.map((row) => (
                                <tr key={row.feature} className='md:text-2xl border-b border-gray-200 text-center bg-white'>
                                    <td className='py-[26px]'>{row.feature}</td>
                                    <td className='py-[26px]'>{row.basic}</td>
                                    <td className='py-[26px]'>{row.growth}</td>
                                    <td className='py-[26px]'>{row.pro}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </Container>
        </section>
    )
}

export default PricingTable
