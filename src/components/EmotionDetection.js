import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

const EmotionDetection = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [emotion, setEmotion] = useState("");

  // Load models
  const loadModels = async () => {
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      console.log("TinyFaceDetector model loaded");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
      console.log("FaceExpressionNet model loaded");
    } catch (error) {
      console.error("Error loading models: ", error);
    }
  };

  // Capture image from webcam
  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    console.log("Captured Image:", imageSrc);  // Log the captured image to verify
    await detectEmotion(imageSrc); // Process emotion detection after capturing the image
  };

  // Detect emotion from the captured image
  const detectEmotion = async (imageSrc) => {
    try {
      const img = new Image();
      img.src = imageSrc;
  
      img.onload = async () => {
        // Set new options for better face detection
        const detections = await faceapi
          .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions({
            inputSize: 512, // Increase the input size for better accuracy
            scoreThreshold: 0.3, // Lower the threshold for detecting faces
          }))
          .withFaceExpressions();
  
        if (detections.length > 0) {
          const expressions = detections[0].expressions;
          console.log("Detected Emotions:", expressions); // Log all detected emotions
  
          // Find the emotion with the highest probability
          const detectedEmotion = Object.keys(expressions).reduce((a, b) =>
            expressions[a] > expressions[b] ? a : b
          );
          setEmotion(detectedEmotion);
        } else {
          setEmotion("No face detected");
        }
      };
    } catch (error) {
      console.error("Error detecting emotion: ", error);
      setEmotion("Error in detection");
    }
  };
  

  // Initialize models when the component loads
  useEffect(() => {
    loadModels();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="mb-4"
        width={480}
      />
      <button
        onClick={captureImage}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Capture Image
      </button>
      {image && (
        <img
          src={image}
          alt="Captured"
          className="mt-4 rounded-lg max-w-sm shadow-lg"
        />
      )}
      {emotion && (
        <h2 className="mt-4 text-lg font-bold text-gray-800">
          Detected Emotion: {emotion}
        </h2>
      )}
    </div>
  );
};

export default EmotionDetection;
