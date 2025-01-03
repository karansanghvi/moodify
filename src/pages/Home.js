import React from 'react'
import Header from '../components/Header'
// import ImageCaptureUpload from '../components/ImageCaptureUpload'
import Footer from '../components/Footer'
import EmotionDetection from '../components/EmotionDetection'
// import WebcamCapture from '../components/WebcamCapture'

function Home() {
  return (
    <>
        <Header/>
        <div className='home-section'>
            <div className='hero-section'>
                <h1>Your Emotions, Our Playlist</h1>
                <p>Discover Music for Every Mood!</p>
            </div>

            <div className='who-we-are-section'>
                <h1>Who We Are</h1>
                <p>
                    At Moodify, we blend the power of AI with the universal language of music to create a unique and personalized experience. Our mission is to connect your emotions with the perfect tunes, making every moment unforgettable. With just a click, we analyze your mood and deliver a playlist tailored to you. It's more than music—it's a reflection of you!
                </p>
            </div>

            <div className='capture-mood-section'>
                <h1>Capture Your Mood</h1>
                {/* <WebcamCapture/> */}
                {/* <ImageCaptureUpload/> */}
                <EmotionDetection/>
                <br/> <br/>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Home
