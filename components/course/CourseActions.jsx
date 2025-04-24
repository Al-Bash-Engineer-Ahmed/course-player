"use client";

import { useState } from 'react';
import AskQuestionModal from './modals/AskQuestionModal';
import LeaderboardModal from './modals/LeaderboardModal';

export default function CourseActions({ onScrollToSection }) {
  const [isAskQuestionOpen, setIsAskQuestionOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [savedQuestion, setSavedQuestion] = useState('');

  const handleAskQuestion = () => {
    setIsAskQuestionOpen(true);
  };

  const handleLeaderboard = () => {
    setIsLeaderboardOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-4 flex justify-center space-x-8">
        <button 
          onClick={() => onScrollToSection('curriculum')}
          className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
        >
          <span className="text-xs font-medium">المنهج</span>
        </button>
        <button 
          onClick={() => onScrollToSection('comments')}
          className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
        >
          <span className="text-xs font-medium">التعليقات</span>
        </button>
        <button 
          onClick={handleAskQuestion}
          className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
        >
          <span className="text-xs font-medium">اسأل سؤال</span>
        </button>
        <button 
          onClick={handleLeaderboard}
          className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
        >
          <span className="text-xs font-medium">المتصدرين</span>
        </button>
      </div>

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
    </>
  );
}