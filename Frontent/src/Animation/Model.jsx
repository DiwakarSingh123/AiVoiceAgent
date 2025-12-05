import React from "react";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[#0F1624]/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[black] w-[90%] max-w-md p-6 rounded-xl border border-gray-700 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white text-xl"
        >
          ✕
        </button>

        {/* Content */}
        {children}

      </div>
    </div>
  );
}
