import { useState, useEffect } from 'react';

export const useCourseProgress = (videos) => {
  const [courseProgress, setCourseProgress] = useState(0);
  const [completedVideos, setCompletedVideos] = useState([]);
  const [nextUnlockedVideo, setNextUnlockedVideo] = useState(null);
  const [unlockedVideos, setUnlockedVideos] = useState(new Set());

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

  // Function to unlock the next video when current one is completed
  const unlockNextVideo = (videoId) => {
    if (!videos || videos.length === 0) return;
    
    // Find the index of the current video
    const currentIndex = videos.findIndex(video => video.id === videoId);
    if (currentIndex === -1) return;
    
    // Mark current video as completed
    const updatedCompletedVideos = [...completedVideos];
    if (!updatedCompletedVideos.find(v => v.id === videoId)) {
      updatedCompletedVideos.push(videos[currentIndex]);
      setCompletedVideos(updatedCompletedVideos);
    }
    
    // Unlock the next video if it exists
    if (currentIndex < videos.length - 1) {
      const nextVideo = videos[currentIndex + 1];
      const updatedUnlocked = new Set(unlockedVideos);
      updatedUnlocked.add(nextVideo.url);
      setUnlockedVideos(updatedUnlocked);
      setNextUnlockedVideo(nextVideo);
      
      // Save to localStorage that this video is unlocked
      localStorage.setItem(`video-unlocked-${nextVideo.id}`, 'true');
    }
    
    // Update course progress
    const newProgress = ((updatedCompletedVideos.length) / videos.length) * 100;
    setCourseProgress(newProgress);
  };

  return {
    courseProgress,
    completedVideos,
    nextUnlockedVideo,
    isVideoUnlocked,
    unlockNextVideo
  };
};