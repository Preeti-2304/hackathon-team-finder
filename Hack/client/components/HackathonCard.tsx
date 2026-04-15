import { Link } from "react-router-dom";
import { Calendar, MapPin, Users } from "lucide-react";
import type { Hackathon } from "@/data/hackathons";

interface HackathonCardProps {
  hackathon: Hackathon;
}

export default function HackathonCard({ hackathon }: HackathonCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={hackathon.image}
        alt={hackathon.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {hackathon.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3">{hackathon.description}</p>

        <div className="space-y-2 mb-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            {hackathon.date}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            {hackathon.location}
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            {hackathon.participants} participants
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 mb-2">SKILLS NEEDED</p>
          <div className="flex flex-wrap gap-2">
            {hackathon.skillsNeeded.map((skill) => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <Link
          to="/explore"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors inline-block text-center"
        >
          Find Team
        </Link>
      </div>
    </div>
  );
}
