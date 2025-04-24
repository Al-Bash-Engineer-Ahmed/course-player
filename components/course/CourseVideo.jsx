"use client";

import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import { useInView } from 'react-intersection-observer';

export default function CourseVideo({ videoUrl, onProgress, onVideoComplete, hasNextVideo, type }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isYoutubeVideo, setIsYoutubeVideo] = useState(false);
  const [isPdfFile, setIsPdfFile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isWidescreen, setIsWidescreen] = useState(false);
  const [isMiniPlayer, setIsMiniPlayer] = useState(false);
  const [showSyllabus, setShowSyllabus] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const videoRef = useRef(null);
  const youtubePlayerRef = useRef(null);
  const videoIdRef = useRef(null);
  const containerRef = useRef(null);
  const { ref: inViewRef, inView } = useInView();
  
  // Detect content type
  useEffect(() => {
    // Check if it's a PDF file
    if (type === 'pdf' || (videoUrl && videoUrl.toLowerCase().endsWith('.pdf'))) {
      setIsPdfFile(true);
      return;
    }
    
    // Check if it's a YouTube video
    const isYoutube = videoUrl && (
      videoUrl.includes('youtube.com') || 
      videoUrl.includes('youtu.be')
    );
    setIsYoutubeVideo(isYoutube);
    
    // Extract video ID for YouTube videos
    if (isYoutube) {
      const match = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
      videoIdRef.current = match ? match[1] : videoUrl;
    }
  }, [videoUrl, type]);
  
  // Reset state when video URL changes
  useEffect(() => {
    // Reset state when video URL changes to ensure proper rendering
    setIsPdfFile(type === 'pdf' || (videoUrl && videoUrl.toLowerCase().endsWith('.pdf')));
    setIsYoutubeVideo(videoUrl && (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')));
  }, [videoUrl, type]);
  
  // Setup event listeners for HTML5 video
  useEffect(() => {
    if (!isYoutubeVideo && !isPdfFile && videoRef.current) {
      videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      videoRef.current.addEventListener('ended', handleVideoEnded);
      return () => {
        videoRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
        videoRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
        videoRef.current?.removeEventListener('ended', handleVideoEnded);
      };
    }
  }, [isYoutubeVideo, isPdfFile]);
  
  // Handle mini player mode when scrolling
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
  
  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    
    const currentTime = videoRef.current.currentTime;
    const videoDuration = videoRef.current.duration;
    
    if (videoDuration) {
      const progressPercent = (currentTime / videoDuration) * 100;
      setProgress(progressPercent);
      
      // Call the onProgress callback
      if (onProgress) {
        onProgress(progressPercent);
      }
      
      // Mark as completed when 80% watched
      if (progressPercent >= 80) {
        localStorage.setItem(`video-completed-${videoUrl}`, 'true');
      }
    }
  };
  
  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };
  
  // Handle YouTube video progress
  const handleYoutubeProgress = ({ played }) => {
    const progressPercent = played * 100;
    setProgress(progressPercent);
    
    // Call the onProgress callback
    if (onProgress) {
      onProgress(progressPercent);
    }
    
    // Mark as completed when 80% watched
    if (played >= 0.8) {
      localStorage.setItem(`video-completed-${videoIdRef.current}`, 'true');
    }
  };
  
  const handleYoutubeDuration = (duration) => {
    setDuration(duration);
  };
  
  const handleVideoEnded = () => {
    // Mark as completed
    const storageKey = isYoutubeVideo ? 
      `video-completed-${videoIdRef.current}` : 
      `video-completed-${videoUrl}`;
    
    localStorage.setItem(storageKey, 'true');
    
    // Call the completion callback
    if (onVideoComplete) {
      onVideoComplete();
    }
  };
  
  const togglePlay = () => {
    if (isYoutubeVideo) {
      setIsPlaying(!isPlaying);
    } else if (!isPdfFile && videoRef.current) {
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
      // Release orientation lock
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
    }
  };
  
  const toggleWidescreen = () => {
    setIsWidescreen(!isWidescreen);
  };
  
  const toggleSyllabus = () => {
    setShowSyllabus(!showSyllabus);
    setShowComments(false);
    setShowQuestions(false);
    setShowLeaderboard(false);
  };
  
  const toggleComments = () => {
    setShowComments(!showComments);
    setShowSyllabus(false);
    setShowQuestions(false);
    setShowLeaderboard(false);
  };
  
  const toggleQuestions = () => {
    setShowQuestions(!showQuestions);
    setShowSyllabus(false);
    setShowComments(false);
    setShowLeaderboard(false);
  };
  
  const toggleLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard);
    setShowSyllabus(false);
    setShowComments(false);
    setShowQuestions(false);
  };
  
  const handlePdfDownload = () => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = videoUrl.split('/').pop() || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Render PDF viewer
  if (isPdfFile) {
    // Mark PDF as viewed after 5 seconds
    useEffect(() => {
      if (isPdfFile && videoUrl) {
        const timer = setTimeout(() => {
          // Mark as completed in localStorage
          localStorage.setItem(`video-completed-${videoUrl}`, 'true');
          
          // Call the completion callback
          if (onVideoComplete) {
            onVideoComplete();
          }
          
          // Dispatch lesson completed event
          const videoId = videoUrl.split('/').pop().replace('.pdf', '');
          const event = new CustomEvent('lessonCompleted', {
            detail: { videoId }
          });
          window.dispatchEvent(event);
        }, 5000); // Mark as completed after 5 seconds of viewing
        
        return () => clearTimeout(timer);
      }
    }, [isPdfFile, videoUrl, onVideoComplete]);
    
    return (
      <div className="relative rounded-lg overflow-hidden bg-white border border-gray-200 shadow-sm">
        <div className="h-[70vh] w-full">
          <iframe 
            src={`${videoUrl}#toolbar=1&navpanes=1&scrollbar=1`} 
            className="w-full h-full" 
            title="PDF Viewer"
          />
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <span className="inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              PDF Document
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                // Mark as completed immediately when user clicks this button
                localStorage.setItem(`video-completed-${videoUrl}`, 'true');
                if (onVideoComplete) {
                  onVideoComplete();
                }
                // Dispatch lesson completed event
                const videoId = videoUrl.split('/').pop().replace('.pdf', '');
                const event = new CustomEvent('lessonCompleted', {
                  detail: { videoId }
                });
                window.dispatchEvent(event);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Mark as Completed
            </button>
            <button
              onClick={handlePdfDownload}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Render YouTube video
  if (isYoutubeVideo) {
    return (
      <div className="relative rounded-lg overflow-hidden bg-black">
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            ref={youtubePlayerRef}
            url={videoUrl}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
            playing={isPlaying}
            controls={true}
            onProgress={handleYoutubeProgress}
            onDuration={handleYoutubeDuration}
            onEnded={handleVideoEnded}
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
      </div>
    );
  }
  
  // Render custom video player
  return (
    <div className="relative rounded-lg overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-auto"
        onClick={togglePlay}
        playsInline
      />
      
      {/* Custom video controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
        <div className="flex items-center justify-between text-white">
          <button 
            onClick={togglePlay}
            className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
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
          
          <div className="flex-1 mx-3">
            <div className="h-1.5 bg-gray-600 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <div className="text-sm">
            {videoRef.current ? formatTime(videoRef.current.currentTime) : '0:00'} / {duration ? formatTime(duration) : '0:00'}
          </div>
        </div>
      </div>
      
      {/* Play button overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button 
            onClick={togglePlay}
            className="p-4 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}