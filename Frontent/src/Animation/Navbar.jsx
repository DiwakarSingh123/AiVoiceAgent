import React, { useState } from "react";
import { MdMicNone } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const user = useSelector(state => state.user.userData);
  const navigate = useNavigate();

  return (
    <header className="w-full fixed top-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">

      <div className="w-[80%] mx-auto py-4 flex items-center justify-between">

        {/* Logo */}
        <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-[linear-gradient(90deg,#5DF5FF,#6E9BFF,#A06CFF)] shadow-[0_20px_60px_#5DF5FF30] flex items-center justify-center">
            <span className="text-white text-[25px]">
              <MdMicNone />
            </span>
          </div>
          <span className="font-semibold text-white text-lg tracking-wide">
            VoiceAgent
          </span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-gray-300 text-sm">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#how" className="hover:text-white transition">How It Works</a>
          <a href="#demo" className="hover:text-white transition">Demo</a>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">

          {user == null && (
            <button
              onClick={() => navigate('/signin')}
              className="hidden md:block px-5 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 transition"
            >
              Sign In
            </button>
          )}

          <button
            onClick={() => {
              user
                ? user.assistantImage && user.assistantName
                  ? navigate("/assistant")
                  : navigate('/customize')
                : navigate('/signup');
            }}
            className="hidden md:block px-5 py-2 rounded-lg font-semibold border-2 border-sky-300 
                     text-transparent bg-clip-text bg-[linear-gradient(90deg,#5DF5FF,#6E9BFF,#A06CFF)]
                     shadow-md hover:shadow-xl active:scale-95 transition"
          >
            Get Started
          </button>

          {/* Mobile Menu Icon */}
          <button className="md:hidden text-white text-3xl" onClick={() => setOpen(!open)}>
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/40 backdrop-blur-xl border-t border-white/10 w-full">
          <div className="w-[80%] mx-auto py-4 flex flex-col gap-4 text-gray-300">

            {/* ✅ Mobile Links (fixed) */}
            <nav className="flex flex-col gap-3 text-gray-300 text-sm">
              <a href="#features" className="hover:text-white transition" onClick={()=>setOpen(false)}>Features</a>
              <a href="#how" className="hover:text-white transition" onClick={()=>setOpen(false)}>How It Works</a>
              <a href="#demo" className="hover:text-white transition" onClick={()=>setOpen(false)}>Demo</a>
            </nav>

            {/* Sign In (Mobile Only) */}
            {user == null && (
              <button
                onClick={() => navigate('/signin')}
                className="px-5 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 transition"
              >
                Sign In
              </button>
            )}

            <button
              onClick={() => {
                user
                  ? user.assistantImage && user.assistantName
                    ? navigate("/assistant")
                    : navigate('/customize')
                  : navigate('/signup');
              }}
              className="px-5 py-2 rounded-lg font-semibold border-2 border-sky-300 
                         text-transparent bg-clip-text bg-[linear-gradient(90deg,#5DF5FF,#6E9BFF,#A06CFF)]
                         shadow-md hover:shadow-xl active:scale-95 transition"
            >
              Get Started
            </button>

          </div>
        </div>
      )}
    </header>
  );
}
