import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-800 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-purple-500 mb-4">ABI-MOVIES</h3>
            <p className="text-gray-400">
              Discover popular, top-rated, and upcoming movies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-purple-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="/favorites" className="hover:text-purple-400 transition-colors">Favorites</a>
              </li>
              <li>
                <a href="/genres" className="hover:text-purple-400 transition-colors">Genres</a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-400 transition-colors"><FaFacebookF /></a>
              <a href="#" className="hover:text-purple-400 transition-colors"><FaTwitter /></a>
              <a href="#" className="hover:text-purple-400 transition-colors"><FaInstagram /></a>
              <a href="#" className="hover:text-purple-400 transition-colors"><FaYoutube /></a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} ABI-MOVIES. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
