import React, { useState } from "react";
import { Mail, Phone, MessageCircle, Send, Clock } from "lucide-react";
import { Header } from "./index.js";

function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Support Info */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            We're Here to Help
          </h2>
          <div className="flex items-center justify-center gap-2 text-indigo-600">
            <Clock className="h-5 w-5" />
            <p className="font-medium">Available 24/7 for urgent matters</p>
          </div>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <Mail className="text-blue-600 h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email Support</h3>
                <p className="text-sm text-gray-500">Get help via email</p>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <Mail size={18} />
              Send Email
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <Phone className="text-green-600 h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Phone Support</h3>
                <p className="text-sm text-gray-500">Talk to an expert</p>
              </div>
            </div>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
              <Phone size={18} />
              Call Now
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-emerald-50 p-3 rounded-lg">
                <MessageCircle className="text-emerald-600 h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                <p className="text-sm text-gray-500">Message us on WhatsApp</p>
              </div>
            </div>
            <button className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
              <MessageCircle size={18} />
              Open WhatsApp
            </button>
          </div>
        </div>

        {/* Contact Form */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Send us a Message
          </h2>
          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <div className="flex-shrink-0">✓</div>
              <p>Thank you for your message! We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter subject"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Type your message here"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}

export default Support;
