import { useState, useEffect } from "react"
import ModifyPopup from "./ModifyPopup"
import { getFromStorage, saveToStorage } from "../utils/storage"
import { useToast } from "../context/ToastContext"


const randomId = () => Math.random().toString(36).substr(2, 9)

export default function WeeklyMealPlan() {
  const [mealPlan, setMealPlan] = useState(() => getFromStorage("mealPlan"))
  const [isGenerating, setIsGenerating] = useState(false)
  const [editingMeal, setEditingMeal] = useState(null) // {dayId, mealId, mealName}

  const shelfItems = getFromStorage("shelfItems")

  const { showToast } = useToast()


  const mockMeals = [
    "Oatmeal with {item}",
    "Grilled {item} Salad",
    "Pasta with {item} Sauce",
    "{item} Stir-fry Bowl",
    "Scrambled {item} Wrap",
    "Toasted Bread & {item}",
    "{item} Smoothie",
    "{item} Soup & Bread",
  ]

  useEffect(() => {
    saveToStorage("mealPlan", mealPlan)
  }, [mealPlan])

  const generateNewWeek = () => {
    if (!shelfItems || shelfItems.length === 0) {
      alert("No shelf items found. Please upload a grocery receipt first.")
      return
    }

    setIsGenerating(true)

    setTimeout(() => {
      const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
      const newPlan = days.map((day) => {
        const mealsForDay = Array.from({ length: 3 }).map(() => {
          const template = mockMeals[Math.floor(Math.random() * mockMeals.length)]
          const randomItem = shelfItems[Math.floor(Math.random() * shelfItems.length)]
          const name = template.replace("{item}", randomItem.name.split(" ")[0])
          return { id: randomId(), name }
        })
        return { id: randomId(), day, items: mealsForDay }
      })

      setMealPlan(newPlan)
      saveToStorage("mealPlan", newPlan)
      setIsGenerating(false)
      showToast("Your new weekly plan is ready! 🍽️", "info")
    }, 2000)
  }

  const clearPlan = () => {
    setMealPlan([])
    saveToStorage("mealPlan", [])
  }

  const handleRemoveMeal = (dayId, mealId) => {
    const updated = mealPlan.map((d) =>
      d.id === dayId
        ? { ...d, items: d.items.filter((m) => m.id !== mealId) }
        : d
    )
    setMealPlan(updated)
    saveToStorage("mealPlan", updated)
    showToast("Meal removed from plan ❌", "error")
  }

  const handleAcceptModification = (dayId, mealId, newMealName) => {
    const updated = mealPlan.map((day) =>
      day.id === dayId
        ? {
          ...day,
          items: day.items.map((meal) =>
            meal.id === mealId ? { ...meal, name: newMealName } : meal
          ),
        }
        : day
    )

    setMealPlan(updated)
    saveToStorage("mealPlan", updated)
    showToast("Meal updated successfully ✅", "success")
    setEditingMeal(null) // close popup
  }

  return (
    <section className="bg-white rounded-2xl shadow p-5 mt-6 relative">
      <h2 className="text-lg font-semibold mb-3">
        Weekly Meal Plan (Based on Your Shelf)
      </h2>

      {isGenerating && (
        <p className="text-center text-gray-500 italic mb-3">
          Generating personalized meal plan...
        </p>
      )}

      {mealPlan.length > 0 ? (
        <>
          {mealPlan.map(({ id: dayId, day, items }) => (
            <div key={dayId} className="mb-4">
              <div className="font-semibold text-gray-600">{day}</div>
              {items.map((meal) => (
                <div
                  key={meal.id}
                  className="flex justify-between items-center mt-1 bg-gray-50 px-3 py-2 rounded-lg"
                >
                  <span>{meal.name}</span>
                  <div className="flex gap-2">
                    <button className="bg-green-500 text-white px-2 rounded">
                      ✔
                    </button>
                    <button
                      onClick={() =>
                        setEditingMeal({ dayId, mealId: meal.id, mealName: meal.name })
                      }
                      className="bg-gray-200 text-gray-700 px-2 rounded"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleRemoveMeal(dayId, meal.id)}
                      className="bg-red-400 text-white px-2 rounded"
                    >
                      ✖
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className="flex gap-3">
            <button
              onClick={generateNewWeek}
              className="flex-1 bg-green-500 text-white py-2 rounded-lg mt-3"
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate New Week"}
            </button>
            <button
              onClick={clearPlan}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg mt-3"
            >
              Clear Plan
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="text-gray-500 mb-3">
            No meal plan yet. Generate one using your shelf items.
          </p>
          <button
            onClick={generateNewWeek}
            className="bg-green-500 text-white py-2 px-4 rounded-lg"
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate New Week"}
          </button>
        </div>
      )}

      {editingMeal && (
        <ModifyPopup
          dayId={editingMeal.dayId}
          mealId={editingMeal.mealId}
          mealName={editingMeal.mealName}
          onAccept={handleAcceptModification}
          onClose={() => setEditingMeal(null)}
        />
      )}
    </section>
  )
}
