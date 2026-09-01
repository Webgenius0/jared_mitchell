"use client";

import { useMemo, useState } from "react";
import { Button } from "@/Components/Common/Button";
import { pricingPlans as staticPlans } from "@/Components/Data/data";
import { PricingPlan as PricingPlanType } from "@/Types/type";
import { GoArrowRight } from "react-icons/go";
import { IoCheckmarkOutline } from "react-icons/io5";
import { useSubscriptionCheckout } from "@/Hooks/api/auth_api";
import {
  useGetMySubscription,
  normalizeSubscriptionResponse,
  normalizeProfileSubscription,
} from "@/Hooks/api/subscription_api";
import useAuth from "@/Hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

// "Basic Plan" / "Basic" / "basic plan" all normalize to "basic", so a
// profile subscription name can be matched against a pricing card title.
const normalizePlanName = (name?: string | null) =>
  String(name ?? "")
    .toLowerCase()
    .replace(/\s*plan\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const isActiveSubscription = (status?: string | null) => {
  const s = String(status ?? "").toLowerCase();
  return s === "active" || s === "trialing";
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const PricingPlan = ({ plans }: { plans?: PricingPlanType[] }) => {
  const pricingPlans = plans ?? staticPlans;
  const { token, user } = useAuth();
  const router = useRouter();
  const checkoutMutation = useSubscriptionCheckout();
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);

  // Current subscription — /v1/subscription/status is the source of truth
  // (matches by stripe price id). While that endpoint is unavailable, fall
  // back to the subscription embedded in the user profile (matched by name).
  const { data: subRes, isLoading: subLoading } = useGetMySubscription(
    Boolean(token),
  );
  const statusSub = useMemo(
    () => normalizeSubscriptionResponse(subRes),
    [subRes],
  );
  console.log(subRes ,"Pricing plan")
  // Only fall back to the profile subscription once the status query has
  // settled — avoids a brief flash of a name-matched highlight while it loads.
  const profileSub = useMemo(
    () =>
      statusSub || subLoading
        ? null
        : normalizeProfileSubscription(user?.subscription),
    [statusSub, subLoading, user?.subscription],
  );

  // The id of the pricing card the user has already purchased — used to
  // render that card as "selected" instead of offering it for purchase.
  const currentPlanId = useMemo(() => {
    const sub = statusSub ?? profileSub;
    if (!sub || !isActiveSubscription(sub.status)) return null;

    return (
      pricingPlans.find(plan => {
        if (
          Boolean(sub.stripe_price) &&
          Boolean(plan.stripe_price_id) &&
          sub.stripe_price === plan.stripe_price_id
        ) {
          return true;
        }
        if (
          sub.plan_id != null &&
          String(sub.plan_id) === String(plan.id)
        ) {
          return true;
        }
        const normalizedSubName = normalizePlanName(sub.plan_name);
        return (
          Boolean(normalizedSubName) &&
          normalizedSubName === normalizePlanName(plan.title)
        );
      })?.id ?? null
    );
  }, [statusSub, profileSub, pricingPlans]);

  const handleGetStarted = (plan: PricingPlanType) => {
    // If user is not logged in, redirect to login page
    if (!token) {
      toast.error("Please login to subscribe");
      router.push("/auth/login");
      return;
    }

    setLoadingPlanId(plan.id);

    checkoutMutation.mutate(
      { data: { pricing_plan_id: parseInt(plan.id, 10) } },
      {
        onSuccess: (res: any) => {
          setLoadingPlanId(null);
          if (res?.status === "success" && res?.data?.checkout_url) {
            window.location.href = res.data.checkout_url;
          } else {
            toast.error("Something went wrong. Please try again.");
          }
        },
        onError: () => {
          setLoadingPlanId(null);
        },
      },
    );
  };

  const isPlanLoading = (planId: string) => loadingPlanId === planId;

  return (
    <section className="section">
      <div className="container">
        <h2 className="section_title">Choose Your Growth Plan</h2>

        <div className="w-full py-4 md:py-6 lg:py-8 xl:py-16">
          <div className="grid gap-2.5 md:gap-3 lg:gap-3.5 xl:gap-6 md:grid-cols-2 xl:grid-cols-4 md:w-[80%] 2xl:w-full mx-auto">
            {pricingPlans.map(plan => {
              const isLoading = isPlanLoading(plan.id);
              const isCurrent = currentPlanId === plan.id;

              return (
                <div
                  key={plan.id}
                  className={`group relative flex flex-col custom_shadow rounded-xl lg:rounded-2xl custom_border px-3.5 md:px-4 lg:px-5 py-5 md:py-5 lg:py-6 transition-all hover:bg-primary-blue hover:text-white hover:border-blue-600 ${
                    isCurrent
                      ? "bg-white text-primary-black border-gray-200 ring-2 ring-primary-blue"
                      : "bg-white text-primary-black border-gray-200"
                  }`}
                >
                  {plan.badge && (
                    <span
                      className={`absolute -top-3 ${
                        isCurrent
                          ? "left-4"
                          : "left-1/2 -translate-x-1/2"
                      } rounded-full bg-primary-blue px-3 py-1 text-sm font-medium text-white`}
                    >
                      {plan.badge}
                    </span>
                  )}
                  {isCurrent && (
                    <span className="absolute -top-3 right-4 inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow">
                      <IoCheckmarkOutline className="size-4" />
                      Current Plan
                    </span>
                  )}
                  <h3 className="text-sm md:text-base lg:text-lg xl:text-2xl font-semibold uppercase">
                    {plan.title}
                  </h3>
                  <div className="mt-1 md:mt-1.5 flex items-end gap-1">
                    <span className="text-lg md:text-xl lg:text-2xl xl:text-4xl">
                      {plan.price}
                    </span>
                    <span className="text-sm opacity-70">{plan.period}</span>
                  </div>
                  <p className="mt-2.5 md:mt-3 text-xs md:text-sm lg:text-base xl:text-xl">Best for:</p>
                  <p className="">{plan.bestFor}</p>
                  <div className="mt-3 md:mt-3.5 lg:mt-4 space-y-3 md:space-y-3.5 lg:space-y-4">
                    {plan.sections.map(section => (
                      <div key={section.title}>
                        <h4 className="mb-2 md:mb-2.5 text-sm md:text-base font-medium">
                          {section.title}
                        </h4>
                        <ul className="space-y-1.5">
                          {section?.items?.map(item => (
                            <li key={item} className="flex gap-2">
                              <IoCheckmarkOutline
                                className="size-5 shrink-0 text-primary-blue group-hover:text-white"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <div className="my-3 md:my-3.5 lg:my-4 border-t border-gray-200 pt-3 md:pt-3.5 lg:pt-4 opacity-80">
                      <p className="text-xs md:text-sm lg:text-base xl:text-xl mb-1 text-primary-blue group-hover:text-white">
                        Outcome:
                      </p>
                      {plan.outcome}
                    </div>

                    {isCurrent ? (
                      <Button
                        asChild
                        className="flex w-full !bg-gray-100 !text-gray-500 border-gray-200 group-hover:!bg-white group-hover:!text-black"
                      >
                        <Link href="/dashboard/subscription">
                          <IoCheckmarkOutline className="size-5" />
                          Manage Plan
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        className="flex w-full bg-primary-blue text-white group-hover:!bg-white group-hover:!text-black"
                        onClick={() => handleGetStarted(plan)}
                        disabled={isLoading}
                      >
                        {isLoading
                          ? "Redirecting..."
                          : plan.buttonLabel ?? "Get Started"}{" "}
                        <GoArrowRight />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlan;
