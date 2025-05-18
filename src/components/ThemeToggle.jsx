import React from "react";
import { useDarkMode } from "usehooks-ts";

const ThemeToggle = () => {
  const { isDarkMode, toggle } = useDarkMode();

  return (
    <button
      onClick={toggle}
      className="absolute top-6 right-6 bg-white/80 dark:bg-gray-800 rounded-full p-2 shadow transition"
      title="Toggle light/dark mode"
    >
      {isDarkMode ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
