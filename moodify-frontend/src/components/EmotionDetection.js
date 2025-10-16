import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { useNavigate } from "react-router-dom";

const EmotionDetection = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const loadModels = async () => {
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    } catch (error) {
      console.error("Error loading models: ", error);
    }
  };

  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setShowModal(true); 
    setIsLoading(true); 

    setTimeout(() => {
      setIsLoading(false);
    }, 5000000000000000);

    await detectEmotion(imageSrc);
  };

  const detectEmotion = async (imageSrc) => {
    try {
      const img = new Image();
      img.src = imageSrc;

      img.onload = async () => {
        const detections = await faceapi
          .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions({
            inputSize: 512,
            scoreThreshold: 0.3,
          }))
          .withFaceExpressions();

        setIsLoading(false); 

        if (detections.length > 0) {
          const expressions = detections[0].expressions;
          const detectedEmotion = Object.keys(expressions).reduce((a, b) =>
            expressions[a] > expressions[b] ? a : b
          );
          navigate("/result", { state: { emotion: detectedEmotion } });
        } else {
          navigate("/result", { state: { emotion: "No face detected" } });
        }
      };
    } catch (error) {
      console.error("Error detecting emotion: ", error);
      setIsLoading(false); 
      navigate("/result", { state: { emotion: "Error in detection" } });
    }
  };

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="mb-4 rounded-xl"
        width={480}
      />
      <button
        onClick={captureImage}
        className="px-4 py-2 click-image"
      >
        Capture Image
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Processing Image</h2>
            {image && (
              <img
                src={image}
                alt="Captured"
                className="mb-4 rounded-lg max-w-sm"
              />
            )}
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8"></div>
              </div>
            ) : (
              <p className="text-sm text-gray-600">Redirecting...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmotionDetection;
