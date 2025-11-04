import { getFromStorage } from "../utils/storage";

export default function ShelfPage() {
  const shelfItems = getFromStorage("shelfItems");

  return (
    <section className="bg-white rounded-2xl shadow p-5 mt-4">
      <h2 className="text-lg font-semibold mb-3">🧺 My Shelf</h2>
      {shelfItems.length > 0 ? (
        <ul className="space-y-2">
          {shelfItems.map((item) => (
            <li
              key={item.id}
              className="bg-green-50 px-3 py-2 rounded-lg text-gray-700 flex items-center justify-between"
            >
              <span>{item.name}</span>
              <span className="text-green-500">✓</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">No items in shelf yet. Upload a receipt to begin.</p>
      )}
    </section>
  );
}
