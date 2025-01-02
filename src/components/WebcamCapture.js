import React, { useRef, useState } from 'react'
import Webcam from 'react-webcam'

function WebcamCapture() {

    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
    }, [webcamRef]);

  return (
    <>
     <div className='flex flex-col items-center justify-center p-6'>
        <div className='mb-4'>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={100}
                videoConstraints={{
                    facingMode: "user",
                }}
            />
        </div>
        <button
            onClick={capture}
            className='px-6 py-2 bg-blue-500 text-white rounded-lg'
        >
            Click here to take picture
        </button>

        {
            image && (
                <div className='mt-4'>
                    <img
                        src={image}
                        alt="Captured"
                        className='rounded-lg'
                    />
                </div>
            )
        }
     </div> 
    </>
  )
}

export default WebcamCapture
