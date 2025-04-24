import { useState, useEffect } from 'react';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import VideoPlayer from './VideoPlayer';

export default function VideoCard({ video, courseVideos }) {
  const { watchProgress, isWatched, updateProgress } = useVideoProgress(video.id);
  const { isVideoUnlocked } = useCourseProgress(courseVideos);

  const handleProgress = ({ played, progress }) => {
    // Use the progress value directly if provided, otherwise calculate it
    const progressValue = progress !== undefined ? progress : Math.floor(played * 100);
    updateProgress(progressValue);
    
    // Mark as watched when progress reaches 80%
    if (progressValue >= 80 && !isWatched) {
      updateProgress(100); // Ensure it's marked as complete
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-lg overflow-hidden mb-6 border border-slate-200">
      <div className="relative">
        <VideoPlayer
          videoUrl={video.url}
          isLocked={!isVideoUnlocked(video.url)}
          onProgress={handleProgress}
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          {isWatched && (
            <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Watched</span>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">{video.title}</h3>
        <p className="text-slate-600 text-sm mb-3">{video.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-500">{video.duration}</span>
          </div>
          <div className="h-2 w-24 bg-slate-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${watchProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}