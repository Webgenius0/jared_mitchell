import React from "react";
import PricingPlan from "../_components/PricingPlan";
import PricingTable from "../_components/PricingTable";
import { getCMSAboutData, getCMSFAQs, getSubscriptionPlans } from "@/lib/Services/cms_service";
import { PricingPlan as PricingPlanType } from "@/Types/type";
import { SubscriptionPlan } from "@/Types/cms";
import FAQAccordion from "../services/_components/FAQAccordion";
import NewsLetter from "@/Components/Common/NewsLetter";
import Sponsors from "../_components/Sponsors";

interface TableRow {
  feature: string;
  basic: string | boolean;
  growth: string | boolean;
  pro: string | boolean;
}

/** Transform API subscription plans into the PricingPlan type used by the component */
const transformPlans = (plans: SubscriptionPlan[]): PricingPlanType[] => {
  return plans
    .filter(plan => plan.is_visible === 1)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(plan => ({
      id: String(plan.id),
      title: plan.plan_name,
      price: `$${parseFloat(plan.price).toString()}`,
      period: plan.price_suffix,
      badge: plan.badge_text ?? undefined,
      highlighted: plan.is_featured === 1,
      bestFor: plan.best_for,
      outcome: plan.outcome_text,
      buttonLabel: plan.button_label,
      buttonUrl: plan.button_url,
      sections: [...plan.feature_groups]
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(group => ({
          title: group.title,
          items: [...group.items]
            .sort((a, b) => a.sort_order - b.sort_order)
            .map(item => item.feature_text),
        })),
    }));
};

/** Extract comparison table rows from subscription plans at the feature-group level */
const buildComparisonTable = (plans: SubscriptionPlan[]): TableRow[] => {
  const sorted = [...plans]
    .filter(p => p.is_visible === 1)
    .sort((a, b) => a.sort_order - b.sort_order);

  if (sorted.length < 3) return [];

  const [basic, growth, pro] = sorted;
  if (!basic || !growth || !pro) return [];

  // Collect all unique feature-group titles across all three plans
  const allGroupTitles = new Set<string>();
  sorted.forEach(p => p.feature_groups.forEach(g => allGroupTitles.add(g.title)));

  return Array.from(allGroupTitles).map(title => ({
    feature: title,
    basic: basic.feature_groups.some(g => g.title === title) ? "✓" : "—",
    growth: growth.feature_groups.some(g => g.title === title) ? "✓" : "—",
    pro: pro.feature_groups.some(g => g.title === title) ? "✓" : "—",
  }));
};

const page = async () => {
  const [faqData, CmsData, subscriptionPlans] = await Promise.all([
    getCMSFAQs(),
    getCMSAboutData(),
    getSubscriptionPlans(),
  ]);

  const plans = transformPlans(subscriptionPlans);
  const tableData = buildComparisonTable(subscriptionPlans);

  // Build dynamic table headers from API data
  const sortedPlans = [...subscriptionPlans]
    .filter(p => p.is_visible === 1)
    .sort((a, b) => a.sort_order - b.sort_order);
  const tableHeaders = sortedPlans.length >= 3
    ? {
        basic: `${sortedPlans[0].plan_name.replace(/\s+PLAN$/i, "")} ($${parseFloat(sortedPlans[0].price)})`,
        growth: `${sortedPlans[1].plan_name.replace(/\s+PLAN$/i, "")} ($${parseFloat(sortedPlans[1].price)})`,
        pro: `${sortedPlans[2].plan_name.replace(/\s+PLAN$/i, "")} ($${parseFloat(sortedPlans[2].price)})`,
      }
    : undefined;

  return (
    <div>
      <PricingPlan plans={plans} />
      <PricingTable data={tableData} headers={tableHeaders} />
      <FAQAccordion data={faqData} />
      <Sponsors data={CmsData?.about_sponsors} title="Our Sponsors" />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </div>
  );
};
export default page;

