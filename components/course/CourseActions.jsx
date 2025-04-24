"use client";

import { useState, useEffect } from 'react';
import AskQuestionModal from './modals/AskQuestionModal';
import LeaderboardModal from './modals/LeaderboardModal';

export default function CourseActions({ onScrollToSection, curriculumContent, commentsContent }) {
  const [isAskQuestionOpen, setIsAskQuestionOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [savedQuestion, setSavedQuestion] = useState('');
  const [activeTab, setActiveTab] = useState('curriculum');
  const [showTabContent, setShowTabContent] = useState(false);

  // Effect to handle mobile view content display
  useEffect(() => {
    // On mobile, we'll show the tab content directly in this component
    const handleResize = () => {
      setShowTabContent(window.innerWidth < 768); // Show tab content directly on mobile
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAskQuestion = () => {
    setIsAskQuestionOpen(true);
  };

  const handleLeaderboard = () => {
    setIsLeaderboardOpen(true);
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    if ((tabName === 'curriculum' || tabName === 'comments') && !showTabContent) {
      // On desktop, scroll to the section
      onScrollToSection(tabName);
    }
  };

  // Render tab content based on active tab (for mobile view)
  const renderTabContent = () => {
    if (!showTabContent) return null;

    switch (activeTab) {
      case 'curriculum':
        return (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3">المنهج</h3>
            {curriculumContent || (
              <div className="text-center py-4 text-gray-500">
                محتوى المنهج سيظهر هنا
              </div>
            )}
          </div>
        );
      case 'comments':
        return (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3">التعليقات</h3>
            {commentsContent || (
              <div className="text-center py-4 text-gray-500">
                التعليقات ستظهر هنا
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm p-4 flex justify-between md:justify-center space-x-2 md:space-x-8 sticky top-0 z-10">
        <button 
          onClick={() => handleTabChange('curriculum')}
          className={`flex flex-col items-center transition-colors duration-200 group ${activeTab === 'curriculum' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span className="text-xs font-medium">المنهج</span>
          {activeTab === 'curriculum' && <div className="h-1 w-full bg-blue-600 rounded-t-md mt-1"></div>}
        </button>
        <button 
          onClick={() => handleTabChange('comments')}
          className={`flex flex-col items-center transition-colors duration-200 group ${activeTab === 'comments' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="text-xs font-medium">التعليقات</span>
          {activeTab === 'comments' && <div className="h-1 w-full bg-blue-600 rounded-t-md mt-1"></div>}
        </button>
        <button 
          onClick={() => {
            handleTabChange('ask-question');
            handleAskQuestion();
          }}
          className={`flex flex-col items-center transition-colors duration-200 group ${activeTab === 'ask-question' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-medium">اسأل سؤال</span>
          {activeTab === 'ask-question' && <div className="h-1 w-full bg-blue-600 rounded-t-md mt-1"></div>}
        </button>
        <button 
          onClick={() => {
            handleTabChange('leaderboard');
            handleLeaderboard();
          }}
          className={`flex flex-col items-center transition-colors duration-200 group ${activeTab === 'leaderboard' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-xs font-medium">المتصدرين</span>
          {activeTab === 'leaderboard' && <div className="h-1 w-full bg-blue-600 rounded-t-md mt-1"></div>}
        </button>
      </div>

      {/* Tab Content (Mobile View) */}
      {renderTabContent()}

      {/* Modals */}
      <AskQuestionModal 
        isOpen={isAskQuestionOpen}
        onClose={() => setIsAskQuestionOpen(false)}
        savedQuestion={savedQuestion}
        onSaveQuestion={setSavedQuestion}
      />
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />
    </div>
  );
}