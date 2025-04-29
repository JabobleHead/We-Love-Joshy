import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaHeart, FaRegHeart, FaComment } from 'react-icons/fa';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Fetch posts from Firebase
    // This is a placeholder for demonstration
    const dummyPosts = [
      {
        id: 1,
        username: 'user1',
        imageUrl: 'https://via.placeholder.com/500',
        caption: 'Beautiful sunset!',
        likes: 42,
        comments: [
          { id: 1, username: 'user2', text: 'Amazing!' },
          { id: 2, username: 'user3', text: 'Great shot!' }
        ]
      },
      {
        id: 2,
        username: 'user2',
        imageUrl: 'https://via.placeholder.com/500',
        caption: 'My new artwork',
        likes: 15,
        comments: [
          { id: 3, username: 'user1', text: 'Love it!' }
        ]
      }
    ];
    setPosts(dummyPosts);
    setLoading(false);
  }, []);

  const handleLike = (postId) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleComment = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    // TODO: Implement comment functionality
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {posts.map(post => (
        <div key={post.id} className="bg-white rounded-lg shadow-md mb-8">
          <div className="p-4 flex items-center">
            <img
              src={`https://via.placeholder.com/40`}
              alt={post.username}
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="font-semibold">{post.username}</span>
          </div>
          <img
            src={post.imageUrl}
            alt={post.caption}
            className="w-full h-96 object-cover"
          />
          <div className="p-4">
            <div className="flex items-center space-x-4 mb-2">
              <button
                onClick={() => handleLike(post.id)}
                className="text-2xl text-gray-600 hover:text-pink-600"
              >
                <FaRegHeart />
              </button>
              <button 
                onClick={handleComment}
                className="text-2xl text-gray-600 hover:text-pink-600"
              >
                <FaComment />
              </button>
            </div>
            <p className="font-semibold mb-1">{post.likes} likes</p>
            <p className="mb-2">
              <span className="font-semibold mr-2">{post.username}</span>
              {post.caption}
            </p>
            <div className="text-gray-500 text-sm">
              {post.comments.map(comment => (
                <p key={comment.id} className="mb-1">
                  <span className="font-semibold mr-2">{comment.username}</span>
                  {comment.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home; 