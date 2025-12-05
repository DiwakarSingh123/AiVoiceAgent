import React, { useState } from "react";
import { MdMicNone } from "react-icons/md";
import Modal from "./Model";
import me from "../assets/me.jpeg"

export default function Footer() {
  const [open, setOpen] = useState(null); // "privacy" | "about" | "support" | null

  return (
    <>
      <footer
        className="
        w-full bg-[#05080F] py-6 flex justify-center
        border-t border-[#1a222f] md:border-none
      "
      >
        <div className="w-[90%] md:w-[80%] flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-400">

          {/* Left Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[linear-gradient(90deg,#5DF5FF,#6E9BFF,#A06CFF)]
              shadow-[0_20px_60px_#5DF5FF30] flex items-center justify-center">
              <span className="text-white text-[25px]">
                <MdMicNone />
              </span>
            </div>
            <span className="font-semibold text-white text-lg tracking-wide">
              VoiceAgent
            </span>
          </div>

          {/* Center Links */}
          <div className="flex items-center gap-8 text-gray-400">
            <p
              onClick={() => setOpen("privacy")}
              className="hover:text-white transition cursor-pointer"
            >
              Privacy
            </p>

            <p
              onClick={() => setOpen("about")}
              className="hover:text-white font-bold text-gray-300 transition cursor-pointer"
            >
              About
            </p>

            <p
              onClick={() => setOpen("support")}
              className="hover:text-white transition cursor-pointer"
            >
              Support
            </p>
          </div>

          {/* Right Text */}
          <span className="text-gray-400 text-center md:text-right">
            © 2024 VoiceAI. All rights reserved.
          </span>
        </div>
      </footer>

      {/* Modal Component */}
      <Modal open={open} onClose={() => setOpen(null)}>
        {open === "privacy" && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Privacy Policy</h2>
            <p className="text-gray-300">
              Your privacy is our top priority. We do not store personal data without consent.
            </p>
          </div>
        )}

        {open === "about" && (
          <div>
            
            <div className=" flex flex-col items-center gap-3 justify-center mb-2">
              <img src={me} alt="" width={80} className="rounded-full" />
               <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#5DF5FF,#6E9BFF,#A06CFF)]
      shadow-md hover:shadow-xl active:scale-95 transition">Diwakar Singh</span>
        <p className="text-gray-300 text-center">Created by me, I am a Software Devloper with a strong focus on modern AI interfaces.</p>
            <a href="https://www.linkedin.com/in/diwakar-singh-886590293/" target="_blank" className="text-blue-400 text-sm underline">Connect With Me</a>
            </div>
            <h2 className="text-xl font-semibold text-white mb-3">About Us</h2>
            <ul className="text-gray-300 list-disc ml-5 space-y-2">
              <li>
                VoiceAgent is an AI-powered assistant helping users interact with voice commands.
              </li>

             
              <li>
                This project is built as a part of learning AI-driven voice assistants and modern UI/UX design.
              </li>
            </ul>


          </div>
        )}

        {open === "support" && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Support</h2>
            <p className="text-gray-300">
              For help, contact us anytime at:
              <ul className="text-gray-300 list-disc ml-5 space-y-2">
                <li>diwakarsinghdd111@gmail.com <span className="font-bold">OR</span></li>
                <li>7007406326</li>
              </ul>
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}
