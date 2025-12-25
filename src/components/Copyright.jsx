import React from "react";

export default function Copyright() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" bg-white dark:bg-gray-900 dark:text-orange-500  text-gray-500  py-4 flex justify-center z-20">
      <div className="border-t pt-3 border-gray-300 w-8/9 text-center">
        <p className="text-sm">
          &copy; {currentYear} Meals App. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
