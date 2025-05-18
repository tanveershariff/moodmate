import React, { useState, useEffect } from "react";
import EmojiSelector from "./components/EmojiSelector";
import CalendarView from "./components/CalendarView";
import MoodSummary from "./components/MoodSummary";
import MotivationalQuote from "./components/MotivationalQuote";
import RightPanel from "./components/RightPanel";
import JSConfetti from 'js-confetti'
import html2canvas from "html2canvas";

const jsConfetti = new JSConfetti()

const getStreak = (moodData) => {
  const dates = Object.keys(moodData).sort((a, b) => new Date(b) - new Date(a));
  let streak = 0;
  let current = new Date();
  for (let i = 0; i < dates.length; i++) {
    const dateStr = current.toISOString().split("T")[0];
    if (dates.includes(dateStr)) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
};

const getLatestMood = (moodData) => {
  const dates = Object.keys(moodData).sort((a, b) => new Date(b) - new Date(a));
  return moodData[dates[0]];
};

export default function App() {
  
  const mockMoodData = {
    "2025-05-17": { emoji: "😊", label: "Happy", color: "bg-yellow-400" },
    "2025-05-16": { emoji: "😐", label: "Neutral", color: "bg-gray-400" },
    "2025-05-15": { emoji: "😊", label: "Happy", color: "bg-yellow-400" },
    "2025-05-14": { emoji: "😊", label: "Happy", color: "bg-yellow-400" },
    "2025-05-13": { emoji: "😊", label: "Happy", color: "bg-yellow-400" },
    "2025-05-12": { emoji: "😊", label: "Happy", color: "bg-yellow-400" },
    "2025-05-11": { emoji: "😊", label: "Happy", color: "bg-yellow-400" },
    "2025-05-10": { emoji: "😊", label: "Happy", color: "bg-yellow-400" },
    "2025-05-09": { emoji: "😊", label: "Happy", color: "bg-yellow-400" },
    "2025-05-08": { emoji: "😊", label: "Happy", color: "bg-yellow-400" },
    "2025-05-07": { emoji: "😊", label: "Happy", color: "bg-yellow-400" },
    "2025-05-06": { emoji: "😊", label: "Happy", color: "bg-yellow-400" },
    "2025-05-05": { emoji: "😊", label: "Happy", color: "bg-yellow-400" },
    "2025-05-04": { emoji: "😊", label: "Happy", color: "bg-yellow-400" },
    "2025-05-03": { emoji: "😊", label: "Happy", color: "bg-yellow-400" },
    "2025-05-02": { emoji: "😊", label: "Happy", color: "bg-yellow-400" },
    "2025-05-01": { emoji: "😊", label: "Happy", color: "bg-yellow-400" },
  };

  const mockJournal = {
    "2025-05-20": "Had a great day at work! Completed all my tasks and got positive feedback.",
    "2025-05-19": "Feeling peaceful after meditation session. Need to make this a daily habit.",
    "2025-05-18": "Went for a long walk in the park. Nature always helps me feel better.",
    "2025-05-17": "Spent quality time with family. Made some great memories.",
    "2025-05-16": "Regular day, nothing special but feeling content.",
  };

  const [moodData, setMoodData] = useState(mockMoodData);
  const [journal, setJournal] = useState(mockJournal);
  const [note, setNote] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [backgroundStyle, setBackgroundStyle] = useState({});

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPercent = (clientX / innerWidth) * 100;
      const yPercent = (clientY / innerHeight) * 100;

    
      const newBackgroundStyle = {
        backgroundImage: `radial-gradient(at ${xPercent}% ${yPercent}%, #a855f7, #60a5fa, #f9a8d4)`,
      };
      setBackgroundStyle(newBackgroundStyle);
    };

    const appContainer = document.querySelector('.app-container'); 
    if (appContainer) {
       appContainer.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (appContainer) {
        appContainer.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []); 

  const handleMoodSelect = (mood) => {
    const today = new Date().toISOString().split("T")[0];
    const updated = { ...moodData, [today]: mood };
    setMoodData(updated);
    jsConfetti.addConfetti({
      emojis: [mood.emoji],
      emojiSize: 50,
      confettiNumber: 120,
    });
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setNote(journal[date] || "");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-purple-400 via-blue-300 to-pink-200 flex items-center justify-center app-texture-overlay app-container" style={backgroundStyle}>
      <div className="flex flex-col md:flex-row w-full h-full gap-8 p-6">
        {/* Left Panel */}
        <div className="md:w-1/4 w-full bg-white rounded-3xl shadow-2xl ring-2 ring-purple-100 p-8 flex flex-col items-center justify-start backdrop-blur-md border border-purple-200">
          <h1 className="text-4xl font-extrabold mb-6 text-purple-700 drop-shadow">MoodMate</h1>
          <EmojiSelector onMoodSelect={handleMoodSelect} />
          <div className="mt-4 text-purple-700 font-bold text-lg">
            🔥 Streak: {getStreak(moodData)} day{getStreak(moodData) !== 1 ? "s" : ""}
          </div>
          <MotivationalQuote latestMood={getLatestMood(moodData)} />
        </div>
        {/* Center Panel */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <CalendarView moodData={moodData} onDayClick={handleDayClick} />
          <div className="flex flex-col items-center">
            <MoodSummary moodData={moodData} id="mood-summary" />
            <button
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-lg border-2 border-purple-700 hover:bg-white hover:text-purple-700 hover:border-purple-700 hover:shadow-2xl hover:scale-105 transition font-bold focus:outline-none focus:ring-2 focus:ring-purple-400"
              onClick={() => {
                const node = document.getElementById("mood-summary");
                if (node) {
                  html2canvas(node).then((canvas) => {
                    const link = document.createElement("a");
                    link.download = "mood-summary.png";
                    link.href = canvas.toDataURL();
                    link.click();
                  });
                }
              }}
            >
              Export as Image
            </button>
          </div>
        </div>
        {/* Right Panel */}
        <div className="hidden lg:flex lg:w-1/3 items-center justify-center bg-gradient-to-br from-white via-pink-50 to-purple-100 rounded-3xl shadow-2xl ring-2 ring-purple-100 p-8 backdrop-blur-md border border-purple-200">
          <RightPanel latestMood={getLatestMood(moodData)} />
        </div>
      </div>
      {selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-2 text-purple-700">Mood Journal for {selectedDate}</h2>
            <textarea
              className="w-full p-2 border rounded mb-4"
              rows={4}
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Write your thoughts for today..."
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setSelectedDate(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                onClick={() => {
                  setJournal({ ...journal, [selectedDate]: note });
                  setSelectedDate(null);
                  setNote("");
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}