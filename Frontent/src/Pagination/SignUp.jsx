import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
// import axiosClient from "../utils/axios";
import axiosClient from "../utils/axois";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../Redux/userSlice";
import { useNavigate } from "react-router";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvoider } from "../utils/ContinueWithGoogle";
import register from "../assets/register.jpg"
import { IoArrowBack } from "react-icons/io5";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const user = useSelector(state => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axiosClient.post("/api/auth/register", formData);

      console.log("REGISTER SUCCESS:", res.data);
      dispatch(setData(res?.data?.user))
      { user && user.assistantImage && user.assistantName ? navigate("/assistant") : navigate('/customize') }

      setFormData({
        name: "",
        email: "",
        password: "",
      });

    } catch (err) {
      console.log("REGISTER ERROR:", err.response?.data || err.message);
    }
  };

  // signUp with Google.......
  const handleWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvoider);
      console.log(result);

      const formData = {
        name: result?.user?.displayName,
        email: result?.user?.email
      }

      const { data } = await axiosClient.post("/api/auth/google-auth", formData);
      console.log(data);
      dispatch(setData(data?.user))
      { user && user.assistantImage && user.assistantName ? navigate("/assistant") : navigate('/customize') }

    } catch (err) {
      console.log(err);

    }
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">

      {/* BACKGROUND SAME AS SIGNIN */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            `url(${register})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          transform: "scale(1.1)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-blue-950/70 to-slate-900/80 z-0" />
      <button
        onClick={() => navigate("/assistant")}
        className="absolute top-6 left-6 text-white text-3xl  hover:scale-110 transition"
      >
        <IoArrowBack />
      </button>
      <div className="relative z-10 w-full max-w-md px-6">

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-light text-white">
            Register to <span className="text-blue-400 font-medium">Virtual Assistant</span>
          </h1>
        </div>

        <button onClick={handleWithGoogle} className="w-full flex items-center justify-center mb-4 gap-3 bg-white/10 border border-white/20 py-3 rounded-full hover:bg-white/20 transition text-white mt-5">
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-white/20"></div>
          <span className="px-3 text-white/60 text-xs font-medium tracking-wide">
            OR SIGNUP WITH DETAILS
          </span>
          <div className="flex-grow h-px bg-white/20"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Enter your Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/30 
            text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 transition"
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/30 
            text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 transition"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/30 
              text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 transition pr-14"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full max-w-[200px] mx-auto block px-8 py-3 rounded-full 
            bg-white text-gray-800 font-medium hover:bg-gray-100 transition shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-white/90 text-sm">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-blue-400 hover:text-blue-300 transition font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default SignUp;
