import Link from "next/link";
import type { IconType } from "react-icons";
import {
  RiLinkedinLine,
  RiMailLine,
  RiPhoneLine,
  RiGithubLine,
} from "react-icons/ri";

export const socialData: { name: string; link: string; Icon: IconType }[] = [
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/yasar-python-fullstack-developer/",
    Icon: RiLinkedinLine,
  },
  {
    name: "Email",
    link: "mailto:aryasar2001@gmail.com",
    Icon: RiMailLine,
  },
  {
    name: "Phone",
    link: "tel:+919544967793",
    Icon: RiPhoneLine,
  },
  {
    name: "Github",
    link: "https://github.com/yasarar33",
    Icon: RiGithubLine,
  },
];

const Socials = () => {
  return (
    <div className="flex items-center gap-x-5 text-lg">
      {socialData.map((social, i) => (
        <Link
          key={i}
          title={social.name}
          href={social.link}
          target="_blank"
          rel="noreferrer noopener"
          className={`${
            social.name === "Github"
              ? "bg-accent rounded-full p-1.25 hover:text-white"
              : "hover:text-accent"
          } transition-all duration-300`}
        >
          <social.Icon aria-hidden />
          <span className="sr-only">{social.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Socials;
