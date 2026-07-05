"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "@/app/redux/Slice/BlogsSlice";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Page() {
  const dispatch = useDispatch();

  const { blogs, loading, error } = useSelector(
    (state) => state.blogs
  );

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading)
    return (
      <h1 className="text-center py-20 text-xl">
        Loading...
      </h1>
    );

  if (error)
    return (
      <h1 className="text-center py-20 text-red-500">
        {error}
      </h1>
    );

  if (!blogs.length) return null;

  const featured = blogs[0];
  const sideBlogs = blogs.slice(1, 3);

  return (
   <section className="max-w-7xl mx-auto px-6 py-20">

    {/* Heading */}

    <div className="mb-12">

        <div className="flex items-center gap-4 mb-4">

            <div className="w-14 h-[3px] bg-red-600 rounded-full"></div>

            <p className="uppercase tracking-[4px] text-gray-500 font-semibold">
                OUR BLOGS
            </p>

        </div>

        <h2 className="text-5xl font-black">

            Latest{" "}

            <span className="text-red-600">
                Articles
            </span>

        </h2>

    </div>

    <div className="grid lg:grid-cols-3 gap-8">

        {/* Featured Blog */}

        <Link
            href={`/blogs/${featured.slug}`}
            className="lg:col-span-2 relative rounded-3xl overflow-hidden group"
        >

            <img
                src={featured.image}
                alt={featured.title}
                className="h-[420px] w-full object-cover group-hover:scale-110 duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-10">

                <span className="bg-red-600 text-white px-5 py-2 rounded-full text-sm font-semibold">
                    {featured.category}
                </span>

                <h2 className="mt-6 text-white text-5xl font-bold leading-tight max-w-3xl">
                    {featured.title}
                </h2>

                <p className="text-gray-200 mt-5 text-lg line-clamp-2">
                    {featured.short_description}
                </p>

                <div className="flex items-center gap-5 mt-8 text-white text-sm">

                    <span>{featured.author}</span>

                    <span>•</span>

                    <span>
                        {new Date(featured.created_at).toLocaleDateString()}
                    </span>

                </div>

                <button className="mt-8 bg-red-600 hover:bg-white hover:text-black transition-all duration-300 text-white px-8 py-4 rounded-full font-semibold">
                    Read Full Article →
                </button>

            </div>

        </Link>

        {/* Right Side */}

        <div className="space-y-8">

            {sideBlogs.map((blog) => (

                <Link
                    href={`/blogs/${blog.slug}`}
                    key={blog.id}
                    className="group flex gap-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 hover:-translate-y-2"
                >

                    <div className="w-36 h-32 rounded-xl overflow-hidden flex-shrink-0">

                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-110 duration-500"
                        />

                    </div>

                    <div className="flex-1">

                        <span className="text-xs font-semibold uppercase tracking-wider text-red-600">
                            {blog.category}
                        </span>

                        <h3 className="mt-2 text-xl font-bold leading-7 line-clamp-2 group-hover:text-red-600 transition">
                            {blog.title}
                        </h3>

                        <p className="text-gray-500 mt-2 line-clamp-2">
                            {blog.short_description}
                        </p>

                        <div className="flex items-center justify-between mt-4 text-sm text-gray-400">

                            <span>{blog.author}</span>

                            <span>
                                {new Date(blog.created_at).toLocaleDateString()}
                            </span>

                        </div>

                    </div>

                </Link>

            ))}

        </div>

    </div>

</section>
  );
}