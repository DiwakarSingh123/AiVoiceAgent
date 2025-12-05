import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axiosClient from "../utils/axois";
import { setData } from "../Redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvoider } from "../utils/ContinueWithGoogle";
import login from "../assets/login.jpg"
import { IoArrowBack } from "react-icons/io5";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const user = useSelector(state => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const res = await axiosClient.post("/api/auth/login", formData, { withCredentials: true });

      console.log("Login SUCCESS:", res.data);
      dispatch(setData(res?.data?.user))
      const u = res?.data?.user; // freshly logged in user

      if (u.assistantImage && u.assistantName) {
        navigate("/assistant");
      } else {
        navigate("/customize");
      }

      setFormData({
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
      const u = data?.user; // freshly logged in user

      if (u.assistantImage && u.assistantName) {
        navigate("/assistant");
      } else {
        navigate("/customize");
      }

    } catch (err) {
      console.log(err);

    }
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
     
      {/* BACKGROUND BLUR IMAGE */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            `url(${login})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(10px)",
          transform: "scale(1.12)",
        }}
      />

      {/* DARK GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 z-0" />
         <button
        onClick={() => navigate("/assistant")}
        className="absolute top-6 left-6 text-white text-3xl  hover:scale-110 transition"
      >
        <IoArrowBack />
      </button>
      {/* MAIN FORM CARD */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-white drop-shadow-lg">
            Welcome Back
          </h1>
          <p className="text-blue-300 text-sm tracking-wide mt-2">
            Login to your AI Virtual Assistant
          </p>
        </div>

        {/* GOOGLE LOGIN */}
        <button onClick={handleWithGoogle} className="w-full flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/30 py-3 rounded-full hover:bg-white/20 transition text-white shadow-lg">
          <FcGoogle size={22} />
          Continue with Google
        </button>

        {/* BEAUTIFUL OR DIVIDER */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-white/20"></div>
          <span className="px-3 text-white/60 text-xs font-medium tracking-wide">
            OR SIGN IN WITH EMAIL
          </span>
          <div className="flex-grow h-px bg-white/20"></div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <input
            type="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 transition backdrop-blur-lg shadow-inner"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 transition backdrop-blur-lg shadow-inner pr-14"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute  right-5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* SIGN IN BUTTON */}
          <button
            type="submit"
            className="w-full max-w-[220px] mx-auto block px-8 py-3 rounded-full bg-blue-500 text-white font-medium hover:bg-blue-600 transition shadow-xl hover:shadow-blue-500/40"
          >
            Sign In
          </button>

        </form>

        {/* Redirect */}
        <div className="text-center mt-6">
          <p className="text-white/80 text-sm">
            Don’t have an account?{" "}
            <Link
              to={"/signup"}
              className="text-blue-400 hover:text-blue-300 transition font-medium"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
