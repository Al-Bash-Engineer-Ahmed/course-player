export default function CourseHeader({ title }) {
  return (
    <div className="py-8 bg-gradient-to-br from-indigo-900 via-blue-800 to-blue-900 rounded-xl shadow-lg mb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
            <p className="text-lg text-blue-100">Master the art of SEO and drive organic traffic to your website</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-xl ring-2 ring-blue-400 ring-opacity-50">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}