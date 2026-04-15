import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import HackathonCard from "@/components/HackathonCard";
import TeamCard from "@/components/TeamCard";
import SearchBar from "@/components/SearchBar";
import { hackathons } from "@/data/hackathons";
import { loadTeams, saveTeams } from "@/data/teams";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [teams, setTeams] = useState(() => loadTeams());
  const [joinedTeams, setJoinedTeams] = useState<Set<string>>(new Set());

  // Filter hackathons by search and skill
  const filteredHackathons = useMemo(() => {
    return hackathons.filter((hackathon) => {
      const matchesSearch =
        hackathon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hackathon.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hackathon.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSkill =
        !selectedSkill || hackathon.skillsNeeded.includes(selectedSkill);

      return matchesSearch && matchesSkill;
    });
  }, [searchQuery, selectedSkill]);

  // Filter teams by search and skill
  const filteredTeams = useMemo(() => {
    return teams.filter((team) => {
      const matchesSearch = team.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesSkill =
        !selectedSkill || team.skillsNeeded.includes(selectedSkill);
      return matchesSearch && matchesSkill;
    });
  }, [teams, searchQuery, selectedSkill]);

  // Get unique skills from all hackathons
  const allSkills = Array.from(
    new Set(hackathons.flatMap((h) => h.skillsNeeded))
  ).sort();

  const handleJoinTeam = (teamId: string) => {
    if (!joinedTeams.has(teamId)) {
      setJoinedTeams(new Set(joinedTeams).add(teamId));
      const updatedTeams = teams.map((team) => {
        if (team.id === teamId) {
          return {
            ...team,
            members: [...team.members, "You"],
            membersNeeded: Math.max(0, team.membersNeeded - 1),
          };
        }
        return team;
      });
      setTeams(updatedTeams);
      saveTeams(updatedTeams);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Find Your Hackathon
        </h1>
        <p className="text-gray-600 mb-8">
          Browse events and find teams that match your skills.
        </p>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search hackathons or teams..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Filter by what you know
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSkill("")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedSkill === ""
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Skills
              </button>
              {allSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => setSelectedSkill(skill)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedSkill === skill
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs for Hackathons and Teams */}
        <Tabs defaultValue="hackathons" className="w-full">
          <TabsList className="grid w-full max-w-xs grid-cols-2">
            <TabsTrigger value="hackathons">
              Hackathons ({filteredHackathons.length})
            </TabsTrigger>
            <TabsTrigger value="teams">Teams ({filteredTeams.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="hackathons" className="mt-6">
            {filteredHackathons.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {filteredHackathons.map((hackathon) => (
                  <HackathonCard
                    key={hackathon.id}
                    hackathon={hackathon}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No hackathons match that. Try a different search.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="teams" className="mt-6">
            {filteredTeams.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredTeams.map((team) => (
                  <TeamCard
                    key={team.id}
                    team={team}
                    onJoin={handleJoinTeam}
                    isJoined={joinedTeams.has(team.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No teams found. Try adjusting your filters.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
