"use client";

import { use } from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "@/app/redux/Slice/ProductDetailsSlice";

import {
  FaStar,
  FaShoppingCart,
  FaBolt,
  FaHeart,
  FaTruck,
  FaShieldAlt,
  FaUndo,
} from "react-icons/fa";

export default function ProductDetailsPage({ params }) {
  const { slug } = use(params);

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

const imageRef = useRef(null);

const [showZoom, setShowZoom] = useState(false);

const [position, setPosition] = useState({
  x: 50,
  y: 50,
});
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(fetchProductDetails(slug));
  }, [dispatch, slug]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 text-2xl">
        {error}
      </div>
    );
  }

  if (!product) return null;

  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-5">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2 gap-10 p-8">

          {/* IMAGE */}
        <div className="flex gap-8 relative">

  {/* Main Image */}
  <div
    ref={imageRef}
    className="relative w-full h-[550px] bg-gray-50 rounded-xl overflow-hidden border cursor-crosshair"
    onMouseEnter={() => setShowZoom(true)}
    onMouseLeave={() => setShowZoom(false)}
    onMouseMove={(e) => {
      const rect = imageRef.current.getBoundingClientRect();

      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setPosition({ x, y });
    }}
  >

    {product.discount > 0 && (
      <span className="absolute top-4 left-4 z-20 bg-red-600 text-white px-4 py-2 rounded-full font-semibold">
        {product.discount}% OFF
      </span>
    )}

    <img
      src={product.image}
      alt={product.name}
      className="w-full h-full object-contain"
    />
  </div>

  {/* Large Preview */}
  {showZoom && (
    <div className="absolute left-full top-0 ml-8 z-50 hidden xl:block">

      <div
       className="w-[470px] h-[450px] rounded-xl border shadow-2xl bg-white"
        style={{
          backgroundImage: `url(${product.image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "250%",
          backgroundPosition: `${position.x}% ${position.y}%`,
        }}
      />

    </div>
  )}

</div>

          {/* DETAILS */}
          <div>

            <p className="text-blue-600 uppercase font-semibold">
              {product.brand}
            </p>

            <h1 className="text-4xl font-bold mt-2">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-4">
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-gray-300" />

              <span className="ml-2 text-gray-500">
                4.8 (256 Reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-8">

              <h2 className="text-5xl font-bold text-red-600">
                Rs. {Number(product.final_price).toLocaleString()}
              </h2>

              <div className="flex items-center gap-4 mt-3">
                <span className="line-through text-gray-400 text-xl">
                  Rs. {Number(product.price).toLocaleString()}
                </span>

                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold">
                  Save {product.discount}%
                </span>
              </div>

            </div>

            {/* Stock */}
            <div className="mt-6">
              {product.is_available ? (
                <span className="text-green-600 font-bold text-lg">
                  ✔ In Stock ({product.stock})
                </span>
              ) : (
                <span className="text-red-600 font-bold">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Category */}
            <p className="mt-4">
              <strong>Category:</strong> {product.category}
            </p>

            {/* Description */}
            <p className="mt-8 text-gray-600 leading-8">
              {product.description}
            </p>

          {/* Quantity */}
{/* Quantity */}
<div className="mt-8">
  <h3 className="font-semibold mb-3">Quantity</h3>

  <div className="flex items-center gap-4">
    <div className="flex items-center border rounded-lg overflow-hidden">

      {/* Minus */}
      <button
        onClick={() =>
          setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
        }
        className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-xl font-bold"
      >
        -
      </button>

      {/* Quantity */}
      <span className="px-8 py-3 text-lg font-bold">
        {quantity}
      </span>

      {/* Plus */}
      <button
        onClick={() =>
          setQuantity((prev) =>
            prev < product.stock ? prev + 1 : prev
          )
        }
        className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-xl font-bold"
      >
        +
      </button>

    </div>

    <span className="text-gray-500">
      Available Stock: <strong>{product.stock}</strong>
    </span>
  </div>

  {/* Message */}
  {quantity === product.stock && product.stock > 0 && (
    <p className="mt-3 text-orange-600 font-medium">
      Maximum available stock reached.
    </p>
  )}

  {product.stock === 0 && (
    <p className="mt-3 text-red-600 font-medium">
      Out of Stock
    </p>
  )}
</div>

            {/* Buttons */}
            <div className="grid grid-cols-3 gap-4 mt-10">

              <button className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-3">
                <FaShoppingCart />
                Add to Cart
              </button>

              <button className="border rounded-xl hover:bg-red-500 hover:text-white transition flex justify-center items-center">
                <FaHeart size={22} />
              </button>

            </div>

            <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-3">
              <FaBolt />
              Buy Now
            </button>

            {/* Services */}
            <div className="grid grid-cols-3 gap-4 mt-10">

              <div className="border rounded-xl p-4 text-center">
                <FaTruck className="mx-auto text-2xl text-blue-600" />
                <p className="mt-2 text-sm">
                  Free Delivery
                </p>
              </div>

              <div className="border rounded-xl p-4 text-center">
                <FaShieldAlt className="mx-auto text-2xl text-green-600" />
                <p className="mt-2 text-sm">
                  Warranty
                </p>
              </div>

              <div className="border rounded-xl p-4 text-center">
                <FaUndo className="mx-auto text-2xl text-red-600" />
                <p className="mt-2 text-sm">
                  7-Day Return
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}