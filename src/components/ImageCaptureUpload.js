import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { AiOutlineCloudUpload } from 'react-icons/ai'; // Import the upload icon

const ImageCaptureUpload = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Capture image from webcam
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setIsCameraActive(false); // Deactivate the camera after capture
  }, [webcamRef]);

  // Handle image upload
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
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
              onClick={() => document.getElementById('fileInput').click()}
              className="px-6 py-3 text-white rounded-full flex items-center gap-2 transition duration-300 ease-in-out mb-4 upload-image"
            >
              <AiOutlineCloudUpload style={{fontSize: '20px'}} />
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
            <div className='flex justify-center'>
                <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="50%"
                videoConstraints={{ facingMode: 'user' }}
                />
            </div>
            <div className='justify-center flex gap-5'>
                <button
                    onClick={capture}
                    className="mt-4 px-6 py-2 click-image"
                >
                    Click here to take a picture
                </button>
                <button
                    onClick={() => setIsCameraActive(false)}
                    className="mt-4 px-6 py-2 click-image"
                >
                    Cancel Camera
                </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Image Preview */}
      {image && (
        <div className="mt-4">
          <img src={image} alt="Captured or Uploaded" className="rounded-lg max-w-md" />
        </div>
      )}
    </div>
  );
};

export default ImageCaptureUpload;
