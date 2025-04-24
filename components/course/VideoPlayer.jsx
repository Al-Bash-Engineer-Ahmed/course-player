"use client";

import { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player/youtube';

export default function VideoPlayer({ videoUrl, onProgress, isLocked = false, onComplete, hasNext, hasPrevious, duration }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isWatched, setIsWatched] = useState(false);
  const playerRef = useRef(null);
  const videoIdRef = useRef(null);

  // Extract video ID from URL for consistent localStorage keys
  useEffect(() => {
    // Simple extraction for YouTube URLs
    const match = videoUrl && videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    videoIdRef.current = match ? match[1] : videoUrl;
    
    // Load watched status from localStorage
    const watchedStatus = localStorage.getItem(`video-${videoIdRef.current}`);
    if (watchedStatus) {
      setIsWatched(true);
      setProgress(parseFloat(watchedStatus));
    }
  }, [videoUrl]);

  const handleProgress = ({ played }) => {
    const progressPercent = played * 100;
    setProgress(progressPercent);
    
    // Mark as watched when 80% complete
    if (played >= 0.8 && !isWatched) {
      setIsWatched(true);
      localStorage.setItem(`video-${videoIdRef.current}`, progressPercent.toString());
    }
    
    // Call onProgress with the current progress percentage
    if (onProgress) {
      onProgress({
        progress: progressPercent,
        played: played
      });
    }
  };
  
  const handleEnded = () => {
    // When video ends, mark as watched and trigger completion
    setIsWatched(true);
    setProgress(100);
    localStorage.setItem(`video-${videoIdRef.current}`, '100');
    localStorage.setItem(`video-completed-${videoUrl}`, 'true');
    
    if (onProgress) {
      onProgress({
        progress: 100,
        played: 1
      });
    }
    
    if (onComplete) {
      onComplete();
    }
  };

  if (isLocked) {
    return (
      <div className="relative w-full pt-[56.25%] bg-gray-900 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-4">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h3 className="text-white text-lg font-semibold mb-2">Content Locked</h3>
              <p className="text-gray-300 text-sm">Complete the previous lessons to unlock this content.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-lg overflow-hidden">
      <div className="relative pt-[56.25%] bg-black">
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
          playing={isPlaying}
          controls={true}
          onProgress={handleProgress}
          onEnded={handleEnded}
          progressInterval={1000}
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0
              }
            }
          }}
        />
      </div>
      
      {/* Video controls */}
      <div className="flex justify-between items-center p-2 bg-gray-100 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <div className="text-xs text-gray-500">{duration}</div>
        </div>
        
        <div className="flex items-center space-x-2">
          {hasPrevious && (
            <button className="p-1 rounded hover:bg-gray-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          {hasNext && (
            <button className="p-1 rounded hover:bg-gray-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}