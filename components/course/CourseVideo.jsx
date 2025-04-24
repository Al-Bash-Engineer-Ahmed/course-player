"use client";

import { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function CourseVideo({ videoUrl, onProgress }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isWidescreen, setIsWidescreen] = useState(false);
  const [isMiniPlayer, setIsMiniPlayer] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const { ref: inViewRef, inView } = useInView();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => {
        videoRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
        videoRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!inView && isPlaying && window.innerWidth < 1024) {
        setIsMiniPlayer(true);
      } else {
        setIsMiniPlayer(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [inView, isPlaying]);

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
    onProgress?.(videoRef.current.currentTime / videoRef.current.duration * 100);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        } else if (containerRef.current.webkitRequestFullscreen) {
          await containerRef.current.webkitRequestFullscreen();
        } else if (containerRef.current.msRequestFullscreen) {
          await containerRef.current.msRequestFullscreen();
        }
        setIsFullscreen(true);
        // Force landscape orientation on mobile
        if (screen.orientation && screen.orientation.lock) {
          try {
            await screen.orientation.lock('landscape');
          } catch (err) {
            console.log('Orientation lock failed:', err);
          }
        }
      } catch (err) {
        console.log('Fullscreen failed:', err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        await document.msExitFullscreen();
      }
      setIsFullscreen(false);
      // Release orientation lock
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
    }
  };

  const toggleWidescreen = () => {
    setIsWidescreen(!isWidescreen);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const containerClasses = `
    ${isWidescreen ? 'fixed top-0 left-0 w-full z-50' : 'relative'}
    ${isMiniPlayer ? 'fixed bottom-4 right-4 w-80 h-45 z-50 shadow-lg rounded-lg overflow-hidden' : ''}
  `;

  return (
    <div
      ref={containerRef}
      className={`bg-gradient-to-br from-indigo-900 to-blue-900 overflow-hidden ${containerClasses}`}
    >
      <div ref={inViewRef} className="aspect-w-16 aspect-h-9 relative group">
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          poster="/images/demo.png"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Play button overlay */}
        <div 
          className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
          onClick={togglePlay}
        >
          <button className="bg-white bg-opacity-90 rounded-full p-4 shadow-lg transform transition-transform duration-300 hover:scale-110">
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </button>
        </div>

        {/* Video controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          {/* Progress bar */}
          <div className="h-1 bg-gray-200 bg-opacity-20 mb-4 cursor-pointer"
               onClick={(e) => {
                 const rect = e.currentTarget.getBoundingClientRect();
                 const pos = (e.clientX - rect.left) / rect.width;
                 videoRef.current.currentTime = pos * duration;
               }}>
            <div 
              className="h-full bg-blue-500"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-white">
            {/* Time display */}
            <div className="text-sm font-medium">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            {/* Control buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleWidescreen}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <polyline points="9 21 3 21 3 15"></polyline>
                  <line x1="21" y1="3" x2="14" y2="10"></line>
                  <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  