"use client";

import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const workSlides = {
  slides: [
    {
      images: [
        {
          title: "Asian Foods",
          path: "/project-asians.png",
          link: "#",
        },
        {
          title: "Car One",
          path: "/project-carone.jpg",
          link: "#",
        },
        {
          title: "Infinity",
          path: "/project-infinity.png",
          link: "#",
        },
        {
          title: "Pavan Group",
          path: "/project-pavan.png",
          link: "#",
        },
      ],
    },
    {
      images: [
        {
          title: "Petra Steel Door & More",
          path: "/project-petra.png",
          link: "#",
        },
        {
          title: "The Gloss Factor",
          path: "/project-gloss-factor.png",
          link: "#",
        },
        {
          title: "Pavithram",
          path: "/project-pavithram.png",
          link: "#",
        },
        {
          title: "Smart Panel",
          path: "/project-smart-panel.jpg",
          link: "#",
        },
      ],
    },
  ],
};

const WorkSlider = () => {
  return (
    <Swiper
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="h-70 sm:h-120"
    >
      {workSlides.slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
            {slide.images.map((image, imageI) => (
              <div
                className="relative rounded-lg overflow-hidden flex items-center justify-center group bg-white/10 p-2 h-full"
                key={imageI}
              >
                <div className="w-full h-full flex items-center justify-center relative overflow-hidden rounded-md bg-white/90 p-2">
                  <Image
                    src={image.path}
                    alt={image.title}
                    width={500}
                    height={300}
                    className="w-full h-full object-contain"
                  />

                  <div
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-2 text-center"
                  >
                    <span className="text-white font-bold text-sm sm:text-base drop-shadow-lg tracking-wide">
                      {image.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default WorkSlider;
