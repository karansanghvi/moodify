import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";

const ImageCaptureUpload = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [emotion, setEmotion] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Capture image from webcam
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setIsCameraActive(false); // Deactivate the camera after capture
    setEmotion(null); // Clear previous emotion
  }, [webcamRef]);

  // Handle image upload
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
      setEmotion(null); // Clear previous emotion
    }
  };

  // Analyze emotion using TensorFlow.js
  const analyzeEmotion = async () => {
    if (!image) return;
  
    const img = new Image();
    img.src = image;
  
    img.onload = async () => {
      const model = await mobilenet.load();
      const predictions = await model.classify(img);
  
      console.log("Predictions:", predictions); // Log predictions for debugging
  
      // Map predictions to emotions
      const emotionMapping = {
        "cat": "Calm",
        "dog": "Energetic",
        "person": "Happy",
        "tree": "Calm",
        "laptop": "Sad",
        "windsor tie": "Calm",
        "neck brace": "Sad",
        "window shade": "Calm",
      };
      
  
      // Check the first prediction and find the matching emotion
      const detectedClassName = predictions[0]?.className.toLowerCase();
      console.log("Detected Class Name:", detectedClassName);
  
      const detectedEmotion = Object.keys(emotionMapping).find((key) =>
        detectedClassName.includes(key)
      );
  
      setEmotion(detectedEmotion ? emotionMapping[detectedEmotion] : "Neutral");
    };
  };
  
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="mb-4">
        {!isCameraActive ? (
          <div className="flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              id="fileInput"
            />
            <button
              onClick={() => document.getElementById("fileInput").click()}
              className="px-6 py-3 text-white rounded-full flex items-center gap-2 transition duration-300 ease-in-out mb-4 upload-image"
            >
              Upload File
            </button>
            <h2 className="text-white mx-4">Or</h2>
            <button
              onClick={() => setIsCameraActive(true)}
              className="mt-4 px-6 py-2 click-image"
            >
              Click here to Take a Picture
            </button>
          </div>
        ) : (
          <div className="mb-4">
            <div className="flex justify-center">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="50%"
                videoConstraints={{ facingMode: "user" }}
              />
            </div>
            <div className="justify-center flex gap-5">
              <button
                onClick={capture}
                className="mt-4 px-6 py-2 click-image"
              >
                Take Picture
              </button>
              <button
                onClick={() => setIsCameraActive(false)}
                className="mt-4 px-6 py-2 click-image"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Image Preview */}
      {image && (
        <div className="mt-4">
          <img
            src={image}
            alt="Captured or Uploaded"
            className="rounded-lg max-w-md mb-4"
          />
          <button
            onClick={analyzeEmotion}
            className="px-6 py-2 click-image"
          >
            Analyze Emotion
          </button>
        </div>
      )}

      {/* Emotion Result */}
      {emotion && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-white">Detected Emotion: {emotion}</h2>
        </div>
      )}
    </div>
  );
};

export default ImageCaptureUpload;
