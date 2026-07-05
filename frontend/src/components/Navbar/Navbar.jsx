"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useUser,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import {
  FaPhoneVolume,
  FaEnvelope,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const socialLinks = [
    {
      platform_name: "facebook",
      link: "https://www.facebook.com/bishal.adhikari.94695",
    },
    {
      platform_name: "instagram",
      link: "https://www.instagram.com/bishaladhikari859/",
    },
    {
      platform_name: "youtube",
      link: "https://www.youtube.com/@odgnepal",
    },
    {
      platform_name: "twitter",
      link: "https://twitter.com/odgnepal",
    },
  ];

  const platformIcons = {
    facebook: FaFacebookF,
    instagram: FaInstagram,
    youtube: FaYoutube,
    twitter: FaTwitter,
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow">

      {/* TOP BAR */}
      <div className="hidden lg:flex justify-between items-center bg-gray-900 text-white text-xs px-6 py-2">

        <div className="flex gap-6">

          <div className="flex items-center gap-2">
            <FaPhoneVolume />
            <span>+977 9867330928</span>
          </div>

          <div className="flex items-center gap-2">
            <FaEnvelope />
            <span>support@bevora.com</span>
          </div>

          <div className="flex items-center gap-2">
            <FaWhatsapp />
            <span>+977 9867330928</span>
          </div>

        </div>

        <div className="flex items-center gap-3">

          <span>Follow Us</span>

          {socialLinks.map((item, index) => {
            const Icon = platformIcons[item.platform_name];

            return (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500"
              >
                <Icon />
              </a>
            );
          })}

        </div>

      </div>

      {/* MAIN NAVBAR */}
      <nav className="max-w-7xl mx-auto px-4 lg:px-6">

        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link href="/" className="text-2xl font-bold">
            <span>Be</span>
            <span className="text-red-500">vora</span>
          </Link>

          {/* SEARCH */}
          <div className="hidden md:flex flex-1 mx-8">

            <div className="flex w-full border rounded-full overflow-hidden">

              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 outline-none"
              />

              <button className="bg-red-500 text-white px-5">
                <FiSearch />
              </button>

            </div>

          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-8">

            <ul className="flex gap-6 font-medium">

              <li>
                <Link href="/">Home</Link>
              </li>

              <li>
                <Link href="/products">Shop</Link>
              </li>

              

              <li>
                <Link href="/blogs">Blogs</Link>
              </li>

              <li>
                <Link href="/contact">Contact</Link>
              </li>

            </ul>

            {/* CART */}
            <Link
              href="/cart"
              className="relative hover:text-red-500"
            >
              <FaShoppingCart className="text-2xl" />

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>

            </Link>

            {/* AUTH */}
            {!isSignedIn ? (
              <div className="flex gap-3">

                <SignInButton mode="modal">
                  <button className="font-medium">
                    Sign In
                  </button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <button className="bg-red-500 text-white px-5 py-2 rounded-full">
                    Sign Up
                  </button>
                </SignUpButton>

              </div>
            ) : (
              <UserButton afterSignOutUrl="/" />
            )}

          </div>

          {/* MOBILE RIGHT */}
          <div className="flex items-center gap-4 lg:hidden">

            <Link href="/cart" className="relative">
              <FaShoppingCart className="text-xl" />

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

          </div>

        </div>

      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (

        <div className="lg:hidden border-t bg-white">

          <div className="p-4">

            {/* Search */}
            <div className="flex border rounded-full overflow-hidden mb-6">

              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 outline-none"
              />

              <button className="bg-red-500 text-white px-4">
                <FiSearch />
              </button>

            </div>

            {/* Links */}
            <div className="flex flex-col gap-4 font-medium">

              <Link href="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>

              <Link href="/products" onClick={() => setMenuOpen(false)}>
                Shop
              </Link>

             

              <Link href="/blogs" onClick={() => setMenuOpen(false)}>
                Blogs
              </Link>

              <Link href="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>

            </div>

            {/* Auth */}
            <div className="mt-6">

              {!isSignedIn ? (

                <div className="flex flex-col gap-3">

                  <SignInButton mode="modal">
                    <button className="border rounded-lg py-2">
                      Sign In
                    </button>
                  </SignInButton>

                  <SignUpButton mode="modal">
                    <button className="bg-red-500 text-white py-2 rounded-lg">
                      Sign Up
                    </button>
                  </SignUpButton>

                </div>

              ) : (
                <UserButton afterSignOutUrl="/" />
              )}

            </div>

          </div>

        </div>

      )}

    </header>
  );
};

export default Navbar;