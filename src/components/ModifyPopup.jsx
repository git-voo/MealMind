import { useState, useEffect } from "react"

export default function ModifyPopup({ dayId, mealId, mealName, onAccept, onClose }) {
  const [aiSuggestion, setAiSuggestion] = useState("")
  const [isThinking, setIsThinking] = useState(true)

  const mockAlternatives = [
    "Banana Smoothie 🥤",
    "Avocado Toast 🥑",
    "Greek Yogurt Bowl 🍓",
    "Veggie Omelette 🥦",
    "Fruit Salad 🍉",
    "Peanut Butter Oats 🥜",
    "Tofu Stir-fry 🍲",
  ]

  // Simulate AI “thinking”
  useEffect(() => {
    setIsThinking(true)
    const timer = setTimeout(() => {
      const randomAlt = mockAlternatives[Math.floor(Math.random() * mockAlternatives.length)]
      setAiSuggestion(randomAlt)
      setIsThinking(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [mealName])

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg p-5 w-[320px]">
        <h3 className="font-semibold mb-2">💬 Modify Meal</h3>

        <p className="text-sm text-gray-700 mb-1">
          You: I’d like to change <strong>{mealName}</strong>.
        </p>

        {isThinking ? (
          <p className="text-sm text-gray-500 italic mb-3">AI is thinking...</p>
        ) : (
          <p className="text-sm text-gray-700 mb-3">
            AI: Got it! How about <strong>{aiSuggestion}</strong> instead?
          </p>
        )}

        <div className="flex gap-3">
          <button
            disabled={isThinking}
            onClick={() => onAccept(dayId, mealId, aiSuggestion)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg w-full disabled:opacity-50"
          >
            Accept
          </button>
          <button
            onClick={onClose}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg w-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
