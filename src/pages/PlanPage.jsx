import { getFromStorage } from "../utils/storage";

export default function PlanPage() {
  const mealPlan = getFromStorage("mealPlan");

  return (
    <section className="bg-white rounded-2xl shadow p-5 mt-4">
      <h2 className="text-lg font-semibold mb-3">📅 My Weekly Plan</h2>
      {mealPlan.length > 0 ? (
        mealPlan.map(({ id, day, items }) => (
          <div key={id} className="mb-4">
            <h3 className="font-semibold text-gray-600 mb-1">{day}</h3>
            <ul className="space-y-1">
              {items.map((meal) => (
                <li
                  key={meal.id}
                  className="bg-gray-50 px-3 py-2 rounded-lg flex justify-between items-center"
                >
                  <span>{meal.name}</span>
                  <span className="text-green-500">✔</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">
          No meal plan generated yet. Go back and generate one.
        </p>
      )}
    </section>
  );
}
