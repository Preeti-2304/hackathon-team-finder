import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { loadTeams } from "@/data/teams";
import { hackathons } from "@/data/hackathons";
import { Award, Users, Trophy } from "lucide-react";
import type { Team } from "@/data/teams";

export default function Dashboard() {
  const [createdTeams, setCreatedTeams] = useState<Team[]>([]);
  const [joinedTeams, setJoinedTeams] = useState<Team[]>([]);

  useEffect(() => {
    const teams = loadTeams();

    // Separate created and joined teams
    const created = teams.filter((t) => t.createdBy === "You");
    const joined = teams.filter((t) => t.members.includes("You") && t.createdBy !== "You");

    setCreatedTeams(created);
    setJoinedTeams(joined);
  }, []);

  const getHackathonName = (hackathonId: string) => {
    return hackathons.find((h) => h.id === hackathonId)?.title || "Unknown";
  };

  const TeamListItem = ({ team, isCreated }: { team: Team; isCreated: boolean }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{team.name}</h3>
          <p className="text-sm text-gray-600">
            {getHackathonName(team.hackathonId)}
          </p>
        </div>
        {isCreated ? (
          <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded">
            Team Lead
          </span>
        ) : (
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded">
            Member
          </span>
        )}
      </div>

      <p className="text-gray-600 text-sm mb-4">{team.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">TEAM SIZE</p>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-gray-900">
              {team.members.length} members
            </span>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">OPEN SPOTS</p>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-gray-900">
              {team.membersNeeded}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-500 mb-2">MEMBERS</p>
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

      <div>
        <p className="text-xs font-semibold text-gray-500 mb-2">LOOKING FOR</p>
        <div className="flex flex-wrap gap-2">
          {team.skillsNeeded.map((skill) => (
            <span
              key={skill}
              className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Teams</h1>
        <p className="text-gray-600 mb-8">
          Keep track of what you're building.
        </p>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Teams You Lead</p>
                <p className="text-4xl font-bold text-gray-900">
                  {createdTeams.length}
                </p>
              </div>
              <Trophy className="w-12 h-12 text-blue-100" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Teams You're In</p>
                <p className="text-4xl font-bold text-gray-900">
                  {joinedTeams.length}
                </p>
              </div>
              <Users className="w-12 h-12 text-green-100" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Teammates</p>
                <p className="text-4xl font-bold text-gray-900">
                  {createdTeams.reduce((sum, t) => sum + t.members.length, 0) +
                    joinedTeams.reduce((sum, t) => sum + t.members.length, 0)}
                </p>
              </div>
              <Award className="w-12 h-12 text-purple-100" />
            </div>
          </div>
        </div>

        {/* Teams Sections */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Created Teams */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-blue-600" />
              Leading
            </h2>
            {createdTeams.length > 0 ? (
              <div className="space-y-4">
                {createdTeams.map((team) => (
                  <TeamListItem key={team.id} team={team} isCreated={true} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-600">
                  You haven't created a team yet.{" "}
                  <a href="/create-team" className="text-blue-600 hover:underline font-medium">
                    Start one
                  </a>
                </p>
              </div>
            )}
          </div>

          {/* Joined Teams */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-green-600" />
              Joined
            </h2>
            {joinedTeams.length > 0 ? (
              <div className="space-y-4">
                {joinedTeams.map((team) => (
                  <TeamListItem key={team.id} team={team} isCreated={false} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-600">
                  You're not in any teams yet.{" "}
                  <a href="/explore" className="text-blue-600 hover:underline font-medium">
                    Find one
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
