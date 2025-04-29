import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaHome, FaPlus, FaCompass, FaUser, FaSignInAlt } from 'react-icons/fa';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-pink-600">
            Instagram Clone
          </Link>

          {currentUser ? (
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-pink-600">
                <FaHome className="w-6 h-6" />
              </Link>
              <Link to="/create-post" className="text-gray-600 hover:text-pink-600">
                <FaPlus className="w-6 h-6" />
              </Link>
              <Link to="/explore" className="text-gray-600 hover:text-pink-600">
                <FaCompass className="w-6 h-6" />
              </Link>
              <Link to={`/profile/${currentUser.uid}`} className="text-gray-600 hover:text-pink-600">
                <FaUser className="w-6 h-6" />
              </Link>
              <button
                onClick={handleLogout}
                className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-pink-600">
                <FaHome className="w-6 h-6" />
              </Link>
              <Link to="/explore" className="text-gray-600 hover:text-pink-600">
                <FaCompass className="w-6 h-6" />
              </Link>
              <Link
                to="/login"
                className="flex items-center text-gray-600 hover:text-pink-600"
              >
                <FaSignInAlt className="w-6 h-6 mr-2" />
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 