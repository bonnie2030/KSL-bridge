'use client'

import { useEffect, useRef, useState } from 'react'

interface VideoPlayerProps {
  videos: string[]
  labels?: string[]
  showOverlayText?: boolean
  onCurrentIndexChange?: (index: number) => void
  onComplete?: () => void
}

export default function VideoPlayer({
  videos,
  labels = [],
  showOverlayText = true,
  onCurrentIndexChange,
  onComplete,
}: VideoPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasPlaybackError, setHasPlaybackError] = useState(false)
  const [preloadedCount, setPreloadedCount] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videos.length === 0) {
      setCurrentIndex(0)
      setIsPlaying(false)
      setIsLoading(false)
      setHasPlaybackError(false)
      return
    }

    if (currentIndex > videos.length - 1) {
      setCurrentIndex(0)
      setIsPlaying(false)
      setHasPlaybackError(false)
    }
  }, [currentIndex, videos])

  useEffect(() => {
    onCurrentIndexChange?.(currentIndex)
  }, [currentIndex, onCurrentIndexChange])

  useEffect(() => {
    if (videos.length === 0) {
      setPreloadedCount(0)
      return
    }

    let cancelled = false
    const loaded = new Set<number>()
    const trackedVideos: HTMLVideoElement[] = []

    videos.forEach((fileName, index) => {
      const preloadVideo = document.createElement('video')
      preloadVideo.preload = 'auto'
      preloadVideo.src = `/videos/${fileName}`

      const markLoaded = () => {
        if (cancelled || loaded.has(index)) return
        loaded.add(index)
        setPreloadedCount(loaded.size)
      }

      preloadVideo.addEventListener('loadeddata', markLoaded)
      preloadVideo.addEventListener('error', markLoaded)
      preloadVideo.load()
      trackedVideos.push(preloadVideo)
    })

    return () => {
      cancelled = true
      trackedVideos.forEach((preloadVideo) => {
        preloadVideo.pause()
        preloadVideo.removeAttribute('src')
        preloadVideo.load()
      })
    }
  }, [videos])

  useEffect(() => {
    const video = videoRef.current
    if (!video || videos.length === 0) return

    setIsLoading(true)
    setHasPlaybackError(false)

    const handleVideoLoaded = () => {
      setIsLoading(false)
      if (isPlaying) {
        void video.play().catch(() => {
          setIsPlaying(false)
        })
      }
    }

    const handleVideoEnd = () => {
      if (currentIndex < videos.length - 1) {
        setCurrentIndex((index) => index + 1)
      } else {
        setIsPlaying(false)
        onComplete?.()
      }
    }

    const handleVideoError = () => {
      setIsLoading(false)
      setHasPlaybackError(true)
      setIsPlaying(false)
    }

    video.addEventListener('loadeddata', handleVideoLoaded)
    video.addEventListener('ended', handleVideoEnd)
    video.addEventListener('error', handleVideoError)

    return () => {
      video.removeEventListener('loadeddata', handleVideoLoaded)
      video.removeEventListener('ended', handleVideoEnd)
      video.removeEventListener('error', handleVideoError)
    }
  }, [currentIndex, isPlaying, videos, onComplete])

  const handlePlayPause = () => {
    if (videos.length === 0) return

    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
      setIsPlaying(false)
      return
    }

    setIsPlaying(true)
    void video.play().catch(() => {
      setIsPlaying(false)
    })
  }

  const goToPrevious = () => {
    if (videos.length === 0) return
    setCurrentIndex((index) => Math.max(0, index - 1))
  }

  const goToNext = () => {
    if (videos.length === 0) return
    if (currentIndex >= videos.length - 1) {
      setIsPlaying(false)
      return
    }

    setCurrentIndex((index) => Math.min(videos.length - 1, index + 1))
  }

  if (videos.length === 0) {
    return (
      <div className="w-full bg-slate-700/30 rounded-xl p-8 text-center text-gray-400 border border-slate-600/50">
        <p className="text-lg font-medium">No videos to display</p>
      </div>
    )
  }

  const currentVideo = videos[currentIndex]
  const currentLabel = labels[currentIndex]

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Video Container */}
      <div className="relative w-full bg-black rounded-xl overflow-hidden aspect-video flex items-center justify-center border-2 border-slate-700 shadow-lg">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900/70">
            <p className="text-sm font-semibold text-cyan-100 animate-pulse">Loading video…</p>
          </div>
        )}

        <video
          ref={videoRef}
          key={`${currentVideo}-${currentIndex}`}
          src={`/videos/${currentVideo}`}
          preload="auto"
          className="w-full h-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          controls={false}
        />

        {showOverlayText && currentLabel && (
          <div className="absolute bottom-3 left-3 rounded-md bg-black/60 px-3 py-1.5 border border-slate-500/70">
            <p className="text-xs sm:text-sm font-semibold text-cyan-100 uppercase tracking-wide">{currentLabel}</p>
          </div>
        )}
      </div>

      {hasPlaybackError && (
        <div className="p-3 bg-red-500/20 border border-red-400/50 rounded-lg">
          <p className="text-sm font-medium text-red-100">
            Couldn&apos;t load <span className="font-mono">{currentVideo}</span>. Use Next/Previous to continue.
          </p>
        </div>
      )}

      {/* Video Information */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-cyan-200">
          {currentLabel ? currentLabel.toUpperCase() : currentVideo.toUpperCase()}
        </h3>
        <p className="text-sm text-gray-300 mt-2 font-semibold">
          Playing {currentIndex + 1} of {videos.length}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          <span className="font-bold text-purple-300">{currentIndex + 1}</span>
          <span className="text-gray-500"> of </span>
          <span className="font-bold text-cyan-300">{videos.length}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">Preloaded: {preloadedCount}/{videos.length}</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className="px-5 py-3 bg-slate-700 text-gray-200 rounded-lg font-bold hover:bg-slate-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg border border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          ⏮ Previous
        </button>
        <button
          onClick={handlePlayPause}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-bold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
        >
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        <button
          onClick={goToNext}
          disabled={currentIndex === videos.length - 1}
          className="px-5 py-3 bg-slate-700 text-gray-200 rounded-lg font-bold hover:bg-slate-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg border border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          ⏭ Next
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
