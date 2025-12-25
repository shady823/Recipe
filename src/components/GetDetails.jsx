import React from "react";
import { Button } from "@heroui/react";
import { FaYoutube } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa";

export default function GetDetails({ meal }) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} : ${meal[`strMeasure${i}`]}`
      );
    }
  }

  return (
    <div className="p-4 md:ml-64 sm:pb-20">
      <h1 className="foodName text-3xl font-bold mb-4 dark:text-orange-500 ">
        {meal.strMeal}
      </h1>
      <div className="inner_details grid gap-4 lg:grid-cols-3">
        <div className="imgButton">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full max-w-md mx-auto lg:mx-0 rounded-lg mb-4"
          />
          <div className="buttons flex justify-center gap-4">
            <div className="youtube_btn">
              <a href={meal.strYoutube}>
                <Button className="youtube p-3" variant="solid">
                  <FaYoutube className="text-2xl" />
                  Youtube
                </Button>
              </a>
            </div>
            <div className="source_btn">
              <a href={meal.strSource}>
                <Button color="success" className="source p-3" variant="solid">
                  <FaGlobe className="text-2xl" />
                  Source
                </Button>
              </a>
            </div>
          </div>
        </div>
        <div className="instructions">
          <h2 className="text-xl font-semibold mb-2 text-center md:text-left">
            Instructions
          </h2>
          <p>{meal.strInstructions}</p>
        </div>
        <div className="ingredients bg-white dark:bg-gray-700 rounded-xl shadow-md p-6">
          <h2 className="text-xl dark:text-white font-semibold mb-4 text-gray-800 border-b pb-2">
            Ingredients
          </h2>
          <ul className="list-disc list-inside mb-4 space-y-2">
            {ingredients.map((item, index) => (
              <li
                className="flex justify-content-between items-center text-gray-800 dark:bg-gray-500 dark:text-white bg-gray-50 px-4 py-2 rounded-lg"
                key={index}
              >
                {item}
              </li> //The index key is optional I made it to give it a key
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
