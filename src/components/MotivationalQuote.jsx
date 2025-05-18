import React, { useState, useEffect } from "react";

const quotes = [
  "Every day may not be good, but there is something good in every day.",
  "Keep your face always toward the sunshine—and shadows will fall behind you.",
  "You are capable of amazing things.",
  "Small steps every day.",
  "Your mood matters. Take care of yourself!",
];

const emojis = ["🌈", "🌻", "💪", "🌞", "🦋", "🌟", "😊", "🧠"];

const MotivationalQuote = ({ latestMood }) => {
  const [currentQuote, setCurrentQuote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);
  const [currentEmoji, setCurrentEmoji] = useState(() => emojis[Math.floor(Math.random() * emojis.length)]);

  useEffect(() => {
    
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      setCurrentEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
    
  }, [latestMood]);

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-white via-pink-50 to-purple-100 rounded-xl shadow ring-2 ring-purple-100 border border-purple-200 p-4 mt-6 animate-fade-in min-h-[120px] h-[140px] w-full">
      {}
      <div key={currentQuote} className="text-5xl mb-2 transition-opacity duration-500 ease-in-out">{currentEmoji}</div>
      <div key={currentQuote + currentEmoji} className="text-purple-700 font-semibold text-center text-base leading-snug px-2 transition-opacity duration-500 ease-in-out">
        {currentQuote}
      </div>
    </div>
  );
};

export default MotivationalQuote;
