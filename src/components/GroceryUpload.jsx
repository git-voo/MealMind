import { useState, useEffect, useRef } from "react"
import { saveToStorage, getFromStorage } from "../utils/storage"

const randomId = () => Math.random().toString(36).substr(2, 9)

export default function GroceryUpload() {
  const [shelfItems, setShelfItems] = useState(() => getFromStorage("shelfItems"))
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef(null) // reference for hidden input

  const mockGroceryPool = [
    "Eggs (12)",
    "Milk (1L)",
    "Spinach (1 bag)",
    "Bananas (6)",
    "Bread (1 loaf)",
    "Tomatoes (4)",
    "Yogurt (2 cups)",
    "Chicken Breast (1 lb)",
    "Oats (500g)",
    "Apples (5)",
  ]

  useEffect(() => {
    saveToStorage("shelfItems", shelfItems)
  }, [shelfItems])

  // When the button is clicked, open the file dialog
  const handleUploadClick = () => {
    fileInputRef.current.click()
  }

  // When a file is "uploaded", trigger mock processing
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) return

    setIsProcessing(true)

    // Simulate processing delay
    setTimeout(() => {
      const count = Math.floor(Math.random() * 3) + 4
      const randomItems = [...mockGroceryPool]
        .sort(() => 0.5 - Math.random())
        .slice(0, count)
        .map((name) => ({ id: randomId(), name }))

      setShelfItems(randomItems)
      setIsProcessing(false)

      // Reset file input (so user can re-upload again later)
      event.target.value = ""
    }, 2000)
  }

  const handleRemoveItem = (id) => {
    const updated = shelfItems.filter((item) => item.id !== id)
    setShelfItems(updated)
    saveToStorage("shelfItems", updated)
  }

  const handleClearShelf = () => {
    setShelfItems([])
    saveToStorage("shelfItems", [])
  }

  return (
    <section className="bg-white rounded-2xl shadow p-5 mt-4">
      <h2 className="text-lg font-semibold mb-3">Upload your grocery receipt</h2>

      {/* Hidden input field */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <div className="flex gap-4 mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
          onClick={handleUploadClick}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Upload Receipt"}
        </button>

        <button className="bg-gray-100 px-4 py-2 rounded-lg border">
          Take Photo
        </button>
      </div>

      {shelfItems.length > 0 ? (
        <>
          <hr className="my-3" />
          <h3 className="font-medium mb-2">Detected Items:</h3>
          <div className="flex flex-wrap gap-2">
            {shelfItems.map((item) => (
              <span
                key={item.id}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm flex items-center gap-2"
              >
                ✅ {item.name}
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-400 hover:text-red-600"
                  title="Remove"
                >
                  ✖
                </button>
              </span>
            ))}
          </div>

          <button
            onClick={handleClearShelf}
            className="mt-4 text-red-500 underline text-sm"
          >
            Clear Shelf
          </button>
        </>
      ) : (
        <p className="text-gray-500 text-sm mt-3">
          No items detected yet. Upload a receipt to begin.
        </p>
      )}
    </section>
  )
}
