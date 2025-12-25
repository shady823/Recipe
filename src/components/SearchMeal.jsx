import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MealCard from "../components/MealCard";

export default function SearchMeal() {
  const { name } = useParams(); // prefill search
  const [search, setSearch] = useState(name || "");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch meals whenever search changes
  useEffect(() => {
    if (!search) {
      setMeals([]);
      return;
    }

    const fetchMeals = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
        );
        const data = await res.json();
        setMeals(data.meals || []);
      } catch (err) {
        console.error(err);
        setMeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [search]);

  // Handle input search
  const handleSearch = async () => {
    if (!search.trim()) return;

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search.trim()}`
      );
      const data = await res.json();

      if (data.meals && data.meals.length > 0) {
        navigate(`/meal/${data.meals[0].idMeal}`);
      } else {
        alert("No meals found");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching meal");
    }
  };

  return (
    <div className="px-4 ">
      {/* Search Input */}
      <div className="py-4 flex flex-col sm:flex-row sm:items-center sm:gap-2">
        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 p-2 border rounded-lg"
        />
        <button
          onClick={handleSearch}
          className="mt-2 sm:mt-0 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
        >
          Search
        </button>
      </div>

      {/* Loading / No results */}
      {loading && <p>Loading...</p>}
      {!loading && meals.length === 0 && search && (
        <p className="my-7">
          No meals found with the name {search} here are the closest recipes
        </p>
      )}

      {/* Meal cards */}
      {!loading && meals.length > 0 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {meals.map((meal) => (
            <div className="mt-5">
              <MealCard key={meal.idMeal} meal={meal} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
