"use client";

import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const delay = 2500;

function Carousel() {
  const slides = [
    {
      url: "https://fastly.picsum.photos/id/30/1280/901.jpg?hmac=A_hpFyEavMBB7Dsmmp53kPXKmatwM05MUDatlWSgATE",
    },
    {
      url: "https://fastly.picsum.photos/id/6/5000/3333.jpg?hmac=pq9FRpg2xkAQ7J9JTrBtyFcp9-qvlu8ycAi7bUHlL7I",
    },
    {
      url: "https://fastly.picsum.photos/id/48/5000/3333.jpg?hmac=y3_1VDNbhii0vM_FN6wxMlvK27vFefflbUSH06z98so",
    },

    {
      url: "https://images.unsplash.com/photo-1624913503273-5f9c4e980dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    timeoutRef.current = setTimeout(() => nextSlide(), delay);

    return () => {
      resetTimeout();
    };
  }, [currentIndex, nextSlide]);

  return (
    <div className="max-w-full h-[580px] w-full m-auto relative group">
      <Image
        className={`w-full h-full duration-500`}
        src={`${slides[currentIndex].url}`}
        alt="Featured products image"
        fill
        priority
        objectFit="cover"
        objectPosition="center"
      />
      {/* Left Arrow */}
      <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronLeftCircle onClick={prevSlide} size={40} />
      </div>
      {/* Right Arrow */}
      <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronRightCircle onClick={nextSlide} size={40} />
      </div>
      <div className="flex top-4 justify-center py-2 relative">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer relative"
          >
            <div
              className={`${
                currentIndex === slideIndex ? "bg-white" : ""
              } z-[999999] relative top-[500px] w-3 h-3 border-2 border-white rounded-full mx-2`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
