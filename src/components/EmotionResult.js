import React from "react";
import { useLocation } from "react-router-dom";

// Import images
import happyImage from "../assets/images/happy.png";
import sadImage from "../assets/images/sad.png";
import angryImage from "../assets/images/angry.png";
import surprisedImage from "../assets/images/surprised.png";
import disgustedImage from "../assets/images/disgusted.png";
import fearfulImage from "../assets/images/fearful.png";
import neutralImage from "../assets/images/neutral.png";
import defaultImage from "../assets/images/neutral.png";
import Header from "./Header";

function EmotionResult() {
  const location = useLocation();
  const { emotion } = location.state || {
    emotion: "No emotion detected",
  };

  // Emotion-to-style and image mapping
  const emotionData = {
    happy: { color: "bg-yellow-200", image: happyImage },
    sad: { color: "bg-blue-200", image: sadImage },
    angry: { color: "bg-red-200", image: angryImage },
    surprised: { color: "bg-purple-200", image: surprisedImage },
    disgusted: { color: "bg-green-200", image: disgustedImage },
    fearful: { color: "bg-gray-400", image: fearfulImage },
    neutral: { color: "bg-gray-200", image: neutralImage },
    default: { color: "bg-gray-200", image: defaultImage }
  };

  // Get emotion-specific data or fallback to default
  const { color, image } = emotionData[emotion] || emotionData.default;

  return (
    <>
    <Header/>
        <div className="flex flex-col items-center justify-center mt-40">
            <h1 className="result-title">Your Mood, Your Groove</h1>
            <div className={`flex flex-col items-center p-6 rounded-lg shadow-lg ${color} emotion-box`}>
                <img
                    src={image}
                    alt={emotion}
                    className="rounded-lg shadow-md"
                    style={{ width: "200px", height: "200px" }}
                />
                <h2 className="text-2xl font-extrabold capitalize text-black mt-5 mb-5">
                    You're feeling {emotion} !!
                </h2>
            </div>
            <p className="result-scroll-p">Scroll down to get the perfect tunes for your vibe!!</p>

            <h1 className="result-title mt-40">Tunes Tailored For You</h1>
        </div>
    </>
  );
}

export default EmotionResult;
