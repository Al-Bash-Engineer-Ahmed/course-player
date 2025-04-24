"use client";

export default function LeaderboardModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  // Sample leaderboard data - in a real app, this would come from an API
  const leaderboardData = [
    { rank: 1, name: "أحمد محمد", points: 1250, avatar: "/images/avatar1.png" },
    { rank: 2, name: "حاتم أحمد", points: 1100, avatar: "/images/avatar2.png" },
    { rank: 3, name: "محمد علي", points: 950, avatar: "/images/avatar3.png" },
    { rank: 4, name: "شريف حسن", points: 900, avatar: "/images/avatar4.png" },
    { rank: 5, name: "عمر خالد", points: 850, avatar: "/images/avatar5.png" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">لوحة المتصدرين</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <span className="material-icons">close</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {leaderboardData.map((user) => (
              <div 
                key={user.rank}
                className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-8 h-8 flex items-center justify-center font-semibold text-gray-600">
                  #{user.rank}
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.points} نقطة</div>
                </div>
                {user.rank <= 3 && (
                  <div className="text-2xl">
                    {user.rank === 1 && '🥇'}
                    {user.rank === 2 && '🥈'}
                    {user.rank === 3 && '🥉'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}