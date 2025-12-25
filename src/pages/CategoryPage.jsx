import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Home_button from "../components/Home_button";
import CategoryCard from "../components/CategoryCard";
import LoadingSpinner from "../components/LoadingSpinner";
import SimpleSearch from "../components/SimpleSearch";
export default function CategoryPage() {
  const { name } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredMeals, setFilteredMeals] = useState([]);
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const url =
          name === "All"
            ? "https://www.themealdb.com/api/json/v1/1/search.php?s="
            : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`;

        const res = await fetch(url);
        const data = await res.json();
        setMeals(data.meals || []);
        setFilteredMeals(data.meals || []);
      } catch (err) {
        console.error(err);
        setMeals([]);
        setFilteredMeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [name]);

  return (
    <div className="px-4 md:ml-64">
      <Home_button />
      <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
        <span className="text-orange-500 font-extrabold">{name}</span> Meals
      </h1>
      <SimpleSearch items={meals} onFilter={setFilteredMeals} />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading ? (
          <LoadingSpinner />
        ) : filteredMeals.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No meals found.
          </p>
        ) : (
          filteredMeals.map((meal) => (
            <CategoryCard key={meal.idMeal} meal={meal} />
          ))
        )}
      </div>
    </div>
  );
}
