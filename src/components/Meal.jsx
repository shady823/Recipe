import React, { useEffect, useState } from "react";
import MealCard from "./MealCard";

export default function Meal() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((res) => res.json())
      .then((data) => {
        if (data.meals) setMeals(data.meals);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading meals...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {meals.map((meal) => (
        <MealCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
}
