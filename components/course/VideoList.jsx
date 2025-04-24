import VideoCard from './VideoCard';

export default function VideoList({ videos }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video, index) => (
        <VideoCard 
          key={video.id} 
          video={video} 
          courseVideos={videos}
          videoIndex={index}
          hasNext={index < videos.length - 1}
          hasPrevious={index > 0}
        />
      ))}
    </div>
  );
}