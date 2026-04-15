import { Link } from "react-router-dom";
import { Sparkles, Users, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import HackathonCard from "@/components/HackathonCard";
import { hackathons } from "@/data/hackathons";

export default function Home() {
  const featuredHackathons = hackathons.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Stop hunting for teammates</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Find the right people for your hackathon project. Create a team, discover teammates with the skills you need, and actually build something cool together.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/explore"
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Browse Teams & Hackathons
            </Link>
            <Link
              to="/create-team"
              className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Start Your Team
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Explore Teams</h3>
              <p className="text-gray-600">
                See what teams are looking for. Check their skills, size, and what they're building.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Match Your Skills</h3>
              <p className="text-gray-600">
                Filter by skills you have. Find teams that actually need what you can do.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Join & Build</h3>
              <p className="text-gray-600">
                Click join, get in the team, and start working on your hackathon project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hackathons */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Happening Now</h2>
          <p className="text-gray-600 mb-8">Check out these upcoming hackathons</p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {featuredHackathons.map((hackathon) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/explore"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              See All Events
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to ship something?</h2>
          <p className="text-lg text-blue-100 mb-8">
            Your next great team is out there. Let's find them.
          </p>
          <Link
            to="/explore"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 HackFinder. Made for hackers.</p>
        </div>
      </footer>
    </div>
  );
}
