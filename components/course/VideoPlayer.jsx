"use client";

import { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player/youtube';

export default function VideoPlayer({ videoUrl, onProgress, isLocked = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isWatched, setIsWatched] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);

  // Load watched status from localStorage
  useEffect(() => {
    const watchedStatus = localStorage.getItem(`video-${videoUrl}`);
    if (watchedStatus) {
      setIsWatched(true);
      setProgress(parseFloat(watchedStatus));
    }
  }, [videoUrl]);

  const handleProgress = ({ played, playedSeconds }) => {
    const progressPercent = played * 100;
    setProgress(progressPercent);
    setCurrentTime(playedSeconds);
    
    // Mark as watched when 80% complete
    if (played >= 0.8 && !isWatched) {
      setIsWatched(true);
      localStorage.setItem(`video-${videoUrl}`, progressPercent.toString());
    }
    
    // Always call onProgress with the current progress percentage
    if (onProgress) {
      onProgress({ played: played, progress: progressPercent });
    }
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const formatTime = (seconds) => {
    const pad = (num) => num.toString().padStart(2, '0');
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return hours > 0 ? `${hours}:${pad(minutes)}:${pad(secs)}` : `${minutes}:${pad(secs)}`;
  };

  return (
    <div className="relative group bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden shadow-xl">
      <div className="aspect-w-16 aspect-h-9 relative">
        {isLocked ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900 bg-opacity-75 backdrop-blur-sm">
            <div className="text-white text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-slate-300">Complete previous video to unlock</p>
            </div>
          </div>
        ) : (
          <ReactPlayer
            ref={playerRef}
            url={videoUrl}
            width="100%"
            height="100%"
            playing={isPlaying}
            controls={true}
            onProgress={handleProgress}
            onDuration={handleDuration}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            config={{
              youtube: {
                playerVars: { showinfo: 1 }
              }
            }}
          />
        )}
      </div>

      {/* Progress bar and time display */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-2">
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-slate-200 text-sm font-medium">{formatTime(currentTime)} / {formatTime(duration)}</span>
        </div>
        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Watched indicator */}
      {isWatched && (
        <div className="absolute top-4 right-4 flex items-center space-x-2 bg-emerald-500 bg-opacity-90 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>Watched</span>
        </div>
      )}
    </div>
  );
}