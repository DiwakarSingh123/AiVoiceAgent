// FeaturesPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiYoutube, FiSearch, FiGlobe, FiMessageSquare, FiZap, FiShield } from "react-icons/fi";

export default function Features() {
  const features = [
    {
      icon: <FiYoutube size={26} />,
      title: "Open & Control YouTube",
      desc: "Play videos, search content, control playback — all hands-free with voice commands.",
    },
    {
      icon: <FiSearch size={26} />,
      title: "Smart Google Search",
      desc: "Search the web instantly. Get answers, find information, and browse results by voice.",
    },
    {
      icon: <FiGlobe size={26} />,
      title: "Browse Any Website",
      desc: "Navigate to any website, bookmark pages, and interact with content naturally.",
    },
    {
      icon: <FiMessageSquare size={26} />,
      title: "Natural Conversations",
      desc: "Speak naturally. Our AI understands context, intent, and executes complex requests.",
    },
    {
      icon: <FiZap size={26} />,
      title: "Lightning Fast",
      desc: "Real-time processing with sub-second responses. No waiting, just doing.",
    },
    {
      icon: <FiShield size={26} />,
      title: "Secure & Private",
      desc: "Your voice data is encrypted and never stored. Complete privacy guaranteed.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#0A0D14] text-white py-16 flex justify-center" id="features">
      <div className="w-[80%] ">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center text-3xl md:text-5xl font-bold"
        >
          Everything You Need,{" "}
          <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#5DDCFF,#8F6BFF)]">
            One Voice Away
          </span>
        </motion.h1>

        <p className="text-center text-gray-400 mt-4 text-base md:text-lg">
          Powerful features designed to make your digital life effortless
        </p>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="
                bg-[#0F131C] border border-[#1b1f27] 
                rounded-xl p-6 shadow-lg 
                hover:border-[#5569FF] hover:shadow-[0_0_20px_#465CFF50] 
                transition-all
              "
            >
              {/* Gradient Icon Button */}
              <motion.button
                whileHover={{ rotate: 8, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="
                  w-14 h-14 flex items-center justify-center 
                  rounded-xl text-white
                  bg-[linear-gradient(to_right,#5DDCFF,#8F6BFF)]
                  shadow-[0_0_10px_#6F82FF90]
                "
              >
                {f.icon}
              </motion.button>

              <h3 className="text-lg font-semibold mt-5">{f.title}</h3>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
