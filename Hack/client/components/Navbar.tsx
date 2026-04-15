import { Link } from "react-router-dom";
import { Users } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-90">
            <Users className="w-6 h-6" />
            HackFinder
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="hover:text-blue-100 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/explore"
              className="hover:text-blue-100 transition-colors"
            >
              Explore
            </Link>
            <Link
              to="/create-team"
              className="hover:text-blue-100 transition-colors"
            >
              Create Team
            </Link>
            <Link
              to="/dashboard"
              className="hover:text-blue-100 transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
