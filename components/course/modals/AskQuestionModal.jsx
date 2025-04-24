"use client";

import { useEffect, useState } from 'react';

export default function AskQuestionModal({ isOpen, onClose, savedQuestion, onSaveQuestion }) {
  const [question, setQuestion] = useState(savedQuestion || '');

  useEffect(() => {
    // Save question to localStorage when component unmounts
    return () => {
      if (question) {
        onSaveQuestion(question);
      }
    };
  }, [question, onSaveQuestion]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">اسأل سؤال</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <span className="material-icons">close</span>
            </button>
          </div>
          
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="اكتب سؤالك هنا..."
            className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />

          <div className="flex justify-end mt-4 space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              إلغاء
            </button>
            <button
              onClick={() => {
                // Here you would typically submit the question
                console.log('Question submitted:', question);
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              إرسال
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}