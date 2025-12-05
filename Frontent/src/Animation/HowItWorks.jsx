// HowItWorks.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiMic } from "react-icons/fi";
import { FcMindMap } from "react-icons/fc";
import { LuRocket } from "react-icons/lu";

//FiBrain, FiSend
export default function HowItWorks() {
  const steps = [
    {
      icon: <FiMic size={40} />,
      num: "01",
      title: "Speak Your Command",
      desc: `Just say what you want to do. "Open YouTube and play lo-fi music" or 
      "Search for the best restaurants nearby."`,
    },
    {
      icon: <FcMindMap  size={40} />,
      num: "02",
      title: "AI Understands",
      desc: `Our advanced AI processes your voice, understands context and intent, 
      and determines the best action to take.`,
    },
    {
      icon: <LuRocket size={40} />,
      num: "03",
      title: "Action Executed",
      desc: `Watch as your command comes to life. Apps open, searches happen, and tasks 
      complete — all in real-time.`,
    },
  ];

  return (
    <div className="w-full py-24 bg-[#070B12] flex justify-center text-white" id="how">
      <div className="w-[80%]">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center text-3xl md:text-5xl font-bold"
        >
          How It{" "}
          <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#5DDCFF,#8F6BFF)]">
            Works
          </span>
        </motion.h2>

        <p className="text-center text-gray-400 mt-3 text-base md:text-lg">
          Three simple steps to hands-free productivity
        </p>

        {/* Steps Container */}
        <div className="relative mt-20 flex flex-col md:flex-row items-center md:justify-between gap-16">

          {/* Horizontal Line (Center Line) */}
          <div className="hidden md:block absolute top-[85px] left-0 right-0 h-[2px] bg-[#0F1925]"></div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative flex flex-col items-center text-center w-full md:w-1/3"
            >
              {/* Glowing Circle */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                className="
                  w-40 h-40 rounded-full bg-[#0C111A]
                  flex items-center justify-center
                  shadow-[0_0_60px_#00F0FF30]
                  border border-[#0D2538]
                "
              >
                <div className="text-[#52F3FF]">{step.icon}</div>
              </motion.div>

              {/* Number Badge */}
              <div
                className="
                  absolute top-[-12px] right-[75px] 
                  w-10 h-10 rounded-full flex items-center justify-center
                  text-sm font-semibold
                  bg-[linear-gradient(to_bottom,#55D7FF,#8F6BFF)]
                  text-white shadow-xl
                "
              >
                {step.num}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>

              {/* Description */}
              <p className="text-gray-400 text-sm md:text-base mt-3 leading-relaxed max-w-[300px]">
                {step.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
}
