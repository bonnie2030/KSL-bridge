'use client'

import { useEffect, useRef, useState } from 'react'
import type { SignWord } from '@/types'

interface VideoPlayerProps {
  videos: SignWord[]
  onComplete?: () => void
}

export default function VideoPlayer({ videos, onComplete }: VideoPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videos.length === 0) {
      setCurrentIndex(0)
      setIsPlaying(false)
      return
    }

    if (!isPlaying) return

    const video = videoRef.current
    if (!video) return

    const handleVideoEnd = () => {
      if (currentIndex < videos.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        setIsPlaying(false)
        onComplete?.()
      }
    }

    video.addEventListener('ended', handleVideoEnd)
    return () => video.removeEventListener('ended', handleVideoEnd)
  }, [isPlaying, currentIndex, videos, onComplete])

  const handlePlayPause = () => {
    if (videos.length === 0) return
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }

  if (videos.length === 0) {
    return (
      <div className="w-full bg-slate-700/30 rounded-xl p-8 text-center text-gray-400 border border-slate-600/50">
        <p className="text-lg font-medium">No videos to display</p>
      </div>
    )
  }

  const currentVideo = videos[currentIndex]

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Video Container */}
      <div className="w-full bg-black rounded-xl overflow-hidden aspect-video flex items-center justify-center border-2 border-slate-700 shadow-lg">
        <video
          ref={videoRef}
          key={currentVideo.id}
          src={currentVideo.videoUrl}
          className="w-full h-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>

      {/* Video Information */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-cyan-200">
          {currentVideo.word.toUpperCase()}
        </h3>
        <p className="text-sm text-gray-400 mt-2">
          <span className="font-bold text-purple-300">{currentIndex + 1}</span>
          <span className="text-gray-500"> of </span>
          <span className="font-bold text-cyan-300">{videos.length}</span>
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={handlePlayPause}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-bold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
        >
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-slate-700 text-gray-200 rounded-lg font-bold hover:bg-slate-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg border border-slate-600"
        >
          🔄 Reset
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-700/50 rounded-full h-2 border border-slate-600/50 overflow-hidden">
        <div
          className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-300 shadow-lg shadow-purple-500/50"
          style={{
            width: `${((currentIndex + 1) / videos.length) * 100}%`,
          }}
        />
      </div>
    </div>
  )
}
