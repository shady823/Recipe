import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Area() {
  const [areas, setAreas] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArea = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
        );
        const data = await res.json();
        if (data.meals) setAreas(data.meals);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArea();
  }, []);

  // Filter areas based on my search
  const filteredAreas = areas.filter((area) =>
    area.strArea.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-4 md:ml-64">
      <h1 className="text-3xl font-bold mb-4 text-center md:text-left">Area</h1>

      <input
        type="text"
        placeholder="Search Area..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg"
      />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <LoadingSpinner /> // spinner component
        ) : filteredAreas.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No Area found.
          </p>
        ) : (
          filteredAreas.map((area) => (
            <div
              key={area.strArea}
              className="border rounded-lg p-4 text-center cursor-pointer hover:bg-orange-500 hover:text-white  transition-colors duration-500"
              onClick={() => navigate(`/area/${area.strArea}`)}
            >
              <h2 className="font-semibold">{area.strArea}</h2>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
