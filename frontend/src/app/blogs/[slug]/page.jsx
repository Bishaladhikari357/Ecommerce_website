"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogDetail } from "@/app/redux/Slice/BlogsDetailSlice";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function BlogDetailPage() {
  const { slug } = useParams();

  const dispatch = useDispatch();

  const { blog, loading, error } = useSelector(
    (state) => state.blogDetail
  );

  useEffect(() => {
    if (slug) {
      dispatch(fetchBlogDetail(slug));
    }
  }, [dispatch, slug]);

  if (loading)
    return (
      <div className="text-center py-20 text-xl">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        {error}
      </div>
    );

  if (!blog) return null;

  return (
    <section className="max-w-5xl mx-auto px-5 py-12">

      <Link
        href="/blogs"
        className="text-blue-600 hover:underline"
      >
        ← Back to Blogs
      </Link>

      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-[450px] object-cover rounded-xl mt-5"
      />

      <div className="mt-8">

        <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
          {blog.category}
        </span>

        <h1 className="text-4xl font-bold mt-5">
          {blog.title}
        </h1>

        <div className="flex flex-wrap gap-6 text-gray-500 mt-4">

          <span>
            👤 {blog.author}
          </span>

          <span>
            📅 {new Date(blog.created_at).toLocaleDateString()}
          </span>

          <span>
            👁 {blog.views} Views
          </span>

        </div>

        <p className="text-lg text-gray-600 mt-6">
          {blog.short_description}
        </p>

        <div className="mt-8 leading-8 text-gray-700 whitespace-pre-line">
          {blog.content}
        </div>

        <div className="mt-10">
          <h3 className="font-bold text-xl mb-3">
            Tags
          </h3>

          <div className="flex flex-wrap gap-3">
            {blog.tags
              ?.split(",")
              .map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 px-4 py-2 rounded-full"
                >
                  {tag.trim()}
                </span>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}