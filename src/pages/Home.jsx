import React from "react";
import Meal from "../components/Meal";
import Home_button from "../components/Home_button";
import SearchMeal from "../components/SearchMeal";
export default function Home() {
  return (
    <div className="px-4 md:ml-64 min-h-screen ">
      <Home_button />
      <SearchMeal />
      <Meal />
    </div>
  );
}
