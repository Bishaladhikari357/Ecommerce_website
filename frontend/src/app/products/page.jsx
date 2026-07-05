"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/app/redux/Slice/ProductSlice";
import { FaHeart, FaStar } from "react-icons/fa";

export default function page() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-2xl py-20">
        {error}
      </div>
    );
  }

  return (
    <section className="bg-gray-100 min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-5">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-blue-600 font-semibold uppercase tracking-widest">
            Shop Now
          </p>

          <h1 className="text-5xl font-extrabold mt-2">
            All Products
          </h1>

          <p className="text-gray-500 mt-3">
            Explore our wide range of products and find the perfect
            fit for your needs.
          </p>
        </div>  
          

        {/* Products */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative bg-gray-100 overflow-hidden">
                <Link
                  href={`/products/${product.slug}`}
                  className="block"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </Link>

                {/* Discount */}
                {product.discount > 0 && (
                  <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
                    {product.discount}% OFF
                  </span>
                )}

                {/* Featured */}
                {product.is_featured && (
                  <span className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                    Featured
                  </span>
                )}

                {/* Wishlist */}
                <button className="absolute right-4 bottom-4 w-11 h-11 rounded-full bg-white shadow-lg flex justify-center items-center hover:bg-red-500 hover:text-white transition cursor-pointer">
                  <FaHeart />
                </button>
              </div>

              {/* Details */}
              <div className="p-6">
                <p className="text-sm uppercase text-blue-600 font-semibold">
                  {product.brand}
                </p>

                <Link href={`/products/${product.slug}`}>
                  <h2 className="text-xl font-bold mt-2 line-clamp-2 hover:text-blue-600 transition">
                    {product.name}
                  </h2>
                </Link>

                {/* Rating */}
                <div className="flex items-center mt-3 gap-1">
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-gray-300" />

                  <span className="text-sm text-gray-500 ml-2">
                    (4.8)
                  </span>
                </div>


                {/* Stock */}
                <div className="mt-3">
                  {product.is_available ? (
                    <span className="text-green-600 font-semibold">
                      ✔ In Stock ({product.stock})
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}