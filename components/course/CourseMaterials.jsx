export default function CourseMaterials({ 
    duration, 
    topicsCount, 
    lessonsCount, 
    price, 
    enrolledStudents,
    instructor,
    language,
    certificate
  }) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Materials</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div className="ml-4">
                <span className="text-gray-500 text-sm">Duration :</span>
                <p className="font-medium">{duration}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </div>
              <div className="ml-4">
                <span className="text-gray-500 text-sm">Topics :</span>
                <p className="font-medium">{topicsCount}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <div className="ml-4">
                <span className="text-gray-500 text-sm">Lessons :</span>
                <p className="font-medium">{lessonsCount}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <div className="ml-4">
                <span className="text-gray-500 text-sm">Price :</span>
                <p className="font-medium">${price}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className="ml-4">
                <span className="text-gray-500 text-sm">Enrolled :</span>
                <p className="font-medium">{enrolledStudents} students</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="ml-4">
                <span className="text-gray-500 text-sm">Instructor :</span>
                <p className="font-medium">{instructor}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <span className="text-gray-500 text-sm">Language :</span>
                <p className="font-medium">{language}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div className="ml-4">
                <span className="text-gray-500 text-sm">Certificate :</span>
                <p className="font-medium">{certificate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  