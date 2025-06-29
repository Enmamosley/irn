import Counter from "@/helpers/Counter";
import { slugSelector } from "@/lib/utils/languageParser";
import { markdownify } from "@/lib/utils/textConverter";
import type { CollectionEntry } from "astro:content";
import React, { useState } from "react";
import { IoCheckmarkOutline } from "react-icons/io5";
type PlanType = CollectionEntry<"planSection">;

// Helper functions for reusable logic
const getPrice = (plan: PlanType["data"]["pricing_card"][0], period: string) =>
  period === "year" ? plan.price.yearly_price : plan.price.monthly_price;

const getPlanClass = (featured: boolean) =>
  featured
    ? "featured-price z-10 text-light bg-primary bg-[url('/images/homepage/patternBg.png')] relative"
    : "bg-body";

const Plan = ({ plan, lang }: { plan: PlanType; lang: string }) => {
  const { title, pricing_tab, pricing_card } = plan.data;
  const [checked, setChecked] = useState(pricing_tab[0]?.type || "month");

  return (
    <section className="section bg-light">
      <div className="container md:w-3/4 lg:1/2 xl:w-full">
        <div
          className="flex flex-col xl:flex-row items-center xl:items-end justify-center xl:justify-between mb-14"
          data-aos="fade-up-sm"
        >
          <h2
            className="xl:w-1/2 max-xl:mb-20 max-xl:text-center"
            dangerouslySetInnerHTML={{ __html: markdownify(title) }}
          />
          <PricingTab
            tabs={pricing_tab}
            currentTab={checked}
            onTabChange={setChecked}
          />
        </div>
        <div className="row justify-center g-3">
          {pricing_card.map((plan: any, i: number) => (
            <div
              key={i}
              className="col-12 xl:col-3 min-h-full"
              data-aos="fade-up-sm"
              data-aos-delay={i * 100}
            >
              <PricingCard plan={plan} lang={lang} period={checked} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingTab = ({
  tabs,
  currentTab,
  onTabChange,
}: {
  tabs: PlanType["data"]["pricing_tab"];
  currentTab: string;
  onTabChange: (type: string) => void;
}) => {
  return (
    <div
      className="relative inline-flex items-center gap-2 p-1 rounded-full bg-body"
      data-aos="fade-right-sm"
    >
      <img
        src="/images/deal.svg"
        alt="deal"
        width={87}
        height={36}
        className="deal-image"
      />
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => onTabChange(tab.type)}
          aria-pressed={currentTab === tab.type}
          aria-label={`Switch to ${tab.label}`}
          className={`cursor-pointer text-sm px-5 py-3 rounded-full transition-all duration-200 ${tab.badge && "pl-3 pr-1"} ${
            currentTab !== tab.type
              ? "bg-transparent text-text/70"
              : "bg-text-gray/15 shadow"
          }`}
        >
          {tab.label}
          {tab.badge?.enable && (
            <span className="ml-2 bg-black text-white text-xs px-2 py-2.5 rounded-full">
              {tab.badge.label}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

const PricingCard = ({
  plan,
  period,
  lang,
}: {
  plan: PlanType["data"]["pricing_card"][0];
  period: string;
  lang: string;
}) => (
  <div
    className={`p-6 border border-border rounded-2xl h-full relative overflow-hidden ${getPlanClass(plan.featured)}`}
    data-aos="zoom-in-sm"
  >
    <p className="mb-4 font-semibold text-xl">
      {markdownify(plan.title) as string}
      {plan.featured && (
        <span className="bg-[#ffd02f] rounded-full px-2 py-1 inline-block text-sm ml-2 text-text">
          RECOMMENDED
        </span>
      )}
    </p>

    <p
      className={`mb-4 text-sm ${plan.featured ? "text-light/80" : "text-text/80"}`}
      dangerouslySetInnerHTML={{ __html: markdownify(plan.content) }}
    />
    <div className="mb-4">
      {plan.price.free ? (
        <p
          className="font-medium text-[2.5rem]"
          dangerouslySetInnerHTML={{ __html: markdownify(plan.price.custom!) }}
        />
      ) : (
        <p className="font-medium text-[2.5rem]">
          <span>{plan.price.currency}</span>
          <Counter count={getPrice(plan, period)} duration={0.8} />
          <span className="font-normal text-base">/{period}</span>
        </p>
      )}
    </div>
    {plan.button.enable && (
      <div className="mb-6">
        <a
          href={`${slugSelector(plan.button.link, lang)}`}
          className={`btn w-full ${plan.featured ? "btn-ghost" : "border border-dark hover:bg-gradient-to-b hover:from-primary/0 hover:to-primary/10 "}`}
        >
          {plan.button.label}
        </a>
      </div>
    )}
    <p
      className="text-sm font-semibold mb-3"
      dangerouslySetInnerHTML={{ __html: markdownify(plan.service.title) }}
    />
    <ul>
      {plan.service.points.map((point: any, i: number) => (
        <li key={i} className="text-sm mb-3 flex">
          <IoCheckmarkOutline className="flex-shrink-0 mr-1 mt-[2px]" />
          <span dangerouslySetInnerHTML={{ __html: markdownify(point) }} />
        </li>
      ))}
    </ul>

    {plan.featured && (
      <div
        className="absolute bottom-[-288px] left-1/2 transform -translate-x-1/2
         w-[1256px] h-[440px] -z-[1] overflow-visible
         rounded-full opacity-25
         bg-gradient-to-r from-[rgb(88,255,215)] to-[rgb(89,255,216)]
         blur-[183px]"
      ></div>
    )}
  </div>
);

export default Plan;
