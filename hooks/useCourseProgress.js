import { useState, useEffect } from 'react';

export const useCourseProgress = (videos) => {
  const [courseProgress, setCourseProgress] = useState(0);
  const [completedVideos, setCompletedVideos] = useState([]);
  const [nextUnlockedVideo, setNextUnlockedVideo] = useState(null);

  useEffect(() => {
    // Load completed videos from localStorage
    const loadCompletedVideos = () => {
      const completed = videos.filter(video => {
        const watchedStatus = localStorage.getItem(`video-${video.url}`);
        return watchedStatus && parseFloat(watchedStatus) >= 0.8;
      });
      setCompletedVideos(completed);
    };

    // Calculate course progress
    const calculateProgress = () => {
      if (videos.length === 0) return 0;
      const progress = (completedVideos.length / videos.length) * 100;
      setCourseProgress(progress);
    };

    // Determine next unlocked video
    const determineNextUnlocked = () => {
      const nextIndex = completedVideos.length;
      if (nextIndex < videos.length) {
        setNextUnlockedVideo(videos[nextIndex]);
      } else {
        setNextUnlockedVideo(null);
      }
    };

    loadCompletedVideos();
    calculateProgress();
    determineNextUnlocked();
  }, [videos, completedVideos.length]);

  const isVideoUnlocked = (videoUrl) => {
    if (videos.indexOf(videoUrl) === 0) return true;
    const previousVideo = videos[videos.indexOf(videoUrl) - 1];
    return previousVideo && localStorage.getItem(`video-${previousVideo}`) >= 0.8;
  };

  return {
    courseProgress,
    completedVideos,
    nextUnlockedVideo,
    isVideoUnlocked
  };
};