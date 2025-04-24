// File structure recommendation:
// pages/courses/[courseId].js - Main course details page
// components/course/ - Folder for all course-related components
//   - CourseHeader.jsx
//   - CourseVideo.jsx
//   - CourseMaterials.jsx
//   - CourseTopics.jsx
//   - CourseComments.jsx
"use client";
// pages/courses/[courseId].js
import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import CourseHeader from '@/components/course/CourseHeader';
import CourseVideo from '@/components/course/CourseVideo';
import CourseMaterials from '@/components/course/CourseMaterials';
import CourseTopics from '@/components/course/CourseTopics';
import CourseComments from '@/components/course/CourseComments';
import CourseActions from '@/components/course/CourseActions';

import { courses } from '@/data/courses';

export default function CourseDetails({ params }) {
  // Get the courseId from the URL params and find the corresponding course
  const [courseId, setCourseId] = useState(0);
  const [course, setCourse] = useState(courses[0]);
  
  // Extract courseId from params (which is now async in Next.js 15)
  useEffect(() => {
    const fetchCourseId = async () => {
      try {
        // Await the params object to access its properties
        const { courseId: id } = await params;
        const parsedId = parseInt(id, 10);
        setCourseId(parsedId);
        
        // Find the corresponding course
        const foundCourse = courses.find(c => c.id === parsedId) || courses[0];
        setCourse(foundCourse);
      } catch (error) {
        console.error('Error accessing course ID:', error);
        // Fallback to first course
        setCourse(courses[0]);
      }
    };
    
    fetchCourseId();
  }, [params]);
  
  // Track watched videos and unlocked content
  const [watchedVideos, setWatchedVideos] = useState({});
  const [unlockedContent, setUnlockedContent] = useState(new Set());
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isFirstVideoLoaded, setIsFirstVideoLoaded] = useState(false);
  
  // Load watched status from localStorage on component mount
  useEffect(() => {
    // Initialize with first video unlocked
    const initialUnlocked = new Set();
    if (course.topics && course.topics.length > 0 && 
        course.topics[0].lessons && course.topics[0].lessons.length > 0) {
      const firstLesson = course.topics[0].lessons[0];
      if (firstLesson.videoId) {
        initialUnlocked.add(firstLesson.videoId);
      }
    }
    
    // Load watched status from localStorage
    const loadedWatchedVideos = {};
    course.topics.forEach(topic => {
      topic.lessons.forEach(lesson => {
        if (lesson.type === 'video' && lesson.videoId) {
          const progress = localStorage.getItem(`video-${lesson.videoId}`);
          if (progress) {
            const watchProgress = parseFloat(progress);
            loadedWatchedVideos[lesson.videoId] = watchProgress;
            
            // If video is watched (80% or more), unlock next content
            if (watchProgress >= 0.8) {
              // Find next lesson in this topic
              const lessonIndex = topic.lessons.findIndex(l => l.videoId === lesson.videoId);
              if (lessonIndex >= 0 && lessonIndex < topic.lessons.length - 1) {
                const nextLesson = topic.lessons[lessonIndex + 1];
                if (nextLesson.videoId) {
                  initialUnlocked.add(nextLesson.videoId);
                }
              }
              
              // If this is the last lesson in the current topic, unlock the first lesson of the next topic
              if (lessonIndex === topic.lessons.length - 1) {
                const topicIndex = course.topics.findIndex(t => t.weekTitle === topic.weekTitle);
                if (topicIndex >= 0 && topicIndex < course.topics.length - 1) {
                  const nextTopic = course.topics[topicIndex + 1];
                  if (nextTopic.lessons && nextTopic.lessons.length > 0) {
                    const firstLessonOfNextTopic = nextTopic.lessons[0];
                    if (firstLessonOfNextTopic.videoId) {
                      initialUnlocked.add(firstLessonOfNextTopic.videoId);
                    }
                  }
                }
              }
            }
          }
        }
      });
    });
    
    setWatchedVideos(loadedWatchedVideos);
    setUnlockedContent(initialUnlocked);
  }, [course]);
  
  // Sample comments - in a real app, these would come from an API
  const comments = [
    {
      studentName: "Alex Johnson",
      date: "Oct 10, 2023",
      comment: "This course is incredibly well-structured. The progression from basic concepts to advanced topics is seamless."
    },
    {
      studentName: "Maria Garcia",
      date: "Oct 15, 2023",
      comment: "The instructor explains complex topics in a way that's easy to understand. The quizzes really help reinforce the material."
    },
    {
      studentName: "Raj Patel",
      date: "Oct 19, 2023",
      comment: "I appreciate the mix of video content and PDF resources. Having both YouTube videos and downloadable content makes it easy to learn on the go."
    }
  ];
  
  // Combine the course data with comments and watched status
  const courseWithComments = {
    ...course,
    comments,
    watchedVideos,
    unlockedContent: Array.from(unlockedContent)
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Head>
        <title>{courseWithComments.title} | Course Details</title>
      </Head>
      
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600 transition-colors duration-200">Home</Link>
          <span className="mx-2 text-gray-400">›</span>
          <Link href="/courses" className="hover:text-blue-600 transition-colors duration-200">Courses</Link>
          <span className="mx-2 text-gray-400">›</span>
          <span className="text-gray-700 font-medium">Course Details</span>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        {/* Course Header */}
        <CourseHeader title={courseWithComments.title} />
        
        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Column - Video and Materials */}
          <div className="w-full lg:w-2/3 space-y-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <CourseVideo 
                videoUrl={selectedVideo ? selectedVideo.videoUrl : courseWithComments.videoUrl} 
                onProgress={(progressData) => {
                  console.log('Video watched:', typeof progressData === 'object' ? progressData.progress : progressData);
                  
                  // Extract videoId and progress from the data
                  const videoId = progressData.videoId || (selectedVideo ? selectedVideo.videoId : `video-${courseWithComments.id}-main`);
                  const progressValue = typeof progressData === 'object' ? progressData.progress : progressData;
                  
                  // Update localStorage with consistent key format
                  localStorage.setItem(`video-${videoId}`, progressValue.toString());
                  
                  // Update watched videos state
                  setWatchedVideos(prev => ({
                    ...prev,
                    [videoId]: progressValue
                  }));
                  
                  // If video is watched (80% or more), unlock next content
                  if (progressValue >= 80) {
                    setUnlockedContent(prev => {
                      const updated = new Set(prev);
                      
                      // Find the video in topics and unlock next lesson
                      courseWithComments.topics.forEach(topic => {
                        const lessonIndex = topic.lessons.findIndex(lesson => lesson.videoId === videoId);
                        if (lessonIndex >= 0 && lessonIndex < topic.lessons.length - 1) {
                          const nextLesson = topic.lessons[lessonIndex + 1];
                          if (nextLesson.videoId) {
                            updated.add(nextLesson.videoId);
                          }
                        }
                      });
                      
                      return updated;
                    });
                  }
                }}
              />
              <div className="px-6 py-4">
                <CourseActions 
                  onScrollToSection={(section) => {
                    const element = document.getElementById(section);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  curriculumContent={<CourseMaterials 
                    duration={courseWithComments.duration}
                    topicsCount={courseWithComments.topicsCount}
                    lessonsCount={courseWithComments.lessonsCount}
                    price={courseWithComments.price}
                    enrolledStudents={courseWithComments.enrolledStudents}
                    instructor={courseWithComments.instructor}
                    language={courseWithComments.language}
                    certificate={courseWithComments.certificate}
                  />}
                  commentsContent={<CourseComments comments={courseWithComments.comments} />}
                />
              </div>
            </div>
            
            <div className="space-y-8">
              <div id="curriculum">
                <CourseMaterials 
                  duration={courseWithComments.duration}
                  topicsCount={courseWithComments.topicsCount}
                  lessonsCount={courseWithComments.lessonsCount}
                  price={courseWithComments.price}
                  enrolledStudents={courseWithComments.enrolledStudents}
                  instructor={courseWithComments.instructor}
                  language={courseWithComments.language}
                  certificate={courseWithComments.certificate}
                />
              </div>
              
              <div id="comments">
                <CourseComments comments={courseWithComments.comments} />
              </div>
            </div>
          </div>
          
          {/* Right Column - Topics */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-4 self-start">
            <CourseTopics 
              topics={courseWithComments.topics} 
              progress={courseWithComments.progress}
              watchedVideos={watchedVideos}
              unlockedContent={unlockedContent}
              onSelectVideo={(video) => {
                setSelectedVideo(video);
                setIsFirstVideoLoaded(true);
              }}
              onVideoComplete={(videoId, progress, newUnlockedContent) => {
                console.log('Video completed:', videoId, 'Progress:', progress);
                
                // Handle different types of events
                if (videoId === "overall-progress") {
                  // Update the course progress
                  setCourse(prev => ({
                    ...prev,
                    progress: progress
                  }));
                  return;
                }
                
                if (videoId === "content-unlocked") {
                  // If we received new unlocked content directly, use it
                  if (newUnlockedContent) {
                    setUnlockedContent(newUnlockedContent);
                  }
                  return;
                }
                
                if (videoId === "progress-update") {
                  // Just trigger a re-render
                  return;
                }
                
                // Handle regular video progress updates
                if (videoId) {
                  // Update watched videos state
                  setWatchedVideos(prev => ({
                    ...prev,
                    [videoId]: progress
                  }));
                  
                  // Save to localStorage with consistent key format
                  localStorage.setItem(`video-${videoId}`, progress.toString());
                  
                  // If video is watched (80% or more), unlock next content
                  if (progress >= 80) {
                    setUnlockedContent(prev => {
                      const updated = new Set(prev);
                      
                      // Find the video in topics and unlock next lesson
                      courseWithComments.topics.forEach(topic => {
                        const lessonIndex = topic.lessons.findIndex(lesson => lesson.videoId === videoId);
                        if (lessonIndex >= 0 && lessonIndex < topic.lessons.length - 1) {
                          const nextLesson = topic.lessons[lessonIndex + 1];
                          if (nextLesson.videoId) {
                            updated.add(nextLesson.videoId);
                            console.log(`Unlocked next lesson: ${nextLesson.title} (ID: ${nextLesson.videoId})`);
                          }
                        }
                      });
                      
                      // Save unlocked content to localStorage for persistence
                      localStorage.setItem('unlocked-content', JSON.stringify(Array.from(updated)));
                      
                      return updated;
                    });
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}