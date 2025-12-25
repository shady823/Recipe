import React, { useState } from "react";

export default function SimpleSearch({ items, onFilter }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = items.filter((item) =>
      item.strMeal.toLowerCase().includes(value.toLowerCase())
    );

    onFilter(filtered);
  };

  return (
    <div className="py-4 mb-5 flex justify-center md:justify-start">
      <input
        type="text"
        placeholder="Filter recipes..."
        value={searchTerm}
        onChange={handleChange}
        className="w-full sm:w-1/3 p-2 border rounded-lg"
      />
    </div>
  );
}
