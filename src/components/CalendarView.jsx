import React from "react";

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

const CalendarView = ({ moodData, onDayClick, journal }) => {
  // Revert to getting current month and year dynamically
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = getDaysInMonth(year, month);

  const formatDate = (day) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  return (
    <div className="bg-white/80 rounded-2xl shadow-2xl p-6 w-full max-w-md mx-auto mt-8 animate-fade-in-down">
      <h2 className="text-2xl font-bold mb-6 text-purple-700 tracking-wide text-center drop-shadow">
        {/* Display current month and year */}
        {today.toLocaleString("default", { month: "long" })} {year}
      </h2>
      <div className="grid grid-cols-7 gap-3">
        {[...Array(daysInMonth)].map((_, i) => {
          const date = formatDate(i + 1);
          const mood = moodData?.[date];
          return (
            <div
              key={date}
              className={`
                h-12 w-12 flex items-center justify-center rounded-full
                text-lg font-semibold shadow transition-all duration-300
                ${mood ? mood.color + " text-white scale-110" : "bg-gray-200 text-gray-500"}
                hover:scale-125 hover:ring-2 hover:ring-purple-400 cursor-pointer
                animate-fade-in
              `}
              style={{ animationDelay: `${i * 0.02}s`, cursor: "pointer" }}
              title={mood ? mood.label : ""}
              onClick={() => onDayClick && onDayClick(date)}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
