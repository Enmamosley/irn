import { slugSelector } from "@/lib/utils/languageParser";
import { markdownify } from "@/lib/utils/textConverter";
import Button from "@/shortcodes/Button";
import "aos/dist/aos.css";
import React, { useState } from "react";

const Feature = ({ features, lang }: { features: any; lang: string }) => {
  const [active, setActive] = useState(0);

  return (
    <>
      {/* Button Container */}
      <div
        className="flex flex-wrap justify-center gap-4 px-4 md:px-0"
        data-aos="fade-up-sm"
      >
        {features.map((item: any, i: number) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`btn min-w-[120px] text-sm md:text-base transition-all duration-300 ease-in-out ${
              active === i
                ? "bg-primary text-text-light scale-105"
                : "btn-outline-primary border border-border hover:scale-102"
            }`}
          >
            {item.button}
          </button>
        ))}
      </div>

      {/* Content Container */}
      <div
        className="relative mt-8 flex flex-col lg:flex-row items-center bg-light rounded-[20px] overflow-hidden"
        data-aos="fade-up-sm"
      >
        {/* Text Content */}
        <div
          className="w-full lg:w-1/2 p-6 md:p-10 lg:p-14 transition-all duration-500 ease-in-out order-2 lg:order-1"
          style={{
            opacity: 1,
            transform: "translateX(0)",
          }}
        >
          <div className="transition-opacity duration-500 ease-in-out">
            <h3
              dangerouslySetInnerHTML={{
                __html: markdownify(features[active].title),
              }}
              className="text-2xl md:text-3xl lg:text-4xl mb-4 transform transition-transform duration-500 ease-in-out"
            />
            <p
              dangerouslySetInnerHTML={{
                __html: markdownify(features[active].content),
              }}
              className="text-base md:text-lg mb-4 transform transition-transform duration-500 ease-in-out"
            />
            <div className="transform transition-all duration-500 ease-in-out">
              <Button
                link={slugSelector(features[active].link.link, lang)}
                label={features[active].link.label}
              />
            </div>
          </div>
        </div>

        {/* Image Container */}
        <div className="relative w-full lg:w-1/2 h-[300px] md:h-[400px] lg:h-[606px] order-1 lg:order-2">
          {features.map((feature: any, i: number) => (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                active === i
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-full"
              }`}
            >
              <img
                src={feature.image}
                alt={feature.title}
                width={597}
                height={603}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Feature;
