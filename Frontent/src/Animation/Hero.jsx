
import React from "react";
import { motion } from "framer-motion";
import { FiPlay, FiChevronRight } from "react-icons/fi";
import { FcMindMap } from "react-icons/fc";
// import { FcMindMap } from "react-icons/fc";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

export default function HeroSection() {
  const user = useSelector(state => state.user.userData);
 const navigate=useNavigate();
  return (
    <div className="w-full min-h-screen bg-[#070A0F] text-white flex justify-center">
       {/* Floating Bubbles */}
            <motion.div
              className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-[#2998b7] rounded-full"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ left: "15%", top: "35%" }}
            />
      
            <motion.div
              className="absolute w-4 h-4 sm:w-6 sm:h-6 bg-[#2998b7] rounded-full"
              animate={{ y: [0, 25, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ right: "18%", top: "45%" }}
            />
            <motion.div
             className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-[#2998b7] rounded-full"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ right: "25%", top: "80%" }}
            />
            <motion.div
              className="absolute w-4 h-4 sm:w-6 sm:h-6 bg-[#2998b7] rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ right: "50%", top: "42%" }}
            />
      <div className="w-[80%] py-16">

       

        {/* Small powered badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-fit mx-auto mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mt-10 rounded-full border border-[#24313a] text-[#8ad1d8] text-sm">
            <span className="text-xs animate-[spin_1.5s_linear_infinite]"><FcMindMap size={25}/></span>
            <span>Powered by Gemni & Open AI</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center font-extrabold leading-tight"
        >
          <span className="text-[54px] md:text-[86px] lg:text-[108px] block text-white">
            Your Voice is the
          </span>

          <span
            className="block text-[54px] md:text-[86px] lg:text-[108px] font-extrabold text-transparent bg-clip-text
                       bg-[linear-gradient(90deg,#5DF5FF,#6E9BFF,#A06CFF)]"
          >
            Command
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto text-center text-gray-400 mt-6 text-base md:text-lg"
        >
          Meet your AI voice assistant that understands and executes. Open YouTube, search Google,
          control your apps — all with natural conversation.
        </motion.p>

        {/* CTA + Animated orb */}
        <div className="mt-10 flex flex-col items-center gap-8">
          <div className="flex items-center max-md:flex-col gap-5">
            {/* Primary gradient CTA */}
            <motion.button
              onClick={()=>{user ? user.assistantImage && user.assistantName ? navigate("/assistant") : navigate('/customize'): navigate('/signup')}}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="
                px-8 py-4 rounded-xl font-semibold text-black
                bg-[linear-gradient(90deg,#5DF5FF,#6E9BFF,#A06CFF)]
                shadow-[0_20px_60px_#5DF5FF30]
                flex items-center gap-3
              "
            >
              <span>Try Voice Agent Free</span>
              <FiChevronRight />
            </motion.button>

            {/* Secondary outline CTA */}
            <motion.button
             onClick={()=>{user ? user.assistantImage && user.assistantName ? navigate("/assistant") : navigate('/customize'): navigate('/signup')}}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="
                px-6 py-3 rounded-xl border border-[#253341]
                text-gray-200 hover:border-[#4CAFFF] transition
                flex items-center gap-2
              "
            >
              <FiPlay />
              <span>Watch Demo</span>
            </motion.button>
          </div>

          {/* Animated circular orb under CTA (glow + ripple) */}
          <div className="relative mt-2">
            {/* central orb */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.9, 1, 0.95], opacity: [0.6, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 2.4 }}
              className="w-28 h-28 rounded-full flex items-center justify-center
                         bg-gradient-to-r from-[#88F7F3] to-[#9C86FF] bg-[linear-gradient(90deg,#5DF5FF,#6E9BFF,#A06CFF)]
                         shadow-[0_0_40px_#5DF5FF55] z-20"
            >
              <div className="w-14 h-14 rounded-full bg-[#07121a] flex items-center justify-center
                              border border-[#2b4150]">
                <div className="w-6 h-6 rounded-full bg-white/90"></div>
              </div>
            </motion.div>

            {/* outer ripples using motion divs */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0.18 }}
              animate={{ scale: [0.6, 1.35], opacity: [0.18, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, delay: 0.15 }}
              className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-[#2b4a4f] z-10"
            />
            <motion.div
              initial={{ scale: 0.5, opacity: 0.12 }}
              animate={{ scale: [0.5, 1.6], opacity: [0.12, 0] }}
              transition={{ repeat: Infinity, duration: 3.6 }}
              className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-[#15343a] z-0"
            />
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-3xl font-extrabold text-[#79D6FF]"
            >
              200+
            </motion.div>
            <div className="text-gray-400 mt-2">Active Users</div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-extrabold text-[#79D6FF]"
            >
              1K+
            </motion.div>
            <div className="text-gray-400 mt-2">Commands Run</div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-extrabold text-[#79D6FF]"
            >
              99%
            </motion.div>
            <div className="text-gray-400 mt-2">Accuracy</div>
          </div>
        </div>

      </div>
    </div>
  );
}
