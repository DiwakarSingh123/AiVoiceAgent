import React from "react";
import { motion } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function Show() {
   const user = useSelector(state => state.user.userData);
 const navigate=useNavigate();
  return (
    <div className="w-full max-md:pt-20 max-lg:pt-20 bg-black text-white relative overflow-hidden px-4 py-6 pb-20">

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

      {/* Main Content - Scroll Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.4 }}
        className="max-w-[90%] sm:max-w-[80%] lg:max-w-[60%] text-center mx-auto"
      >

        {/* Heading */}
        <h1 className="text-3xl mb-10 sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight md:leading-snug mt-0 pt-0">
          Ready to Control Your <br />
          <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#5DDCFF,#8F6BFF,#A06CFF)]">
            Digital World?
          </span>
        </h1>

        {/* Paragraph */}
        <p className="text-gray-400 mt-3 mb-15 sm:mt-4 text-base sm:text-lg md:text-xl leading-relaxed">
          Join thousands of users who've already transformed how they interact
          with technology.
          <br className="hidden sm:block" /> Start free, upgrade anytime.
        </p>

        {/* Button */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-6 sm:mt-8">
          <motion.button
          onClick={()=>{user ? user.assistantImage && user.assistantName ? navigate("/assistant") : navigate('/customize'): navigate('/signup')}}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="
              px-6 py-3 
              sm:px-8 sm:py-4 
              md:px-10 md:py-5 
              lg:px-12 lg:py-5 
              rounded-xl 
              font-semibold 
              text-black text-sm sm:text-base md:text-lg
              bg-[linear-gradient(90deg,#5DF5FF,#6E9BFF,#A06CFF)]
              shadow-[0_20px_60px_#5DF5FF30]
              flex items-center justify-center gap-2 sm:gap-3
            "
          >
            <span>Try Voice Agent Free</span>
            <FiChevronRight className="text-lg sm:text-xl" />
          </motion.button>
        </div>

        {/* Small Text */}
        <p className="text-gray-400 text-xs sm:text-sm mt-3 sm:mt-4 mb-0 pb-0">
          No credit card required • Free forever plan available
        </p>

      </motion.div>
    </div>
  );
}
