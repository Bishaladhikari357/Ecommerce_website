"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "@/app/redux/Slice/BlogsSlice";
import Link from "next/link";

export default function page() {
  const dispatch = useDispatch();

  const { blogs, loading, error } = useSelector(
    (state) => state.blogs
  );

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading)
    return <h1 className="text-center py-10">Loading...</h1>;

  if (error)
    return <h1 className="text-center py-10">{error}</h1>;

  return (
    <section className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-4xl font-bold mb-8">Latest Blogs</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <Link href={`/blogs/${blog.slug}`}
              className="block"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-56 object-cover"
              />
            </Link>
            

            <div className="p-5">
              <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                {blog.category}
              </span>

              <h2 className="text-xl font-bold mt-3">
                {blog.title}
              </h2>

              <p className="text-gray-600 mt-3">
                {blog.short_description}
              </p>

              <div className="flex justify-between items-center mt-5 text-sm text-gray-500">
                <span>{blog.author}</span>
                <span>{new Date(blog.created_at).toLocaleDateString()}</span>
              </div>

              <button className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}