import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

// Import images
import happyImage from "../assets/images/happy.png";
import sadImage from "../assets/images/sad.png";
import angryImage from "../assets/images/angry.png";
import surprisedImage from "../assets/images/surprised.png";
import disgustedImage from "../assets/images/disgusted.png";
import fearfulImage from "../assets/images/fearful.png";
import neutralImage from "../assets/images/neutral.png";
import defaultImage from "../assets/images/neutral.png";
import playButton from "../assets/images/play button.png";
import Footer from "./Footer";
import Header from "./Header";

function EmotionResult() {
  const location = useLocation();
  const { emotion } = location.state || {
    emotion: "No emotion detected",
  };

  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleIndex, setVisibleIndex] = useState(0);

  // Emotion-to-style and image mapping
  const emotionData = {
    happy: { color: "bg-yellow-200", image: happyImage },
    sad: { color: "bg-blue-200", image: sadImage },
    angry: { color: "bg-red-200", image: angryImage },
    surprised: { color: "bg-purple-200", image: surprisedImage },
    disgusted: { color: "bg-green-200", image: disgustedImage },
    fearful: { color: "bg-gray-400", image: fearfulImage },
    neutral: { color: "bg-gray-200", image: neutralImage },
    default: { color: "bg-gray-200", image: defaultImage },
  };

  const { color, image } = emotionData[emotion] || emotionData.default;

  // Fetch songs from backend
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/search?emotion=${emotion}`
        );
        setSongs(response.data);
      } catch (error) {
        console.error("Error fetching songs: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, [emotion]);

  const ITEMS_PER_SLIDE = 4;

  const nextSlide = () => {
    if (visibleIndex + ITEMS_PER_SLIDE < songs.length) {
      setVisibleIndex(visibleIndex + ITEMS_PER_SLIDE);
    }
  };

  const prevSlide = () => {
    if (visibleIndex - ITEMS_PER_SLIDE >= 0) {
      setVisibleIndex(visibleIndex - ITEMS_PER_SLIDE);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center mt-40">
        <h1 className="result-title">Your Mood, Your Groove</h1>
        <div
          className={`flex flex-col items-center p-6 rounded-lg shadow-lg ${color} emotion-box`}
        >
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
        <p className="result-scroll-p">
          Scroll down to get the perfect tunes for your vibe!!
        </p>

        <h1 className="result-title mt-40">Tunes Tailored For You</h1>

        {isLoading ? (
          <p className="text-white">Loading songs...</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {songs
                .slice(visibleIndex, visibleIndex + ITEMS_PER_SLIDE)
                .map((song) => (
                  <div
                    key={song.id}
                    className={`p-5 m-4 rounded-lg shadow-md ${color} flex flex-col justify-between items-center`}
                    style={{ width: "250px", height: "300px" }}
                  >
                    <h1 className="text-black text-center font-bold text-2xl">
                      {song.name}
                    </h1>
                    <h1 className="text-black text-center">
                      {song.artists.map((artist) => artist.name).join(", ")}
                    </h1>
                    <div className="mt-2 flex justify-center">
                      <a
                        href={song.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600"
                      >
                        <img
                          src={playButton}
                          alt="Play"
                          className="w-20 h-20"
                        />
                      </a>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex justify-center gap-10 mt-4">
              <button
                onClick={prevSlide}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                disabled={visibleIndex === 0}
              >
                Previous
              </button>
              <button
                onClick={nextSlide}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                disabled={visibleIndex + ITEMS_PER_SLIDE >= songs.length}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      <br/> 
      <Footer />
    </>
  );
}

export default EmotionResult;
