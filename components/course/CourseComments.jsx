import { useState } from 'react';

export default function CourseComments({ comments }) {
  const [commentText, setCommentText] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle comment submission
    setCommentText('');
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments</h2>
      
      <div className="space-y-6">
        {comments.map((comment, index) => (
          <div key={index} className="flex">
            <div className="flex-shrink-0 mr-4">
              <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                <img 
                  src={`/images/u${index + 1}.png`} 
                  alt={comment.studentName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h4 className="font-medium">{comment.studentName}</h4>
              <p className="text-sm text-gray-500 mb-2">{comment.date}</p>
              <p className="text-gray-600">{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Comment form */}
      <form onSubmit={handleSubmit} className="mt-8">
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="4"
          placeholder="Write a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-teal-500 text-white rounded-lg font-medium flex items-center"
          >
            Submit Review
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}