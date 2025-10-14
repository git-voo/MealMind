export default function ToastNotification({ message }) {
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-white shadow-lg px-5 py-3 rounded-xl flex items-center gap-2">
      <span>🌱</span>

      <p className="text-sm text-gray-700">
        <strong>Personalization Notice:</strong> {message}
      </p>
    </div>
  );
}
