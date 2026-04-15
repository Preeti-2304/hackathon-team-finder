export interface Team {
  id: string;
  name: string;
  hackathonId: string;
  membersNeeded: number;
  skillsNeeded: string[];
  members: string[];
  createdBy: string;
  description: string;
}

export const initialTeams: Team[] = [
  {
    id: "t1",
    name: "Neural Nexus",
    hackathonId: "1",
    membersNeeded: 2,
    skillsNeeded: ["Python", "ML"],
    members: ["Alex Chen"],
    createdBy: "Alex Chen",
    description: "Building an image recognition AI. We need solid Python + ML experience.",
  },
  {
    id: "t2",
    name: "React Rebels",
    hackathonId: "2",
    membersNeeded: 1,
    skillsNeeded: ["React", "JavaScript"],
    members: ["Sam Park", "Jordan Lee"],
    createdBy: "Sam Park",
    description: "Making a rad dashboard app. Looking for one more React developer who knows their stuff.",
  },
  {
    id: "t3",
    name: "Cloud Coders",
    hackathonId: "4",
    membersNeeded: 3,
    skillsNeeded: ["AWS", "DevOps"],
    members: ["Taylor Davis"],
    createdBy: "Taylor Davis",
    description: "Deploying a scalable backend on AWS. Need people who won't get lost with Docker and DevOps.",
  },
  {
    id: "t4",
    name: "Swift Squad",
    hackathonId: "3",
    membersNeeded: 2,
    skillsNeeded: ["Swift"],
    members: ["Morgan Ellis", "Casey Robinson"],
    createdBy: "Morgan Ellis",
    description: "Building a slick iOS app. We're experienced, need a couple more solid Swift devs.",
  },
];

export function loadTeams(): Team[] {
  const stored = localStorage.getItem("hackathon_teams");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return initialTeams;
    }
  }
  return initialTeams;
}

export function saveTeams(teams: Team[]): void {
  localStorage.setItem("hackathon_teams", JSON.stringify(teams));
}
