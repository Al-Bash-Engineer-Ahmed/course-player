export const courses = [
  {
    id: 1,
    title: "Introduction to Programming",
    description: "Learn the basics of programming concepts and syntax.",
    videoUrl: "/videos/demo.mp4",
    progress: 35,
    duration: "4 weeks",
    topicsCount: 24,
    lessonsCount: 16,
    price: 49.99,
    enrolledStudents: 1250,
    instructor: "Dr. Jane Smith",
    language: "English",
    certificate: "Included",
    topics: [
      {
        weekTitle: "Week 1",
        subtitle: "Programming Fundamentals and Basic Syntax",
        lessons: [
          { 
            title: "Course Introduction", 
            type: "video",
            videoId: "intro-vid-1",
            videoUrl: "/videos/demo.mp4",
            locked: false,
            duration: 15,
            watched: false,
            description: "An overview of what you'll learn in this programming course."
          },
          { 
            title: "Setting Up Your Development Environment", 
            type: "video",
            videoId: "setup-vid-1",
            videoUrl: "https://www.youtube.com/watch?v=r5khqoTrFWk",
            locked: false,
            duration: 20,
            watched: false,
            description: "Learn how to set up your coding environment with the necessary tools."
          },
          { 
            title: "Variables and Data Types", 
            type: "video",
            videoId: "variables-vid-1",
            videoUrl: "/videos/next.mp4",
            locked: true,
            duration: 25,
            watched: false,
            description: "Understanding how to store and manipulate different types of data."
          },
          { 
            title: "Programming Basics PDF Guide", 
            type: "pdf",
            pdfUrl: "/pdfs/event.pdf",
            locked: true,
            fileSize: "2.4 MB",
            pages: 15,
            description: "A comprehensive guide covering all Week 1 concepts."
          },
          { 
            title: "Week 1 Assessment", 
            type: "quiz",
            locked: true,
            questions: 3,
            timeLimit: 5,
            passingScore: 30,
            attempts: 0,
            maxAttempts: 3,
            quiz: [
              {
                question: "What is a variable?",
                options: [
                  "A fixed value that cannot change",
                  "A container for storing data values",
                  "A programming language",
                  "A type of function"
                ],
                correctAnswer: 1
              },
              {
                question: "Which of the following is NOT a primitive data type in most programming languages?",
                options: [
                  "String",
                  "Boolean",
                  "Array",
                  "Number"
                ],
                correctAnswer: 2
              },
              {
                question: "What symbol is commonly used for assignment in programming?",
                options: [
                  "==",
                  "=",
                  "===",
                  ":"
                ],
                correctAnswer: 1
              }
            ]
          }
        ]
      },
      {
        weekTitle: "Week 2",
        subtitle: "Control Flow and Functions",
        lessons: [
          { 
            title: "Conditional Statements", 
            type: "video",
            videoId: "conditionals-vid-1",
            videoUrl: "/videos/over.mp4",
            locked: true,
            duration: 18,
            watched: false,
            description: "Learn how to make decisions in your code using if-else statements."
          },
          { 
            title: "Loops and Iterations", 
            type: "video",
            videoId: "loops-vid-1",
            videoUrl: "https://www.youtube.com/watch?v=loops-tutorial",
            locked: true,
            duration: 22,
            watched: false,
            description: "Master different types of loops to repeat code execution efficiently."
          },
          { 
            title: "Functions and Parameters", 
            type: "video",
            videoId: "functions-vid-1",
            videoUrl: "/videos/functions.mp4",
            locked: true,
            duration: 30,
            watched: false,
            description: "Understanding how to create reusable blocks of code with parameters."
          },
          { 
            title: "Control Flow Cheat Sheet", 
            type: "pdf",
            pdfUrl: "/pdfs/best.pdf",
            locked: true,
            fileSize: "1.8 MB",
            pages: 10,
            description: "Quick reference for conditional statements, loops, and functions."
          },
          { 
            title: "Week 2 Assessment", 
            type: "quiz",
            locked: true,
            questions: 2,
            timeLimit: 3,
            passingScore: 20,
            attempts: 0,
            maxAttempts: 2,
            quiz: [
              {
                question: "What is the purpose of an if statement?",
                options: [
                  "To repeat a block of code",
                  "To execute code conditionally",
                  "To define a function",
                  "To import libraries"
                ],
                correctAnswer: 1
              },
              {
                question: "Which loop is guaranteed to execute at least once?",
                options: [
                  "for loop",
                  "while loop",
                  "do-while loop",
                  "foreach loop"
                ],
                correctAnswer: 2
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Web Development Basics",
    description: "Understand fundamental web technologies and development practices.",
    videoUrl: "/videos/demo.mp4",
    progress: 15,
    duration: "6 weeks",
    topicsCount: 30,
    lessonsCount: 24,
    price: 69.99,
    enrolledStudents: 980,
    instructor: "Mark Johnson",
    language: "English",
    certificate: "Included",
    topics: [
      {
        weekTitle: "Week 1-2",
        subtitle: "HTML and CSS Fundamentals",
        lessons: [
          { 
            title: "Introduction to HTML", 
            type: "video",
            videoId: "html-vid-1",
            videoUrl: "/videos/html-intro.mp4",
            locked: false,
            duration: 15,
            watched: false,
            description: "Learn the fundamentals of HTML structure and elements."
          },
          { 
            title: "CSS Basics", 
            type: "video",
            videoId: "css-vid-1",
            videoUrl: "https://www.youtube.com/watch?v=css-basics",
            locked: false,
            duration: 20,
            watched: false,
            description: "Understanding how to style HTML elements with CSS."
          },
          { 
            title: "Building Your First Webpage", 
            type: "video",
            videoId: "webpage-vid-1",
            videoUrl: "/videos/first-webpage.mp4",
            locked: true,
            duration: 25,
            watched: false,
            description: "Step-by-step guide to creating a complete webpage from scratch."
          },
          { 
            title: "HTML5 & CSS3 Reference Guide", 
            type: "pdf",
            pdfUrl: "/pdfs/html-css-reference.pdf",
            locked: true,
            fileSize: "3.2 MB",
            pages: 24,
            description: "Comprehensive reference for HTML5 tags and CSS3 properties."
          },
          { 
            title: "HTML & CSS Assessment", 
            type: "quiz",
            locked: true,
            questions: 12,
            timeLimit: 25,
            passingScore: 70,
            attempts: 0,
            maxAttempts: 3,
            quiz: [
              {
                question: "What does HTML stand for?",
                options: [
                  "Hyper Text Markup Language",
                  "High Tech Modern Language",
                  "Hyper Transfer Markup Language",
                  "Home Tool Markup Language"
                ],
                correctAnswer: 0
              },
              {
                question: "Which CSS property is used to change the text color?",
                options: [
                  "text-color",
                  "font-color",
                  "color",
                  "text-style"
                ],
                correctAnswer: 2
              }
            ]
          }
        ]
      },
      {
        weekTitle: "Week 3-4",
        subtitle: "JavaScript Basics and DOM Manipulation",
        lessons: [
          { 
            title: "Introduction to JavaScript", 
            type: "video",
            videoId: "js-vid-1",
            videoUrl: "/videos/js-intro.mp4",
            locked: true,
            duration: 22,
            watched: false,
            description: "Learn the basics of JavaScript programming for the web."
          },
          { 
            title: "DOM Manipulation", 
            type: "video",
            videoId: "dom-vid-1",
            videoUrl: "https://www.youtube.com/watch?v=dom-tutorial",
            locked: true,
            duration: 28,
            watched: false,
            description: "Understanding how to interact with HTML elements using JavaScript."
          },
          { 
            title: "JavaScript Cheat Sheet", 
            type: "pdf",
            pdfUrl: "/pdfs/javascript-cheatsheet.pdf",
            locked: true,
            fileSize: "2.1 MB",
            pages: 18,
            description: "Quick reference guide for JavaScript syntax and common methods."
          },
          { 
            title: "JavaScript Assessment", 
            type: "quiz",
            locked: true,
            questions: 10,
            timeLimit: 20,
            passingScore: 75,
            attempts: 0,
            maxAttempts: 2,
            quiz: [
              {
                question: "Which method is used to add an element at the end of an array?",
                options: [
                  "push()",
                  "append()",
                  "addToEnd()",
                  "insert()"
                ],
                correctAnswer: 0
              },
              {
                question: "What does DOM stand for?",
                options: [
                  "Document Object Model",
                  "Data Object Model",
                  "Document Oriented Module",
                  "Digital Object Management"
                ],
                correctAnswer: 0
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Data Structures and Algorithms",
    description: "Master essential computer science concepts and problem-solving techniques.",
    videoUrl: "/videos/demo.mp4",
    progress: 5,
    duration: "8 weeks",
    topicsCount: 40,
    lessonsCount: 32,
    price: 89.99,
    enrolledStudents: 750,
    instructor: "Prof. Robert Chen",
    language: "English",
    certificate: "Included",
    topics: [
      {
        weekTitle: "Week 1-2",
        subtitle: "Basic Data Structures",
        lessons: [
          { 
            title: "Introduction to Data Structures", 
            type: "video",
            videoId: "ds-vid-1",
            videoUrl: "/videos/data-structures-intro.mp4",
            locked: false,
            duration: 20,
            watched: false,
            description: "Overview of fundamental data structures in computer science."
          },
          { 
            title: "Arrays and Linked Lists", 
            type: "video",
            videoId: "arrays-vid-1",
            videoUrl: "https://www.youtube.com/watch?v=arrays-linkedlists",
            locked: false,
            duration: 25,
            watched: false,
            description: "Understanding linear data structures and their implementations."
          },
          { 
            title: "Stacks and Queues", 
            type: "video",
            videoId: "stacks-vid-1",
            videoUrl: "/videos/stacks-queues.mp4",
            locked: true,
            duration: 22,
            watched: false,
            description: "Learn about LIFO and FIFO data structures and their applications."
          },
          { 
            title: "Data Structures Reference Guide", 
            type: "pdf",
            pdfUrl: "/pdfs/data-structures-guide.pdf",
            locked: true,
            fileSize: "4.2 MB",
            pages: 32,
            description: "Comprehensive guide to all basic data structures with examples."
          },
          { 
            title: "Basic Data Structures Assessment", 
            type: "quiz",
            locked: true,
            questions: 15,
            timeLimit: 30,
            passingScore: 80,
            attempts: 0,
            maxAttempts: 3,
            quiz: [
              {
                question: "Which data structure follows the LIFO principle?",
                options: [
                  "Queue",
                  "Stack",
                  "Linked List",
                  "Tree"
                ],
                correctAnswer: 1
              },
              {
                question: "What is the time complexity of accessing an element in an array?",
                options: [
                  "O(1)",
                  "O(n)",
                  "O(log n)",
                  "O(n²)"
                ],
                correctAnswer: 0
              },
              {
                question: "Which of these is NOT a linear data structure?",
                options: [
                  "Array",
                  "Linked List",
                  "Queue",
                  "Tree"
                ],
                correctAnswer: 3
              }
            ]
          }
        ]
      },
      {
        weekTitle: "Week 3-4",
        subtitle: "Algorithm Analysis and Sorting Techniques",
        lessons: [
          { 
            title: "Big O Notation", 
            type: "video",
            videoId: "bigo-vid-1",
            videoUrl: "/videos/big-o-notation.mp4",
            locked: true,
            duration: 30,
            watched: false,
            description: "Understanding algorithm efficiency and complexity analysis."
          },
          { 
            title: "Sorting Algorithms", 
            type: "video",
            videoId: "sorting-vid-1",
            videoUrl: "https://www.youtube.com/watch?v=sorting-algorithms",
            locked: true,
            duration: 35,
            watched: false,
            description: "Learn about different sorting techniques and their performance."
          },
          { 
            title: "Algorithm Complexity Cheat Sheet", 
            type: "pdf",
            pdfUrl: "/pdfs/algorithm-complexity.pdf",
            locked: true,
            fileSize: "1.5 MB",
            pages: 8,
            description: "Quick reference for time and space complexity of common algorithms."
          },
          { 
            title: "Algorithms Assessment", 
            type: "quiz",
            locked: true,
            questions: 12,
            timeLimit: 25,
            passingScore: 75,
            attempts: 0,
            maxAttempts: 2,
            quiz: [
              {
                question: "What is the worst-case time complexity of quicksort?",
                options: [
                  "O(n)",
                  "O(n log n)",
                  "O(n²)",
                  "O(2ⁿ)"
                ],
                correctAnswer: 2
              },
              {
                question: "Which sorting algorithm has the best average-case performance?",
                options: [
                  "Bubble Sort",
                  "Insertion Sort",
                  "Merge Sort",
                  "Selection Sort"
                ],
                correctAnswer: 2
              }
            ]
          }
        ]
      }
    ]
  }
];