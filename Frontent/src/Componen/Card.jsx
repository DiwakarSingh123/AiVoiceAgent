import React from "react";
import { FiUpload } from "react-icons/fi";

/**
 * Props:
 * - src: string | undefined  -> image url (if undefined and isUpload true, show upload UI)
 * - label: optional text
 * - selected: boolean
 * - onClick: () => void
 * - isUpload: boolean
 * - onUpload: (file: File, dataUrl: string) => void
 */
const Card = ({ src, label, selected, onClick, isUpload = false, onUpload }) => {
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onUpload?.(file, reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
      className={`relative w-full rounded-2xl overflow-hidden transition-transform transform
        ${selected ? "scale-105 ring-4 ring-blue-400/60" : "hover:scale-102"}
        ${selected ? "shadow-2xl shadow-blue-500/30" : "shadow-lg"}
        bg-gradient-to-br from-blue-950/40 to-indigo-900/40 border-2
        ${selected ? "border-white/40" : "border-transparent"}
        flex items-center justify-center cursor-pointer`}
      style={{ minHeight: 180 }}
    >
      {/* Image */}
      {src ? (
        <img
          src={src}
          alt={label || "assistant"}
          className="object-cover w-full h-full"
          draggable={false}
        />
      ) : isUpload ? (
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center">
          <label
            htmlFor="file-input"
            className="flex flex-col items-center justify-center gap-2 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-lg border-2 border-dashed border-white/30 flex items-center justify-center bg-white/5">
              <FiUpload className="text-white/80" size={28} />
            </div>
            <div className="text-sm text-white/80">Upload</div>
            <div className="text-xs text-white/50">Select your own image</div>
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              e.stopPropagation();
              handleFile(e);
            }}
          />
        </div>
      ) : (
        <div className="text-white/80 text-sm">No image</div>
      )}

      {/* selected badge */}
      {selected && (
        <div className="absolute left-3 top-3 bg-white/10 text-white text-xs px-2 py-1 rounded">
          Selected
        </div>
      )}
    </div>
  );
};

export default Card;
