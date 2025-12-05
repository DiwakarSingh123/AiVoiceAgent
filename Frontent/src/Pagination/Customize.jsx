import React, { useState } from "react";
import { useNavigate } from "react-router";
import second from "../assets/image1.png";
import third from "../assets/image2.jpg";
import forth from "../assets/authBg.png";
import fifth from "../assets/image4.png";
import sixth from "../assets/image5.png";
import seven from "../assets/image6.jpeg";
import eight from "../assets/image7.jpeg";
import { GrGallery } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../Redux/userSlice";
import axiosClient from "../utils/axois";
import { IoArrowBack } from "react-icons/io5";

export default function Customize() {
    const [selected, setSelected] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [preview, setPreview] = useState(null); // <-- ADD THIS

    const navigate = useNavigate();
    const user = useSelector(state => state.user.userData);
    const dispatch = useDispatch();

    // Images Array (last slot reserved for upload)
    const images = [second, third, forth, fifth, sixth, seven, eight, preview];

    // Handle Upload
    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadedFile(file);
        setPreview(URL.createObjectURL(file)); // <-- SHOW PREVIEW
        setSelected(images.length - 1);        // select upload card
    };

    const handleNext = () => {
        let selectedImage = null;

        if (selected === images.length - 1) {
            selectedImage = uploadedFile; // user uploaded image
        } else {
            selectedImage = images[selected]; // predefined image
        }

        navigate("/customize-name", {
            state: { selectedImage },
        });
    };

  

    return (
        <div className="min-h-screen w-full bg-[linear-gradient(to_top,black,#030353)] flex flex-col items-center justify-center p-6">
            <button
                onClick={() => navigate("/assistant")}
                className="absolute top-6 left-6 text-white text-3xl  hover:scale-110 transition"
            >
                <IoArrowBack />
            </button>
            <h1 className="text-white text-3xl mb-8 drop-shadow-lg max-md:mt-12">
                Select your Assistant Image 
            </h1>

            <div className="grid grid-cols-3 max-sm:grid-cols-2 md:grid-cols-4 gap-6">
                {images.map((img, index) => (
                    <div
                        key={index}
                        onClick={() => img && setSelected(index)}
                        className={`w-36 h-56 md:w-40 md:h-65 rounded-xl overflow-hidden bg-black/40 
              cursor-pointer transition-all shadow-xl hover:scale-105 
              ${selected === index ? "border-4 border-white scale-105 shadow-[0_0_25px_white]" : "border border-white/10"}`}
                    >
                        {img ? (
                            <img src={img} alt="assistant" className="w-full h-full object-cover" />
                        ) : (
                            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                <span className="text-white text-3xl">
                                    <GrGallery />
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleUpload}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                ))}
            </div>

            {selected !== null && (
                <button
                    className="mt-10 px-10 py-3 bg-white text-black text-lg font-semibold rounded-full shadow-lg hover:scale-105 transition-all"
                    onClick={handleNext}
                >
                    Next
                </button>
            )}
        </div>
    );
}
