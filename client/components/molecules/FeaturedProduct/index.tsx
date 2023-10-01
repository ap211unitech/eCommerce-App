"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./style.css";

import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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

const FeaturedProductCarousel = () => {
  return (
    <Swiper
      navigation
      pagination={{ clickable: true }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      rewind
      modules={[Navigation, Pagination, Autoplay]}
      className="h-[32rem] w-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src={slide.url}
              alt="Featured Product Image"
              className="block h-full w-full object-cover"
              fill
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FeaturedProductCarousel;
