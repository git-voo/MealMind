export default function ModifyPopup({ onClose }) {
  return (
    <div className="absolute inset-0 flex justify-center items-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg p-5 w-[300px]">
        <h3 className="font-semibold mb-2">💬 Modify Tuesday Breakfast</h3>
        <p className="text-sm text-gray-700 mb-1">You: I don’t want eggs again.</p>
        <p className="text-sm text-gray-700 mb-3">
          AI: Got it! Replacing with <strong>Banana Smoothie 🥤</strong>
        </p>

        <div className="flex gap-3">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg w-full">Accept</button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg w-full">
            Show More Options
          </button>
        </div>

        <button
          className="block text-xs text-gray-500 mt-3 mx-auto underline"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
