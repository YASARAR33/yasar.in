import Image from "next/image";

const Avatar = () => {
  return (
    <div className="hidden xl:flex xl:max-w-none pointer-events-none select-none h-full w-full">
      <Image
        src="/avatar.png"
        alt="Yasar AR - Python Developer"
        width={600}
        height={678}
        className="translate-z-0 w-full h-full object-contain object-top"
      />
    </div>
  );
};

export default Avatar;
