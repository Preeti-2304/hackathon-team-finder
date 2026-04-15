import { Users, Zap } from "lucide-react";
import type { Team } from "@/data/teams";

interface TeamCardProps {
  team: Team;
  onJoin: (teamId: string) => void;
  isJoined?: boolean;
}

export default function TeamCard({ team, onJoin, isJoined }: TeamCardProps) {
  const spotsFilled = team.members.length;
  const totalSpots = spotsFilled + team.membersNeeded;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-bold text-gray-900">{team.name}</h3>
        <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
          {team.membersNeeded} spots
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-3">{team.description}</p>

      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Team Progress
          </span>
          <span className="text-xs text-gray-600">
            {spotsFilled} / {totalSpots}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${(spotsFilled / totalSpots) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-xs font-semibold text-gray-500 mb-2">TEAM MEMBERS</p>
        <div className="flex flex-wrap gap-2">
          {team.members.map((member) => (
            <span
              key={member}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
            >
              {member}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-500 mb-2">SKILLS NEEDED</p>
        <div className="flex flex-wrap gap-2">
          {team.skillsNeeded.map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-1 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded"
            >
              <Zap className="w-3 h-3" />
              {skill}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onJoin(team.id)}
        disabled={isJoined}
        className={`w-full py-2 px-4 rounded font-medium transition-colors ${
          isJoined
            ? "bg-gray-200 text-gray-600 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {isJoined ? "Already Joined" : "Join Team"}
      </button>
    </div>
  );
}
