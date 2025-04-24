import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Quiz = dynamic(() => import('./Quiz'), { ssr: false });

const ContentTypeIcon = ({ type, className = '' }) => {
  switch (type) {
    case 'video':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-indigo-500 ${className}`}>
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      );
    case 'pdf':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-red-500 ${className}`}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="8" y1="13" x2="16" y2="13"></line>
          <line x1="8" y1="17" x2="16" y2="17"></line>
          <line x1="10" y1="9" x2="14" y2="9"></line>
        </svg>
      );
    case 'quiz':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-emerald-500 ${className}`}>
          <path d="M9 11l3 3L22 4"></path>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
      );
    default:
      return null;
  }
};

export default function CourseTopics({ topics, progress, watchedVideos, unlockedContent, onVideoComplete, onSelectVideo }) {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [expandedWeeks, setExpandedWeeks] = useState(topics.map((_, i) => i === 0));
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  // Auto-load first video when component mounts
  useEffect(() => {
    if (topics && topics.length > 0 && topics[0].lessons && topics[0].lessons.length > 0) {
      const firstLesson = topics[0].lessons.find(lesson => lesson.type === 'video');
      if (firstLesson && onSelectVideo) {
        onSelectVideo(firstLesson);
      }
    }
  }, [topics, onSelectVideo]);
  
  const toggleWeek = (index) => {
    const newExpandedWeeks = [...expandedWeeks];
    newExpandedWeeks[index] = !newExpandedWeeks[index];
    setExpandedWeeks(newExpandedWeeks);
  };
  
  const handleQuizComplete = (score) => {
    setShowQuizModal(false);
    // Here you can handle the quiz completion, e.g., update progress
  };

  // Calculate overall course progress based on watched videos
  useEffect(() => {
    if (!topics || !watchedVideos) return;
    
    let totalVideos = 0;
    let completedVideos = 0;
    
    topics.forEach(week => {
      week.lessons.forEach(lesson => {
        if (lesson.type === 'video' && lesson.videoId) {
          totalVideos++;
          if (watchedVideos[lesson.videoId] >= 0.8) {
            completedVideos++;
          }
        }
      });
    });
    
    // Update overall progress
    if (totalVideos > 0) {
      const newProgress = (completedVideos / totalVideos) * 100;
      onVideoComplete && onVideoComplete(null, newProgress);
    }
  }, [topics, watchedVideos, onVideoComplete]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Topics for This Course</h2>

      {/* Quiz Modal */}
      {showQuizModal && selectedQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl m-4 relative">
            <button
              onClick={() => setShowQuizModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-6">
              <Quiz questions={selectedQuiz} onComplete={handleQuizComplete} />
            </div>
          </div>
        </div>
      )}
      
      {/* Progress bar */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex justify-center mb-1">
          <span className="text-gray-600">You</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="text-right text-sm text-gray-500 mt-1">{progress}%</div>
      </div>
      
      {/* Topics accordion */}
      <div className="space-y-4">
        {topics.map((week, weekIndex) => (
          <div key={weekIndex} className="bg-white rounded-lg shadow overflow-hidden">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer"
              onClick={() => toggleWeek(weekIndex)}
            >
              <div>
                <h3 className="font-medium">{week.weekTitle}</h3>
                <p className="text-sm text-gray-500">{week.subtitle}</p>
              </div>
              <button className="text-gray-400">
                {expandedWeeks[weekIndex] ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                )}
              </button>
            </div>
            
            {expandedWeeks[weekIndex] && (
              <div className="border-t border-gray-100">
                {week.lessons.map((lesson, lessonIndex) => (
                  <div 
                    key={lessonIndex} 
                    className="p-4 border-b border-gray-100 last:border-b-0 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      if (lesson.type === 'video' && (unlockedContent.has(lesson.videoId) || lessonIndex === 0)) {
                        // Select this video to play
                        onSelectVideo && onSelectVideo(lesson);
                      }
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <ContentTypeIcon type={lesson.type} />
                      <div className="flex flex-col">
                        <span className={!unlockedContent || !unlockedContent.has(lesson.videoId) ? 'text-gray-400' : ''}>{lesson.title}</span>
                        {lesson.description && (
                          <span className="text-xs text-gray-500 mt-1">{lesson.description}</span>
                        )}
                      </div>
                      {lesson.type === 'video' && (
                        <div className="flex items-center space-x-2">
                          {watchedVideos && watchedVideos[lesson.videoId] >= 80 ? (
                            <span className="text-xs font-medium text-green-500 bg-green-50 px-2 py-0.5 rounded-full flex items-center space-x-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span>Watched</span>
                            </span>
                          ) : watchedVideos && watchedVideos[lesson.videoId] > 0 && (
                            <span className="text-xs font-medium text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">
                              {Math.round(watchedVideos[lesson.videoId])}%
                            </span>
                          )}
                        </div>
                      )}
                      {(!unlockedContent || !unlockedContent.has(lesson.videoId)) && lesson.type === 'video' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {lesson.questions !== undefined && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedQuiz(lesson.quiz);
                            setShowQuizModal(true);
                          }}
                          className="text-xs text-blue-500 px-2 py-1 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
                        >
                          {lesson.questions} Questions
                        </button>
                      )}
                      {lesson.duration !== undefined && (
                        <span className="text-xs text-red-500 px-2 py-1 rounded-full bg-red-50">
                          {lesson.duration} min
                        </span>
                      )}
                      {lesson.fileSize && lesson.type === 'pdf' && (
                        <span className="text-xs text-purple-500 px-2 py-1 rounded-full bg-purple-50">
                          {lesson.fileSize}
                        </span>
                      )}
                      {lesson.timeLimit && lesson.type === 'quiz' && (
                        <span className="text-xs text-amber-500 px-2 py-1 rounded-full bg-amber-50">
                          {lesson.timeLimit} min
                        </span>
                      )}
                      {lesson.locked && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
