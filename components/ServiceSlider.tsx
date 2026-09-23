"use client";

import {
  RxCode,
  RxComponent1,
  RxDesktop,
  RxDatabase,
  RxRocket,
  RxGear,
  RxLayers,
  RxArrowTopRight,
} from "react-icons/rx";
import type { IconType } from "react-icons";
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const serviceData: {
  Icon: IconType;
  title: string;
  description: string;
}[] = [
  {
    Icon: RxDesktop,
    title: "Web Development",
    description: "Building responsive websites with HTML, CSS, Bootstrap and JavaScript.",
  },
  {
    Icon: RxCode,
    title: "Backend with Django",
    description: "Developing secure, scalable backends in Python using Django (MVT).",
  },
  {
    Icon: RxGear,
    title: "ERPNext Solutions",
    description: "Building, configuring, and customizing scalable ERPNext modules and workflows.",
  },
  {
    Icon: RxLayers,
    title: "Frappe Framework",
    description: "Developing custom apps, Doctypes, REST APIs, and server scripts using Frappe.",
  },
  {
    Icon: RxComponent1,
    title: "React Frontends",
    description: "Crafting interactive UI components and single-page experiences with React.",
  },
  {
    Icon: RxDatabase,
    title: "Database Design",
    description: "Structuring and managing data efficiently with MySQL.",
  },
  {
    Icon: RxRocket,
    title: "API Integration",
    description: "Connecting apps to APIs, testing with Postman, and using Git for version control.",
  },
];

const ServiceSlider = () => {
  return (
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
      }}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      freeMode
      className="h-60 sm:h-85"
    >
      {serviceData.map((item, i) => (
        <SwiperSlide key={i}>
          <div className="bg-[rgba(65,47,123,0.15)] h-max rounded-lg px-6 py-8 flex sm:flex-col gap-x-6 sm:gap-x-0 group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300">
            <div className="text-4xl text-accent mb-4">
              <item.Icon aria-hidden />
            </div>

            <div className="mb-8">
              <div className="mb-2 text-lg">{item.title}</div>
              <p className="max-w-87.5 leading-normal">{item.description}</p>
            </div>

            <div className="text-3xl">
              <RxArrowTopRight
                className="group-hover:rotate-45 group-hover:text-accent transition-all duration-300"
                aria-hidden
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ServiceSlider;
