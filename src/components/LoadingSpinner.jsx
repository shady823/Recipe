import React from "react";

export default function LoadingSpinner({ size = "12", color = "orange-500" }) {
  return (
    <div className="col-span-full text-center py-10">
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-t-4 border-${color} mx-auto`}
      ></div>
    </div>
  );
}
