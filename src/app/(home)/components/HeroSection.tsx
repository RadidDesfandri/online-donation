import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="relative bg-neutral-400">
      <Image
        src={"/home/hero.jpg"}
        width={1000}
        height={1000}
        priority
        alt="Hero section image"
        className="h-[490px] w-full object-cover md:h-[480px]"
      />

      <div className="absolute bottom-8 z-10 transform px-5 tracking-wider text-white md:top-1/2 md:left-44 md:-translate-y-1/3">
        <h1 className="font-robotoSlab max-w-[470px] text-3xl font-medium md:text-5xl">
          Ulurkan tangan, Wujudkan harapan
        </h1>
        <p className="font-montserrat mt-3 max-w-[480px] text-sm tracking-wider md:text-lg">
          Satu langkah kecil untuk Anda, perubahan besar bagi mereka.
        </p>
      </div>

      <div className="absolute bottom-0 h-full max-h-52 w-full bg-gradient-to-t from-[#063821] via-[#09502F]/80 to-transparent p-10 md:top-0 md:left-0 md:max-h-full md:max-w-64 md:bg-gradient-to-r md:from-[#063821] md:via-[#09502F]/80 md:to-transparent lg:max-w-[440px]" />
      <div className="absolute top-0 left-0 h-full w-full bg-[#2D2D2D]/45" />
    </div>
  );
};

export default HeroSection;
