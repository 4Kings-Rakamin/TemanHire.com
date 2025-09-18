import React from "react";
import Button from "./Button";

const Hero = () => {
  return (
    <section className=" relative overflow-hidden min-h-[70vh] md:min-h-[80vh] xl:min-h-screen ">
      {/* Video background */}
      <video
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/hero2.webm" type="video/webm" />
        {/* Fallback text */}
        Browser kamu tidak mendukung tag video.
      </video>

      {/* Overlay opsional biar teks lebih kebaca */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Konten di atas video */}
      <div className=" relative z-10 max-container padding-container py-20 my-20">
        <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight">
          Recruitment & Decision <br/> <span className="text-[#0097b2]">Redefined</span>
        </h1>
        <p className="mt-4 max-w-xl text-white/85">
            Selesaikan Proses hiring hanya dalam 1 Platform Terintegrasi. Dapatkan kandidat terbaik dengan teknologi AI kami.
        </p>
        <div className="flex flex-col w-full gap-3 sm:flex-row mt-6">
            <Button 
            type="button" 
            title="Get Started" 
            variant="btn_green" 
            href="/service"
            />
            <Button
            type = "button"
            title = "Our Team"
            icon="/camp.svg"
            variant = "btn_white_text"
            href="/4kings"
            />
          {/* <a
            href="#get-started"
            className="inline-block rounded-2xl bg-white/90 hover:bg-white px-6 py-3 font-medium text-gray-900 shadow"
          >
            Get Started
          </a> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
