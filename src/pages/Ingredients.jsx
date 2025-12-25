import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIngredients = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
        );
        const data = await res.json();
        if (data.meals) setIngredients(data.meals);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.strIngredient.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-4 md:ml-64">
      <h1 className="text-3xl font-bold mb-4 text-center md:text-left ">
        Ingredients
      </h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search ingredients..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg"
      />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <LoadingSpinner />
        ) : filteredIngredients.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No ingredients found.
          </p>
        ) : (
          filteredIngredients.map((ingredient) => (
            <div
              key={ingredient.idIngredient}
              className="border border-black hover:border-orange-500 rounded-full p-4 text-center cursor-pointer text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-500"
              onClick={() =>
                navigate(`/ingredients/${ingredient.strIngredient}`)
              }
            >
              <h2 className="font-semibold">{ingredient.strIngredient}</h2>
              {ingredient.strThumb && (
                <img
                  src={ingredient.strThumb}
                  alt={
                    ingredient.strThumb
                      ? ingredient.strThumb + " image"
                      : "No image available"
                  }
                  className="mx-auto mt-2 h-24 w-24 object-cover rounded"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
