import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Home_button() {
  const { name } = useParams();
  const selected = name || "All";
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((res) => res.json())
      .then((data) => setCategories(data.meals))
      .catch((err) => console.error(err));
  }, []);

  // Handle selection (both buttons and radios)
  const handleSelect = (category) => {
    if (category === "All") {
      navigate("/");
    } else {
      navigate(`/category/${category}`);
    }
  };

  return (
    <div className="w-full">
      <h1 className="homeHeader text-3xl font-bold mb-2 ">
        Learn, Cook, Eat Your Food
      </h1>

      {/* Desktop Buttons */}
      <div className="hidden sm:flex flex-wrap gap-3 py-4">
        <button
          onClick={() => handleSelect("All")}
          className={`home_button px-4 py-2 rounded-lg transition ${
            selected === "All"
              ? "bg-orange-500 text-white"
              : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700"
          }`}
        >
          All
        </button>

        {categories.map((food) => (
          <button
            key={food.strCategory}
            onClick={() => handleSelect(food.strCategory)}
            className={`home_button px-4 py-2 rounded-lg transition ${
              selected === food.strCategory
                ? "bg-orange-500 text-white"
                : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700"
            }`}
          >
            {food.strCategory}
          </button>
        ))}
      </div>

      {/* Mobile Radio Select */}
      <div className="sm:hidden py-4">
        <select
          value={selected}
          onChange={(e) => handleSelect(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="All">All</option>
          {categories.map((food) => (
            <option key={food.strCategory} value={food.strCategory}>
              {food.strCategory}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
