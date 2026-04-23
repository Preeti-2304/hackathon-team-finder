export interface Hackathon {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  skillsNeeded: string[];
  image: string;
  participants: number;
}

export const hackathons: Hackathon[] = [
  {
    id: "1",
    title: "AI & ML Summit 2024",
    date: "March 15-17, 2024",
    location: "San Francisco, CA",
    description: "Build with AI and machine learning. 48-hour event focused on cool AI applications.",
    skillsNeeded: ["Python", "ML", "TensorFlow"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    participants: 250,
  },
  {
    id: "2",
    title: "Web Dev Challenge",
    date: "March 22-24, 2024",
    location: "New York, NY",
    description: "Build a web app in a weekend. React, Vue, or whatever. Just make it fast.",
    skillsNeeded: ["React", "JavaScript", "UI/UX"],
    image: "https://images.pexels.com/photos/574069/pexels-photo-574069.jpeg?w=400&h=300&fit=crop",
    participants: 180,
  },
  {
    id: "3",
    title: "Mobile App Hackathon",
    date: "April 5-7, 2024",
    location: "Austin, TX",
    description: "Create native mobile apps. iOS, Android, whatever you want to build.",
    skillsNeeded: ["Swift", "Kotlin", "React Native"],
    image: "https://images.pexels.com/photos/20694602/pexels-photo-20694602.png?w=400&h=300&fit=crop",
    participants: 200,
  },
  {
    id: "4",
    title: "Cloud & DevOps Sprint",
    date: "April 12-14, 2024",
    location: "Seattle, WA",
    description: "Deploy something to the cloud. AWS, Azure, Google Cloud—your choice.",
    skillsNeeded: ["AWS", "DevOps", "Docker"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
    participants: 150,
  },
  {
    id: "5",
    title: "Blockchain Innovation Challenge",
    date: "April 26-28, 2024",
    location: "Boston, MA",
    description: "Experiment with blockchain and Web3. Build something interesting on chain.",
    skillsNeeded: ["Solidity", "Web3", "Ethereum"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400&h=300&fit=crop",
    participants: 120,
  },
  {
    id: "6",
    title: "Design & Prototyping Sprint",
    date: "May 3-5, 2024",
    location: "Los Angeles, CA",
    description: "Design-focused hackathon. Build something beautiful and functional.",
    skillsNeeded: ["UI Design", "Figma", "CSS"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    participants: 160,
  },
];
