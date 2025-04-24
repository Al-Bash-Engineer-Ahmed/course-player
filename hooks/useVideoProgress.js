import { useState, useEffect } from 'react';

export const useVideoProgress = (videoId) => {
  const [watchProgress, setWatchProgress] = useState(0);
  const [isWatched, setIsWatched] = useState(false);

  // Load initial state from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(`video-progress-${videoId}`);
    const savedWatchStatus = localStorage.getItem(`video-watched-${videoId}`);
    
    if (savedProgress) {
      setWatchProgress(parseFloat(savedProgress));
    }
    if (savedWatchStatus) {
      setIsWatched(JSON.parse(savedWatchStatus));
    }
  }, [videoId]);

  // Update progress and watch status
  const updateProgress = (progress) => {
    setWatchProgress(progress);
    localStorage.setItem(`video-progress-${videoId}`, progress.toString());

    // Mark as watched if progress is >= 80%
    if (progress >= 80 && !isWatched) {
      setIsWatched(true);
      localStorage.setItem(`video-watched-${videoId}`, 'true');
    }
  };

  return {
    watchProgress,
    isWatched,
    updateProgress
  };
};