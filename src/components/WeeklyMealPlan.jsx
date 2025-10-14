import { useState } from "react";
import ModifyPopup from "./ModifyPopup";

export default function WeeklyMealPlan() {
  const [showPopup, setShowPopup] = useState(false);

  const meals = [
    { day: "MON", items: ["Oatmeal w/ Milk", "Spinach Salad", "Egg Pasta"] },
    { day: "TUE", items: ["Pancakes w/ Eggs", "Rice Bowl w/ Veg", "Soup & Bread"] },
  ];

  return (
    <section className="bg-white rounded-2xl shadow p-5 mt-6 relative">
      <h2 className="text-lg font-semibold mb-3">Weekly Meal Plan (Based on Your Shelf)</h2>

      {meals.map(({ day, items }) => (
        <div key={day} className="mb-4">
          <div className="font-semibold text-gray-600">{day}</div>
          {items.map((meal, i) => (
            <div key={i} className="flex justify-between items-center mt-1 bg-gray-50 px-3 py-2 rounded-lg">
              <span>{meal}</span>
              <div className="flex gap-2">
                <button className="bg-green-500 text-white px-2 rounded">✔</button>
                <button
                  onClick={() => setShowPopup(true)}
                  className="bg-gray-200 text-gray-700 px-2 rounded"
                >
                  ✏️
                </button>
                <button className="bg-red-400 text-white px-2 rounded">✖</button>
              </div>
            </div>
          ))}
        </div>
      ))}

      <button className="w-full bg-green-500 text-white py-2 rounded-lg mt-3">
        Generate New Week
      </button>

      {showPopup && <ModifyPopup onClose={() => setShowPopup(false)} />}
    </section>
  );
}
