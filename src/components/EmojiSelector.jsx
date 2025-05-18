import React from "react";

const moods = [
  { emoji: "😊", label: "Happy", color: "bg-yellow-300" },
  { emoji: "😌", label: "Calm", color: "bg-blue-300" },
  { emoji: "😐", label: "Neutral", color: "bg-gray-300" },
  { emoji: "😔", label: "Sad", color: "bg-blue-500" },
  { emoji: "😡", label: "Angry", color: "bg-red-400" },
];

const EmojiSelector = ({ onMoodSelect }) => (
  <div className="flex flex-col items-center">
    <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
    <div className="flex gap-4 flex-wrap justify-center">
      {moods.map((mood) => (
        <button
          key={mood.label}
          onClick={() => onMoodSelect(mood)}
          className={`
            ${mood.color}
            w-16 h-16 rounded-full text-3xl flex items-center justify-center
            transform transition-all duration-200 hover:scale-110 active:scale-95
            shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
          `}
          aria-label={`Select ${mood.label} mood`}
        >
          {mood.emoji}
        </button>
      ))}
    </div>
  </div>
);

export default EmojiSelector;
