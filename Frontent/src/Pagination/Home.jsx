import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { data, useNavigate } from "react-router";
import axiosClient from "../utils/axois";
import { setData } from "../Redux/userSlice";
import { BiMenuAltRight } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { IoArrowBack } from "react-icons/io5";
import { FiAlertTriangle } from "react-icons/fi";

import aivoice from "../assets/ai.gif";
import ailishen from "../assets/user.gif";

const Home = () => {
  const user = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [spokenText, setSpokenText] = useState("");
const [menuOpen, setMenuOpen] = useState(false);

  // LOGOUT
  const handleLogout = async () => {
    try {
      await axiosClient.post("/api/auth/logout");
      dispatch(setData(null));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // SPEAK FUNCTION
  const speak = (text) => {
    setIsSpeaking(true);
    setSpokenText(text);

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang='hi-IN';
    utter.onstart = () => {
      window.speechRecognitionActive = false; // Stop listening
    };

    utter.onend = () => {
      setIsSpeaking(false);
      setSpokenText("");
      window.speechRecognitionActive = true; // Listen again

      // Restart recognition safely
      if (window.recognition) {
        setTimeout(() => {
          try {
            window.recognition.start();
          } catch {}
        }, 300);
      }
    };

    window.speechSynthesis.speak(utter);
  };

  // open any brower commands then............................
const handleCommond = (data) => {
  const { type, response, userInput } = data;

  // FIRST SPEAK THE RESPONSE
  speak(response);

  const query = encodeURIComponent(userInput);

  switch (type) {
    case "google_search":
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
      break;

    
    case "youtube_search":
      window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
      break;

    
    case "youtube_play":
      window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
      break;

    
    case "calculator_open":
      window.open(`https://www.google.com/search?q=calculator`, "_blank");
      break;

   
    case "instagram_open":
      window.open("https://www.instagram.com", "_blank");
      break;

    
    case "facebook_open":
      window.open("https://www.facebook.com", "_blank");
      break;

    
    case "weather-show":
      window.open(`https://www.google.com/search?q=weather+${query}`, "_blank");
      break;

   
    case "linkedIn_open":
      window.open("https://www.linkedin.com", "_blank");
      break;

   
    case "twitter_open":
      window.open("https://twitter.com", "_blank");
      break;

    
    case "whatsapp_open":
      window.open("https://web.whatsapp.com", "_blank");
      break;

   
    case "gmail_open":
      window.open("https://mail.google.com", "_blank");
      break;

    
    case "about_cricket":
      window.open("https://www.google.com/search?q=cricket+news", "_blank");
      break;

   
    case "maps_open":
      window.open("https://www.google.com/maps", "_blank");
      break;

    case "calendar_open":
      window.open("https://calendar.google.com", "_blank");
      break;

    default:
      console.log("Unknown command:", type);
  }
};

  

  // LISTENING SYSTEM
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    window.recognition = recognition;
    window.speechRecognitionActive = true;

    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = async (e) => {
      if (!window.speechRecognitionActive) return;

      const transcript = e.results[0][0].transcript.trim();
      console.log("Heard:", transcript);

      if (
        transcript
          .toLowerCase()
          .includes(user.assistantName.toLowerCase())
      ) {
        const res = await axiosClient.post("/api/user/asktoassistant", {
          prompt: transcript,
        });

        console.log(res);
        

        if (res?.data?.response) {
          window.speechRecognitionActive = false;
          try {
            recognition.stop();
          } catch {}
          // speak(res.data.response);
          handleCommond(res.data);
        }
      }
    };

    recognition.onend = () => {
      if (window.speechRecognitionActive) {
        setTimeout(() => {
          try {
            recognition.start();
          } catch {}
        }, 300);
      }
    };

    // start recognition
    try {
      recognition.start();
    } catch {}
    speak("Hello there, how can I help you?");
    return () => recognition.stop();
    
  }, []);

  return (
    <div
      className="min-h-screen w-full relative 
      bg-[linear-gradient(to_bottom,#030353,black)] 
      text-white flex flex-col"
    >
      <button onClick={() => navigate("/")}
             className="absolute top-6 left-6 text-white text-3xl hover:scale-110 transition"
      >
      <IoArrowBack />
      </button>
      {/* RIGHT TOP BUTTONS */}
<div className="absolute top-4 right-4">

  {/* --- Desktop Buttons (md+) --- */}
  <div className="hidden md:flex gap-4">
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-white text-black rounded-full font-semibold shadow-md hover:scale-105 transition"
    >
      Log Out
    </button>

    <button
      onClick={() => navigate("/customize")}
      className="px-6 py-2 bg-white text-black rounded-full font-semibold shadow-md hover:scale-105 transition"
    >
      Customize Assistant
    </button>

    
  </div>

  {/* --- Mobile Menu Icon (<md) --- */}
  <div className="md:hidden">
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="px-3 py-2  text-4xl text-black rounded-full font-bold shadow-md"
    >
      {menuOpen ?<RxCross2 className="text-white "/> :  <BiMenuAltRight className="text-white "/>}
    </button>
  </div>

  {/* --- Mobile Dropdown Menu --- */}
  {menuOpen && (
    <div className="absolute w-75 right-0 mt-3 bg-white/10 backdrop-blur-xl text-black rounded-xl shadow-lg py-3 flex flex-col gap-3 animate-fade-in">

      
      <button
      onClick={handleLogout}
      className="px-4 py-2 bg-white w-fit text-black rounded-full font-semibold shadow-md hover:scale-105 transition"
    >
      Log Out
    </button>

      <button
      onClick={() => navigate("/customize")}
      className="px-6 py-2 bg-white w-fit text-black rounded-full font-semibold shadow-md hover:scale-105 transition"
    >
      Customize Assistant
    </button>

      <hr />
      <div className="p-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
  <h2 className="font-bold text-white mb-2">User History</h2>

  {user?.history?.length > 0 && (
    <ul className="space-y-1">
      {user.history.map((val, ind) => (
        <li key={ind} className="text-gray-300">
          {val}
        </li>
      ))}
    </ul>
  )}
</div>
    </div>
  )}
</div>


      {/* CENTER ASSISTANT */}
      <div className="flex flex-col justify-center items-center flex-1 px-4 sm:px-6 md:px-0">
       <p className="flex gap-2 mb-6 ">
        <FiAlertTriangle className="text-red-500 w-5 h-5 sm:w-6 sm:h-6 max-md:hidden" />
        <span className="text-sm sm:text-base text-white text-center ">
    Please Firstly take his name otherwise he/she con't lishen you (Eg : Alexa open the youTube/Google etc.)
  </span>
       </p>
        {/* Main Assistant Image */}
        <img
          src={user?.assistantImage || "/defaultAssistant.png"}
          alt="assistant"
          className="w-40 h-60 sm:w-50 sm:h-70 md:w-60 md:h-80 rounded-xl object-cover shadow-2xl transition-all"
        />

        <p className="mt-4 text-lg sm:text-xl md:text-2xl font-semibold text-center">
          I&apos;m {user?.assistantName || "Your Assistant"}
        </p>

        {/* GIF Section */}
        {isSpeaking ? (
          <img src={aivoice} className="w-32 h-20 mt-4" />
        ) : (
          <img src={ailishen} className="w-32 h-30 mt-4" />
        )}

        {/* Spoken Text */}
        {spokenText && (
          <p className="mt-3 text-center text-lg max-w-[80%] opacity-90">
            {spokenText}
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;


// gandu hu main 






// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router";
// import axiosClient from "../utils/axois";
// import { setData } from "../Redux/userSlice";
// import aivoice from "../assets/ai.gif"
// import ailishen from "../assets/ailishen.gif"

// const Home = () => {
//   const user = useSelector((state) => state.user.userData);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // logout function
//   const handleLogout = async () => {
//     try {
//       await axiosClient.post("/api/auth/logout");
//       dispatch(setData(""));
//       navigate("/signin");
//     } catch (err) {
//       console.log(err);
//     }
//   };


//    // seaking section is here..................................
//    const speak = (text) => {
//       // console.log(text);
      
//       const speech = new SpeechSynthesisUtterance(text);
//       console.log(speech);
      
//       window.speechSynthesis.speak(speech);
//     };

//   // Lishen agent what you speek.....
//   useEffect(() => {
//     const SpeechRecognization = window.SpeechRecognition || window.webkitSpeechRecognition
//     const recognition = new SpeechRecognization();
//     recognition.continuous = true;
//     recognition.lang = 'en-US'

//     recognition.onresult = async (e) => {
//       // console.log(e);

//       const transcript = e.results[e.results.length - 1][0].transcript.trim()
//       console.log("heard: " + transcript);
//       if (transcript.toLowerCase().includes(user.assistantName.toLowerCase())) {
//         const res = await axiosClient.post('/api/user/asktoassistant', {
//           prompt: transcript
//         });
//         console.log(res.data);
//         if(res?.data?.response) speak(res.data.response);
//       }
//     }

//     recognition.start()



//   }, [])

//   return (
//     <div className="min-h-screen w-full relative 
//       bg-[linear-gradient(to_bottom,#030353,black)] 
//       text-white flex flex-col">

//       {/* RIGHT TOP BUTTONS */}
//       <div className="absolute top-4 right-4 flex flex-col gap-3 sm:flex-row sm:gap-4">
//         <button
//           onClick={handleLogout}
//           className="px-3 py-2 sm:px-4 sm:py-2 bg-white text-black rounded-full font-semibold shadow-md hover:scale-105 transition transform"
//         >
//           Log Out
//         </button>

//         <button
//           onClick={() => navigate("/customize")}
//           className="px-3 py-2 sm:px-6 sm:py-2 bg-white text-black rounded-full font-semibold shadow-md hover:scale-105 transition transform"
//         >
//           Customize Assistant
//         </button>
//         <button
//           onClick={() => navigate("/animation")}
//           className="px-3 py-2 sm:px-6 sm:py-2 bg-white text-black rounded-full font-semibold shadow-md hover:scale-105 transition transform"
//         >
//           Animation
//         </button>
//       </div>

//       {/* CENTER ASSISTANT */}
//       <div className="flex flex-col justify-center items-center flex-1 px-4 sm:px-6 md:px-0">
//         <img
//           src={user?.assistantImage || "/defaultAssistant.png"}
//           alt="assistant"
//           className="w-48 h-72 sm:w-56 sm:h-80 md:w-64 md:h-96 rounded-xl object-cover shadow-2xl transition-all"
//         />

//         <p className="mt-4 text-lg sm:text-xl md:text-2xl font-semibold text-center">
//           I&apos;m {user?.assistantName || "Your Assistant"}
//         </p>
//       </div>

//     </div>
//   );
// };

// export default Home;
