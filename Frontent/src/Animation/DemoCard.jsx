import { motion } from "framer-motion";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import aiSoundsec from "../assets/soundvoice.gif";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function DemoCard() {
   const user = useSelector(state => state.user.userData);
   const navigate=useNavigate();
  const commands = [
    `"Hey, open YouTube and play some chill music"`,
    `"Search Google for best pizza places near me"`,
    `"Open Twitter and check my notifications"`,
    `"Navigate to GitHub and open my repositories"`,
  ];

  const float = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const orbitDot = {
    animate: {
      x: [0, 6, -6, 0],
      y: [0, -6, 6, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const orbitRingAnimation = (delay = 0) => ({
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.6, 0.9, 0.6],
      transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay },
    },
  });

  return (
    <section className="px-6  sm:py-16 md:py-20 bg-[#0A0D14] text-slate-100" id="demo">
      <div 
        className="
          max-w-7xl mx-auto rounded-3xl bg-[#070B12] 
          backdrop-blur-xl border border-white/5 
          p-6 sm:p-10 md:p-16 
          flex flex-col lg:flex-row gap-12 lg:gap-14
        "
      >

        {/* LEFT TEXT SIDE */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            See It In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Action
            </span>
          </h2>

          <p className="mt-4 text-slate-300 max-w-md mx-auto lg:mx-0">
            Experience the future of voice interaction. Try these commands or create your own.
          </p>

          {/* Commands */}
          <div className="mt-8 space-y-4 cursor-pointer">
            {commands.map((cmd, index) => (
              <div
                key={index}
                className="
                  flex items-center gap-3 
                  bg-white/5 px-4 sm:px-5 py-3 rounded-xl 
                  border border-white/10 
                  hover:bg-white/10 transition
                "
              >
                <span className="text-xl"><HiOutlineSpeakerWave /></span>
                <p className="text-slate-200 text-sm sm:text-base">{cmd}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT ANIMATION SIDE */}
        <div className="relative flex-1 flex justify-center items-center max-md:pt-10">

          {/* Outer Glow */}
          <div className="absolute w-[250px] sm:w-[350px] md:w-[420px] h-[250px] sm:h-[350px] md:h-[420px] rounded-full bg-cyan-500/5 blur-[90px]" />

          {/* Orbit Rings */}
          <motion.div
            className="absolute rounded-full 
              w-[220px] sm:w-[300px] md:w-[360px] 
              h-[220px] sm:h-[300px] md:h-[360px]
              border border-cyan-400/20"
            variants={orbitRingAnimation(0)}
            animate="animate"
          />
          <motion.div
            className="absolute rounded-full 
              w-[160px] sm:w-[220px] md:w-[260px] 
              h-[160px] sm:h-[220px] md:h-[260px]
              border border-purple-400/20"
            variants={orbitRingAnimation(0.3)}
            animate="animate"
          />
          <motion.div
            className="absolute rounded-full 
              w-[100px] sm:w-[140px] md:w-[160px] 
              h-[100px] sm:h-[140px] md:h-[160px]
              border border-teal-400/20"
            variants={orbitRingAnimation(0.6)}
            animate="animate"
          />

          {/* Floating Dots */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-cyan-400"
              style={{
                top: `${40 + i * 20}%`,
                left: `${50 + i * 8}%`,
              }}
              variants={orbitDot}
              animate="animate"
            />
          ))}

          {/* Mic Button */}
          <motion.div
            className="
              relative z-20 
              w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32
              rounded-full 
              flex items-center justify-center cursor-pointer 
              bg-gradient-to-br from-cyan-400 to-purple-400 shadow-xl
            "
            variants={float}
            animate="animate"
          >
            <img src={aiSoundsec} alt="" className="w-10 sm:w-14 md:w-16" />

            <div onClick={()=>{user ? user.assistantImage && user.assistantName ? navigate("/assistant") : navigate('/customize'): navigate('/signup')}} className="absolute -top-6 sm:-top-8 bg-teal-500/20 text-teal-300 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs border border-teal-300/20">
              Click to start
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
