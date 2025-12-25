import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MealCard from "../components/MealCard";
import SimpleSearch from "../components/SimpleSearch";

export default function AreaPage() {
  const { name } = useParams();
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      setFetching(true);
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`
        );
        const data = await res.json();

        if (data.meals) {
          const fullMeals = await Promise.all(
            data.meals.map(async (meal) => {
              const resDetail = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
              );
              const detailData = await resDetail.json();
              return detailData.meals[0];
            })
          );
          setMeals(fullMeals);
          setFilteredMeals(fullMeals);
        } else {
          setMeals([]);
          setFilteredMeals([]);
        }
      } catch (err) {
        console.error(err);
        setMeals([]);
        setFilteredMeals([]);
      } finally {
        setFetching(false);
      }
    };

    fetchMeals();
  }, [name]);

  return (
    <div className="px-4 md:ml-64">
      <h1 className="text-2xl font-semibold text-center md:text-left mb-10">
        Meals that are{" "}
        <span className="text-orange-500 font-extrabold">{name}</span>
      </h1>

      <SimpleSearch items={meals} onFilter={setFilteredMeals} />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {fetching ? (
          <p className="col-span-full text-center my-20 text-gray-500">
            Loading...
          </p>
        ) : filteredMeals.length === 0 ? (
          <p className="col-span-full text-center my-20 text-gray-500">
            No meals found.
          </p>
        ) : (
          filteredMeals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))
        )}
      </div>
    </div>
  );
}
