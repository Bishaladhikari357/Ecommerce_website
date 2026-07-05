"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendContactMessage,
  clearContactState,
} from "@/app/redux/Slice/ContactpageSlice";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

export default function ContactPage() {
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.contact
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (success) {
      alert("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      dispatch(clearContactState());
    }
  }, [success, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(sendContactMessage(formData));
  };

  return (
    <section className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
            Contact Us
          </span>

          <h1 className="text-4xl font-bold mt-4">
            Get In <span className="text-red-500">Touch</span>
          </h1>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Have questions about our products?
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Contact Info */}
          <div className="space-y-6">

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex gap-4 items-center">
                <FaPhoneAlt className="text-red-500 text-xl" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p>+977 9867330928</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex gap-4 items-center">
                <FaEnvelope className="text-red-500 text-xl" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p>support@bevora.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex gap-4 items-center">
                <FaMapMarkerAlt className="text-red-500 text-xl" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p>Kathmandu, Nepal</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex gap-4 items-center">
                <FaClock className="text-red-500 text-xl" />
                <div>
                  <h3 className="font-semibold">Working Hours</h3>
                  <p>Sun - Fri : 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-8">

            <h2 className="text-2xl font-bold mb-6">
              Send Us a Message
            </h2>

            {error && (
              <div className="mb-5 bg-red-100 text-red-600 p-3 rounded-lg">
                {JSON.stringify(error)}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <div className="grid md:grid-cols-2 gap-5">

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border rounded-lg px-4 py-3 w-full"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border rounded-lg px-4 py-3 w-full"
                />

              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-3 w-full"
              />

              <textarea
                rows={6}
                name="message"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-3 w-full"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>

          </div>

        </div>

        {/* Map */}
        <div className="mt-14 rounded-2xl overflow-hidden shadow">
          <iframe
            src="https://www.google.com/maps?q=Kathmandu,Nepal&output=embed"
            width="100%"
            height="400"
            loading="lazy"
            className="border-0"
            allowFullScreen
          />
        </div>

      </div>
    </section>
  );
}