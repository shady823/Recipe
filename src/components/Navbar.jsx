import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUtensils, FaMoon, FaSun } from "react-icons/fa";
import RecipeImage from "../assets/Icon.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // Apply dark mode class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const links = [
    { to: "/", label: "Meals" },
    { to: "/ingredients", label: "Ingredients" },
    { to: "/area", label: "Area" },
  ];

  return (
    <>
      {/* ===== Mobile Top Bar ===== */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-white dark:bg-gray-900 flex items-center justify-between px-4 h-14">
        {/* Hamburger */}
        <button onClick={() => setOpen(!open)}>
          <svg
            className="w-7 h-7 text-black dark:text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Dark Mode Toggle */}
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? (
            <FaSun className="text-white" />
          ) : (
            <FaMoon className="text-gray-800" />
          )}
        </button>
      </div>

      {/* ===== Mobile Menu Overlay ===== */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ===== Sidebar ===== */}
      <aside
        className={`
          fixed top-0 left-0 z-12 h-full w-64 bg-white dark:bg-gray-900 text-black dark:text-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="p-6 text-2xl font-bold border-b border-gray-700 dark:border-gray-600">
          <img src={RecipeImage} alt="Logo" className="h-auto w-full" />
        </div>

        <nav className="flex flex-col gap-2 p-4">
          {links.map((link) => {
            const isActive =
              link.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`
                  px-4 py-2 flex items-center gap-2
                  transition-transform duration-200
                  ${
                    isActive
                      ? "text-white bg-orange-500 rounded-2xl"
                      : "text-black dark:text-white"
                  }
                  hover:scale-110
                `}
              >
                <FaUtensils />
                {link.label}
              </Link>
            );
          })}
          <button
            className="px-4 py-2 flex items-center gap-2"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <div className="flex items-center gap-2">
                <FaSun className="text-white" />
                <h2>Light Mode</h2>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <FaMoon className="text-gray-800" />
                <h2>Dark Mode</h2>
              </div>
            )}
          </button>
        </nav>
      </aside>
    </>
  );
}
