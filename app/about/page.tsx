"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import CountUp from "react-countup";
import {
  FaCogs,
  FaCss3,
  FaGitAlt,
  FaHtml5,
  FaJs,
  FaPython,
  FaReact,
  FaServer,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import { SiBootstrap, SiDjango, SiMysql, SiPostman } from "react-icons/si";


import Circles from "@/components/Circles";
import { fadeIn } from "@/variants";

type AboutInfoItem = {
  title: string;
  stage?: string;
  icons?: IconType[];
};

type AboutDataItem = {
  title: string;
  info: AboutInfoItem[];
};

const aboutData: AboutDataItem[] = [
  {
    title: "skills",
    info: [
      {
        title: "Frontend",
        icons: [FaHtml5, FaCss3, FaJs, SiBootstrap, FaReact],
      },
      {
        title: "Backend & Tools",
        icons: [FaPython, SiDjango, SiMysql, FaGitAlt, SiPostman],
      },
      {
        title: "ERP & Framework",
        icons: [FaServer, FaCogs],
      },
    ],
  },
  {
    title: "experience",
    info: [
      {
        title: "ERPNext Developer - Spiralcode Innovates LLP",
        stage: "Present",
      },
      {
        title: "Python Full-Stack Developer",
        stage: "Django · React · MySQL",
      },
    ],
  },
  {
    title: "projects",
    info: [
      {
        title: "Petra",
        stage: "Live Project",
      },
      {
        title: "Asian Foods",
        stage: "Live Project",
      },
      {
        title: "Gloss Factor",
        stage: "Live Project",
      },
      {
        title: "Pavithram",
        stage: "Live Project",
      },
      {
        title: "Pavan",
        stage: "Live Project",
      },
      {
        title: "Infinity",
        stage: "Live Project",
      },
      {
        title: "Smart Panel",
        stage: "Live Project",
      },
      {
        title: "Carone",
        stage: "Live Project",
      },
    ],
  },
  {
    title: "education",
    info: [
      {
        title: "MCA - Mohandas College of Engineering and Technology, Anad",
        stage: "2023 - 2025",
      },
      {
        title: "BSc Computer Science - A J College of Science and Technology",
        stage: "2019 - 2022",
      },
      {
        title: "Higher Secondary - S M V GHSS Trivandrum",
        stage: "2017 - 2019",
      },
    ],
  },
  {
    title: "credentials",
    info: [
      {
        title: "Architecture: MVT, MVC",
      },
      {
        title: "Soft skills: Teamwork, Communication, Problem solving",
      },
      {
        title: "Languages: English, Malayalam",
      },
    ],
  },
];

const About = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="h-full bg-primary/30 py-32 text-center xl:text-left">
      <Circles />


      <div className="container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6">
        <div className="flex-1 flex flex-col justify-center">
          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2"
          >
            Clean code, <span className="text-accent">real solutions</span>,
            built with purpose.
          </motion.h2>
          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            className="max-w-125 mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0"
          >
            Python Developer with hands-on experience in full-stack web
            development using Django, MySQL, JavaScript, and the Frappe
            Framework/ERPNext. Proficient in building and customizing scalable
            ERP solutions, developing web applications, and integrating APIs to
            solve real-world business problems. Adept at working across the full
            development lifecycle &mdash; from database design to deployment
            &mdash; with a strong foundation in problem-solving and clean,
            maintainable code.
          </motion.p>

          <motion.div
            variants={fadeIn("right", 0.6)}
            initial="hidden"
            animate="show"
            className="hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8"
          >
            <div className="flex flex-1 xl:gap-x-6">
              <div className="relative flex-1 after:w-px after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={8} duration={5} />
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-25">
                  Completed projects.
                </div>
              </div>

              <div className="relative flex-1 after:w-px after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={7} duration={5} />
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-25">
                  Core technologies.
                </div>
              </div>

              <div className="relative flex-1 after:w-px after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={2} duration={5} />
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-25">
                  Degrees earned.
                </div>
              </div>

              <div className="relative flex-1">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={100} duration={5} />
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-25">
                  Percent dedication.
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeIn("left", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex flex-col w-full xl:max-w-[48%] h-120"
        >
          <div className="flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4">
            {aboutData.map((item, itemI) => (
              <div
                key={itemI}
                className={`${
                  index === itemI &&
                  "text-accent after:w-full after:bg-accent after:transition-all after:duration-300"
                } cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-0.5 after:bg-white after:absolute after:-bottom-1 after:left-0`}
                onClick={() => setIndex(itemI)}
              >
                {item.title}
              </div>
            ))}
          </div>

          <div className="py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start">
            {aboutData[index].info.map((item, itemI) => (
              <div
                key={itemI}
                className="flex-1 flex flex-col md:flex-row max-w-max gap-x-2 items-center text-center text-white/60"
              >
                <div className="font-light mb-2 md:mb-0">{item.title}</div>
                <div className="hidden md:flex">-</div>
                <div>{item.stage}</div>

                <div className="flex gap-x-4">
                  {item.icons?.map((Icon, iconI) => (
                    <div key={iconI} className="text-2xl text-white">
                      <Icon />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
