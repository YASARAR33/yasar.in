"use client";

import Image from "next/image";
import { FaBriefcase, FaCogs } from "react-icons/fa";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const experienceData = [
  {
    image: "/spiralcode.png",
    role: "ERPNext Developer",
    company: "Spiralcode Innovates LLP",
    period: "Present",
    points: [
      "Developed and customized ERPNext modules using the Frappe Framework to meet business-specific requirements.",
      "Built custom Doctypes, workflows, and reports to streamline internal business processes.",
      "Integrated ERPNext with third-party systems via REST APIs.",
      "Collaborated with cross-functional teams to gather requirements and implement ERP customizations.",
      "Performed bug fixes, module enhancements, and system configuration within the Frappe/ERPNext ecosystem.",
    ],
  },
  {
    icon: FaCogs,
    role: "Python Full-Stack Developer",
    company: "Web Development",
    period: "Django · React · MySQL",
    points: [
      "Adept at working across the complete software development lifecycle.",
      "Designed relational database schemas and optimized queries in MySQL.",
      "Developed secure, scalable backend REST APIs using Python and Django.",
      "Built interactive UI components and responsive frontends with React, JavaScript, and Bootstrap.",
    ],
  },
  {
    icon: FaBriefcase,
    role: "Live Project Implementations",
    company: "Enterprise Projects Delivered",
    period: "8+ Live Projects",
    points: [
      "Successfully developed and implemented software & ERP solutions for 8+ live industry projects.",
      "Projects include: Asian Foods, Car One, Infinity, Pavan Group, Petra Steel Door & More, The Gloss Factor, Pavithram, and Smart Panel.",
      "Delivered real-time systems, automated workflows, and customer-facing business platforms.",
    ],
  },
];

const TestimonialSlider = () => {
  return (
    <Swiper
      navigation
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination]}
      className="h-110 sm:h-96"
    >
      {experienceData.map((item, i) => (
        <SwiperSlide key={i}>
          <div className="flex flex-col items-center md:flex-row gap-x-8 h-full px-8 sm:px-16">
            <div className="w-full max-w-64 flex flex-col xl:justify-center items-center relative mx-auto xl:mx-0">
              <div className="flex flex-col justify-center items-center text-center">
                {item.image ? (
                  <div className="mb-3 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 shadow-lg flex items-center justify-center">
                    <Image
                      src={item.image}
                      width={200}
                      height={60}
                      alt={item.company}
                      className="object-contain max-h-14 drop-shadow-md"
                    />
                  </div>
                ) : item.icon ? (
                  <div className="mb-3 p-4 rounded-full bg-accent/20 text-accent text-3xl">
                    <item.icon aria-hidden />
                  </div>
                ) : null}

                <div className="text-lg sm:text-xl font-bold text-white mb-1">
                  {item.role}
                </div>

                <div className="text-xs uppercase font-medium tracking-widest text-accent mb-1">
                  {item.company}
                </div>
                <div className="text-[11px] text-white/60">{item.period}</div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center before:w-px xl:before:bg-white/20 xl:before:absolute xl:before:left-0 xl:before:h-48 relative xl:pl-8 mt-4 md:mt-0">
              <ul className="text-xs sm:text-sm leading-relaxed text-white/80 text-left space-y-1.5 list-disc list-inside">
                {item.points.map((point, ptI) => (
                  <li key={ptI}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialSlider;
