import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaUserPlus, FaUserCheck } from 'react-icons/fa';

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Fetch user data and posts from Firebase
    // This is a placeholder for demonstration
    const dummyUser = {
      id: userId,
      username: 'user1',
      bio: 'Photography enthusiast',
      followers: 120,
      following: 85,
      posts: 24
    };

    const dummyPosts = [
      {
        id: 1,
        imageUrl: 'https://via.placeholder.com/300',
        likes: 42,
        comments: 5
      },
      {
        id: 2,
        imageUrl: 'https://via.placeholder.com/300',
        likes: 15,
        comments: 2
      }
    ];

    setUser(dummyUser);
    setPosts(dummyPosts);
    setLoading(false);
  }, [userId]);

  const handleFollow = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setIsFollowing(!isFollowing);
    // TODO: Update follow status in Firebase
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center">
          <img
            src={`https://via.placeholder.com/150`}
            alt={user.username}
            className="w-24 h-24 rounded-full mr-6"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{user.username}</h2>
              {currentUser && currentUser.uid !== userId && (
                <button
                  onClick={handleFollow}
                  className={`flex items-center px-4 py-2 rounded-md ${
                    isFollowing
                      ? 'bg-gray-200 text-gray-800'
                      : 'bg-pink-600 text-white'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <FaUserCheck className="mr-2" />
                      Following
                    </>
                  ) : (
                    <>
                      <FaUserPlus className="mr-2" />
                      Follow
                    </>
                  )}
                </button>
              )}
            </div>
            <div className="flex space-x-8 mb-4">
              <div>
                <span className="font-bold">{user.posts}</span> posts
              </div>
              <div>
                <span className="font-bold">{user.followers}</span> followers
              </div>
              <div>
                <span className="font-bold">{user.following}</span> following
              </div>
            </div>
            <p className="text-gray-800">{user.bio}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {posts.map(post => (
          <div key={post.id} className="relative group">
            <img
              src={post.imageUrl}
              alt="Post"
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="text-white text-center">
                <div className="flex items-center justify-center space-x-4">
                  <div>
                    <span className="font-bold">{post.likes}</span> likes
                  </div>
                  <div>
                    <span className="font-bold">{post.comments}</span> comments
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile; 