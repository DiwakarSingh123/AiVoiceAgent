import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "../utils/axois";
import { IoArrowBack } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../Redux/userSlice";

const CustomizeTwo = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const selectedImage = state?.selectedImage;

  const user = useSelector(state => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (loading) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);

    if (selectedImage instanceof File) {
      formData.append("photo", selectedImage);
    } else {
      formData.append("photo", selectedImage);
    }

    try {
      const res = await axios.post("/api/user/set-cloudinary", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch(setData(res?.data?.user));
      navigate("/assistant");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[linear-gradient(to_bottom,#030353,black)] flex flex-col items-center justify-center relative px-4 sm:px-6">

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 sm:top-6 left-4 sm:left-6 text-white text-2xl sm:text-3xl hover:scale-110 transition"
      >
        <IoArrowBack />
      </button>

      {/* Heading */}
      <h1 className="text-white text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-center">
        Enter Your Assistant Name
      </h1>

      {/* Input */}
      <input
        type="text"
        placeholder="Your assistant name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full max-w-[350px] sm:max-w-[400px] px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/15 border border-white/30 text-white text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-white/50"
      />

      {/* Button */}
      {name.trim().length > 0 && (
        <button
          onClick={handleCreate}
          disabled={loading}
          className={`mt-6 sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-base sm:text-lg shadow-lg transition-all
            ${loading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white text-black hover:scale-105"}
          `}
        >
          {loading ? "Creating..." : "Finally Create Your Assistant"}
        </button>
      )}
    </div>
  );
};

export default CustomizeTwo;
