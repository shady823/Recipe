import React from "react";
import Icon from "../assets/Icon.png";

export default function Footer() {
  return (
    <footer className="w-full bg-white py-4 px-6  shadow-inner z-20 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src={Icon} alt="Logo" className="w-20 h-20" />
        </div>

        <div>
          <p className="text-2xl md:text-3xl font-bold text-orange-500">
            Route
          </p>
        </div>
      </div>
    </footer>
  );
}
