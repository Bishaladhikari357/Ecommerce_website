"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../app/redux/Slice/ProductSlice";

export default function ProductList() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div className="grid grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg p-4 shadow-md"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-52 object-cover rounded"
          />

          <h2 className="text-xl font-bold mt-3">
            {product.name}
          </h2>

          <p>{product.brand}</p>

          <p>{product.category}</p>

          <p className="text-red-600 font-bold">
            Rs. {product.final_price}
          </p>

          <p className="line-through text-gray-500">
            Rs. {product.price}
          </p>

          <button className="bg-blue-600 text-white px-4 py-2 rounded mt-3">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}