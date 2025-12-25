import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetDetails from "../components/GetDetails";
import LoadingSpinner from "../components/LoadingSpinner";

export default function RecipeDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchMeal = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        if (data.meals) setMeal(data.meals[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!meal) return <p className="p-4 text-center">Recipe not found!</p>;

  return <GetDetails meal={meal} />;
}
