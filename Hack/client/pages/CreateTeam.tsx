import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { loadTeams, saveTeams } from "@/data/teams";
import { hackathons } from "@/data/hackathons";
import { Plus, X } from "lucide-react";

export default function CreateTeam() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    hackathonId: hackathons[0].id,
    description: "",
    membersNeeded: 1,
    skillsNeeded: [] as string[],
  });
  const [skillInput, setSkillInput] = useState("");

  const allSkills = Array.from(
    new Set(hackathons.flatMap((h) => h.skillsNeeded))
  ).sort();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "membersNeeded" ? parseInt(value) : value,
    }));
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.skillsNeeded.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skillsNeeded: [...prev.skillsNeeded, skill],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skillsNeeded: prev.skillsNeeded.filter((s) => s !== skill),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Give your team a name");
      return;
    }

    if (formData.skillsNeeded.length === 0) {
      alert("Add at least one skill to your team");
      return;
    }

    const teams = loadTeams();
    const newTeam = {
      id: `t${Date.now()}`,
      name: formData.name,
      hackathonId: formData.hackathonId,
      description: formData.description,
      membersNeeded: formData.membersNeeded,
      skillsNeeded: formData.skillsNeeded,
      members: ["You"],
      createdBy: "You",
    };

    teams.push(newTeam);
    saveTeams(teams);

    alert("Team created! Go find your teammates.");
    navigate("/dashboard");
  };

  const selectedHackathon = hackathons.find(
    (h) => h.id === formData.hackathonId
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Build Your Team</h1>
        <p className="text-gray-600 mb-8">
          Create a team and tell people what you're looking for.
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          {/* Team Name */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Team Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Code Warriors, AI Dreamers, etc."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Hackathon Selection */}
          <div className="mb-6">
            <label
              htmlFor="hackathonId"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Which hackathon?
            </label>
            <select
              id="hackathonId"
              name="hackathonId"
              value={formData.hackathonId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {hackathons.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.title} ({h.location})
                </option>
              ))}
            </select>
            {selectedHackathon && (
              <p className="mt-2 text-sm text-gray-600">
                📅 {selectedHackathon.date}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              What's your team about?
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Tell people what you're building and why they should join..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Members Needed */}
          <div className="mb-6">
            <label
              htmlFor="membersNeeded"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              How many people do you need?
            </label>
            <select
              id="membersNeeded"
              name="membersNeeded"
              value={formData.membersNeeded}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "person" : "people"}
                </option>
              ))}
            </select>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              What skills are you looking for?
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Type a skill..."
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill(skillInput);
                  }
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => addSkill(skillInput)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            {/* Suggested Skills */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-500 mb-2">QUICK ADD</p>
              <div className="flex flex-wrap gap-2">
                {allSkills
                  .filter((skill) => !formData.skillsNeeded.includes(skill))
                  .map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => addSkill(skill)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded transition-colors"
                    >
                      + {skill}
                    </button>
                  ))}
              </div>
            </div>

            {/* Selected Skills */}
            <div className="flex flex-wrap gap-2">
              {formData.skillsNeeded.map((skill) => (
                <div
                  key={skill}
                  className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded flex items-center gap-2"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="hover:text-blue-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Create Team
          </button>
        </form>
      </div>
    </div>
  );
}
