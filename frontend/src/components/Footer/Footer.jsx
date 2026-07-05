"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaApplePay,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300">

      {/* Newsletter */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-5 py-12 flex flex-col lg:flex-row justify-between items-center gap-8">

          <div>
            <h2 className="text-3xl font-bold text-white">
              Stay Updated
            </h2>

            <p className="mt-2 text-gray-400">
              Subscribe and receive exclusive offers, discounts and new arrivals.
            </p>
          </div>

          <div className="flex w-full lg:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full lg:w-96 px-5 py-4 rounded-l-lg bg-gray-900 border border-gray-700 outline-none"
            />

            <button className="bg-red-500 hover:bg-red-600 px-8 rounded-r-lg font-semibold transition">
              Subscribe
            </button>
          </div>

        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-5 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo */}
        <div>
          <h2 className="text-4xl font-black text-white">
            BEVORA
          </h2>

          <p className="mt-5 leading-7">
            Your trusted destination for electronics,
            fashion, gadgets and everyday essentials.
            Fast delivery, secure payments and premium service.
          </p>

          <div className="flex gap-4 mt-8">

            <a className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-500 flex items-center justify-center transition">
              <FaFacebookF />
            </a>

            <a className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-500 flex items-center justify-center transition">
              <FaInstagram />
            </a>

            <a className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-500 flex items-center justify-center transition">
              <FaTwitter />
            </a>

            <a className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-500 flex items-center justify-center transition">
              <FaYoutube />
            </a>

          </div>

        </div>

        {/* Company */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">
            Company
          </h3>

          <ul className="space-y-4">

            <li><Link href="/about" className="hover:text-red-400">About Us</Link></li>

            <li><Link href="/shop" className="hover:text-red-400">Shop</Link></li>

            <li><Link href="/blog" className="hover:text-red-400">Blog</Link></li>

            <li><Link href="/contact" className="hover:text-red-400">Contact</Link></li>

            <li><Link href="/careers" className="hover:text-red-400">Careers</Link></li>

          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">
            Help
          </h3>

          <ul className="space-y-4">

            <li><Link href="/shipping" className="hover:text-red-400">Shipping</Link></li>

            <li><Link href="/returns" className="hover:text-red-400">Returns</Link></li>

            <li><Link href="/track-order" className="hover:text-red-400">Track Order</Link></li>

            <li><Link href="/faq" className="hover:text-red-400">FAQs</Link></li>

            <li><Link href="/privacy-policy" className="hover:text-red-400">Privacy Policy</Link></li>

          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">
            Contact
          </h3>

          <div className="space-y-5">

            <div className="flex gap-3">
              <FaPhoneAlt className="text-red-500 mt-1" />
              <span>+977 9867330928</span>
            </div>

            <div className="flex gap-3">
              <FaEnvelope className="text-red-500 mt-1" />
              <span>support@bevora.com</span>
            </div>

            <div className="flex gap-3">
              <FaMapMarkerAlt className="text-red-500 mt-1" />
              <span>Kathmandu, Nepal</span>
            </div>

          </div>

          <div className="flex gap-4 text-4xl mt-8 text-gray-400">

            <FaCcVisa />

            <FaCcMastercard />

            <FaCcPaypal />

            <FaApplePay />

          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-5 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} BEVORA. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">

            <Link href="/terms" className="hover:text-red-400">
              Terms
            </Link>

            <Link href="/privacy-policy" className="hover:text-red-400">
              Privacy
            </Link>

            <Link href="/cookies" className="hover:text-red-400">
              Cookies
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}