"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSliders } from "@/app/redux/Slice/SliderSlice";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Link from "next/link";

export default function HomeSlider() {
  const dispatch = useDispatch();

  const { sliders, loading, error } = useSelector(
    (state) => state.slider
  );

  useEffect(() => {
    dispatch(fetchSliders());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-[350px] md:h-[500px] flex items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[350px] md:h-[500px] flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden">

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={sliders.length > 1}
        className="h-[320px] sm:h-[420px] md:h-[500px] lg:h-[600px] xl:h-[650px]"
      >
        {sliders.map((slider) => (
          <SwiperSlide key={slider.id}>
            <div className="relative h-full">

              {/* Background Image */}
              <img
                src={slider.image}
                alt={slider.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12">

                  <div className="max-w-xl lg:max-w-2xl animate-fadeIn">

                    <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-4">
                      🔥 BIG SALE
                    </span>

                    <h1 className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                      {slider.title}
                    </h1>

                    <p className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl mt-4 mb-8 max-w-xl">
                      {slider.subtitle}
                    </p>

                    <Link href={slider.button_link}>
                      <button className="bg-orange-500 hover:bg-orange-600 transition-all duration-300 px-5 py-3 sm:px-7 sm:py-4 rounded-lg text-sm sm:text-base lg:text-lg font-semibold shadow-xl hover:scale-105">
                        {slider.button_text}
                      </button>
                    </Link>

                  </div>

                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .animate-fadeIn {
          animation: fadeIn 0.8s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          width: 42px !important;
          height: 42px !important;
          background: rgba(0, 0, 0, 0.45);
          border-radius: 9999px;
          transition: .3s;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(0,0,0,.75);
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 18px !important;
          font-weight: bold;
        }

        @media (min-width:768px) {
          .swiper-button-next,
          .swiper-button-prev {
            width: 55px !important;
            height: 55px !important;
          }

          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 24px !important;
          }
        }

        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: white;
          opacity: .6;
        }

        .swiper-pagination-bullet-active {
          width: 28px;
          border-radius: 9999px;
          background: #f97316;
          opacity: 1;
        }
      `}</style>

    </section>
  );
}