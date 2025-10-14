export default function GroceryUpload() {
  return (
    <section className="bg-white rounded-2xl shadow p-5 mt-4">
      <h2 className="text-lg font-semibold mb-3">Upload your grocery receipt</h2>

      <div className="flex gap-4 mb-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Upload Receipt</button>
        <button className="bg-gray-100 px-4 py-2 rounded-lg border">Take Photo</button>
      </div>

      <hr className="my-3" />
      <h3 className="font-medium mb-2">Detected Items:</h3>

      <div className="flex flex-wrap gap-2">
        {["Eggs (12)", "Milk (1L)", "Spinach (1 bag)"].map((item) => (
          <span key={item} className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm">
            ✅ {item}
          </span>
        ))}
      </div>

      <button className="mt-4 text-green-700 underline">+ Add Item Manually</button>
    </section>
  );
}
