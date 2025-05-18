import React from "react";
import HappyMascot from '../assets/mascot-happy.svg';
import NeutralMascot from '../assets/mascot-neutral.svg';
import SadMascot from '../assets/mascot-sad.svg';
import AngryMascot from '../assets/mascot-angry.svg';
import CalmMascot from '../assets/mascot-calm.svg';

const mascotMap = {
  Happy: HappyMascot,
  Neutral: NeutralMascot,
  Sad: SadMascot,
  Angry: AngryMascot,
  Calm: CalmMascot,
};

const challenges = [
  "Take a 5-minute walk.",
  "Write down one thing you're grateful for.",
  "Drink a glass of water.",
  "Compliment yourself.",
  "Take 3 deep breaths.",
  "Listen to your favorite song.",
  "Stretch for 2 minutes.",
  "Send a kind message to a friend.",
  "Read a page of a book.",
  "Smile at yourself in the mirror.",
];

const RightPanel = ({ latestMood }) => {
  const mascotSrc = mascotMap[latestMood?.label] || NeutralMascot;
  const today = new Date();
  const challenge = challenges[
    (today.getDate() + today.getMonth() + today.getFullYear()) % challenges.length
  ];

  return (
    <div className="flex flex-col items-center justify-start h-full w-full animate-fade-in relative pt-8">
      <h2 className="text-4xl font-bold mb-4 text-purple-700">Your Mood Here</h2>
      <img
        src={mascotSrc}
        alt={`${latestMood?.label || "Neutral"} Mascot`}
        className="w-72 h-72 mb-4 transition-all duration-300"
        style={{ filter: "drop-shadow(0 0 20px #a78bfa)" }}
      />
      <div className="bg-white/70 rounded-xl shadow p-4 mt-6 text-center text-blue-700 font-semibold">
        🌟 Daily Challenge: {challenge}
      </div>
    </div>
  );
};

export default RightPanel;
