import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import EmotionDetection from '../components/EmotionDetection'

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
                <p className='text-justify mb-5'>
                    At Moodify, we blend the power of AI with the universal language of music to create a unique and personalized experience. Our mission is to connect your emotions with the perfect tunes, making every moment unforgettable. With just a click, we analyze your mood and deliver a playlist tailored to you. It's more than music—it's a reflection of you!
                </p>
                <p className='font-bold mb-5'>Emotions which we detect:</p>
                <div className='grid grid-cols-3 gap-10'>
                    <div className='emotion-grid-info'>
                        <>
                            <p className='text-white text-center'>Happy</p>
                        </>
                    </div>
                    <div className='emotion-grid-info'>
                        <p className='text-white text-center'>Sad</p>
                    </div>
                    <div className='emotion-grid-info'>
                        <p className='text-white text-center'>Angry</p>
                    </div>
                    <div className='emotion-grid-info'>
                        <p className='text-white text-center'>Surprised</p>
                    </div>
                    <div className='emotion-grid-info'>
                        <p className='text-white text-center'>Disgusted</p>
                    </div>
                    <div className='emotion-grid-info'>
                        <p className='text-white text-center'>Fearful</p>
                    </div>
                </div>
            </div>

            <div className='capture-mood-section'>
                <h1>Capture Your Mood</h1>
                <EmotionDetection/>
                <br/> <br/>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Home
