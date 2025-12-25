import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";

export default function MealCard({ meal }) {
  const navigate = useNavigate();

  return (
    <div className="my-9 relative bg-white dark:bg-orange-500 rounded-2xl shadow-lg pt-40 md:pt-42 pb-6 px-4 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className=" absolute -top-12 w-50 h-50   md:w-48 md:h-48 rounded-full object-cover shadow-lg transition-transform duration-500 hover:scale-105"
      />

      <div className="p-4 dark:text-gray-900">
        <h2 className="font-bold text-lg">{meal.strMeal}</h2>

        <Button
          onPress={() => navigate(`/meal/${meal.idMeal}`)}
          className="mt-4 px-8 py-6 bg-orange-500 dark:bg-gray-900 text-white rounded-full font-medium hover:bg-orange-600 transition"
        >
          View Recipe
        </Button>
      </div>
    </div>
  );
}
