import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      setLoading(true);
      // TODO: Implement user search in Firebase
      // This is a placeholder for demonstration
      const dummyUsers = [
        {
          id: '1',
          username: 'user1',
          profileImage: 'https://via.placeholder.com/50',
          bio: 'Photography enthusiast'
        },
        {
          id: '2',
          username: 'user2',
          profileImage: 'https://via.placeholder.com/50',
          bio: 'Travel lover'
        }
      ];
      setUsers(dummyUsers);
      setLoading(false);
    } else {
      setUsers([]);
    }
  }, [searchQuery]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {users.map(user => (
            <Link
              key={user.id}
              to={`/profile/${user.id}`}
              className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center">
                <img
                  src={user.profileImage}
                  alt={user.username}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-lg">{user.username}</h3>
                  <p className="text-gray-600 text-sm">{user.bio}</p>
                </div>
              </div>
            </Link>
          ))}
          {searchQuery && users.length === 0 && (
            <p className="text-center text-gray-500">No users found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Explore; 