import { Carousel, Typography, IconButton } from "@material-tailwind/react";

import HomePageImg1 from "../assets/HomePageImg1.png";
import HomePageImg2 from "../assets/HomePageImg2.png";
import HomePageImg3 from "../assets/HomePageImg3.png";

export default function HomePage() {
  return (
    <Carousel
      className="rounded-xl mt-20"
      autoplay={true}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-2 left-2/4 z-50 flex  -translate-x-2/4 gap-3">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-2  cursor-pointer rounded-2xl transition-all content-[''] hover:bg-[#00ADB5] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-[#222831]"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4 hover:bg-[#EEEEEE]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6 hover:text-[#00ADB5]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4 hover:bg-[#EEEEEE]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6 hover:text-[#00ADB5]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}
    >
      <div className="-mt-[4rem] mb-10">
        <img src={HomePageImg1} alt="image 1" className="ml-[35rem]" />
        <div className="flex flex-col items-center gap-2 text-[#222831]">
          <h1 className="text-4xl">Fastest Payment in the world</h1>
          <p>
            Integrate multiple payment methoods to help you up the process
            quickly
          </p>
        </div>
      </div>

      <div className="-mt-[4rem] mb-10">
        <img src={HomePageImg2} alt="image 2" className="ml-[35rem]" />
        <div className="flex flex-col items-center gap-2 text-[#222831]">
          <h1 className="text-4xl">The most Secoure Platfrom for Customer</h1>
          <p>
            Built-in Fingerprint, face recognition and more, keeping you
            completely safe
          </p>
        </div>
      </div>

      <div className=" mb-10">
        <img
          src={HomePageImg3}
          alt="image 3"
          className="h-96 ml-[35rem] mt-4"
        />
        <div className="flex flex-col items-center gap-2 text-[#222831]">
          <h1 className="text-4xl">
            Paying for Everything is Easy and Convenient
          </h1>
          <p>
            Built-in Fingerprint, face recognition and more, keeping you
            completely safe
          </p>
        </div>
      </div>
    </Carousel>
  );
}

// <Carousel className="rounded-xl">

// </Carousel>
