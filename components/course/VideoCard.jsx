import { useState, useEffect } from 'react';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import VideoPlayer from './VideoPlayer';
import CourseVideo from './CourseVideo';

export default function VideoCard({ video, courseVideos, videoIndex, hasNext, hasPrevious }) {
  const { watchProgress, isWatched, updateProgress } = useVideoProgress(video.id);
  const { isVideoUnlocked, unlockNextVideo } = useCourseProgress(courseVideos);
  
  // Check if video is already completed in localStorage
  useEffect(() => {
    const isCompleted = localStorage.getItem(`video-completed-${video.url}`) === 'true';
    if (isCompleted && !isWatched) {
      // Use a local variable to avoid triggering the effect again
      const shouldUpdate = !isWatched;
      if (shouldUpdate) {
        updateProgress(100); // Mark as watched if it's completed
      }
    }
  }, [video.url, isWatched, updateProgress]); // Added updateProgress to dependencies

  const handleProgress = (progressData) => {
    // Handle progress updates from video player
    const progressValue = typeof progressData === 'object' 
      ? (progressData.progress !== undefined ? progressData.progress : Math.floor(progressData.played * 100))
      : progressData;
    
    updateProgress(progressValue);
    
    // Mark as watched when progress reaches 80%
    if (progressValue >= 80 && !isWatched) {
      updateProgress(100);
      if (hasNext && courseVideos) {
        unlockNextVideo(video.id);
        
        // Notify other components about completion
        const completionEvent = new CustomEvent('videoCompleted', {
          detail: { videoId: video.id }
        });
        window.dispatchEvent(completionEvent);
      }
    }
  };
  
  const handleVideoComplete = () => {
    // Mark current video as completed
    localStorage.setItem(`video-completed-${video.url}`, 'true');
    updateProgress(100);
    
    // Trigger completion event
    const completionEvent = new CustomEvent('videoCompleted', {
      detail: { videoId: video.id }
    });
    window.dispatchEvent(completionEvent);
  };

  return (
    <div id={`video-card-${video.id}`} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-lg overflow-hidden mb-6 border border-slate-200">
      <div className="relative">
        {video.type === 'custom' ? (
          <CourseVideo
            videoUrl={video.url}
            onProgress={handleProgress}
            onVideoComplete={handleVideoComplete}
            hasNextVideo={hasNext}
          />
        ) : (
          <VideoPlayer
            videoUrl={video.url}
            isLocked={!isVideoUnlocked(video.url)}
            onProgress={handleProgress}
            onComplete={handleVideoComplete}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            duration={video.duration}
          />
        )}
        {isWatched && (
          <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Completed</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">{video.title}</h3>
        <p className="text-slate-600 text-sm mb-3">{video.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-slate-500">{video.duration}</span>
          </div>
          <div className="h-2 w-24 bg-slate-200 rounded-full overflow-hidden shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-300 ${isWatched ? 'bg-emerald-500' : 'bg-indigo-500'}`}
              style={{ width: `${watchProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}