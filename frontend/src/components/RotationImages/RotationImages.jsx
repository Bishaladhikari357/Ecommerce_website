// "use client";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchRotationImages } from "@/app/redux/Slice/RotationimageSlice";

// export default function RotationImages() {
//   const dispatch = useDispatch();

//   const { rotationImages, loading, error } = useSelector(
//     (state) => state.rotationImages
//   );

//   useEffect(() => {
//     dispatch(fetchRotationImages());
//   }, [dispatch]);

//   if (loading) return <h1>Loading...</h1>;

//   if (error) return <h1>{error}</h1>;

//   return (
//     <div className="grid grid-cols-3 gap-5">
//       {rotationImages.map((item) => (
//         <div key={item.id}>
//           <img
//             src={item.image}
//             alt={item.title}
//             className="w-full h-64 object-cover rounded-lg"
//           />

//           <h2 className="mt-3 text-center font-semibold">
//             {item.title}
//           </h2>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRotationImages } from "@/app/redux/Slice/RotationimageSlice";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function RotationImages() {
  const dispatch = useDispatch();

  const { rotationImages, loading, error } = useSelector(
    (state) => state.rotationImages
  );

  useEffect(() => {
    dispatch(fetchRotationImages());
  }, [dispatch]);

  if (loading)
    return (
      <div className="text-center py-10 text-lg">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        {error}
      </div>
    );

  return (
    <section className="max-w-7xl mx-auto py-12 px-4">

     <Swiper
  modules={[Autoplay]}
  loop={true}
  allowTouchMove={false}
  speed={5000} // Higher = slower continuous movement
  autoplay={{
    delay: 0,
    disableOnInteraction: false,
    reverseDirection: true, // true = left → right, false = right → left
  }}
  spaceBetween={20}
  breakpoints={{
    0: {
      slidesPerView: 2,
    },
    640: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 6,
    },
  }}
>
  {[...rotationImages, ...rotationImages].map((item, index) => (
    <SwiperSlide key={`${item.id}-${index}`}>
      <div className="flex flex-col items-center">
        <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className="mt-3 text-center font-semibold">
          {item.title}
        </h3>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
    </section>
  );
}