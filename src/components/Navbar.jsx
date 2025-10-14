export default function Navbar() {
  const navItems = [
    { icon: "🏠", label: "Home" },
    { icon: "🧺", label: "Shelf" },
    { icon: "📅", label: "Plan" },
    { icon: "⚙️", label: "Settings" },
  ];

  return (
    <nav className="flex justify-around bg-white shadow-sm py-3 rounded-xl">
      {navItems.map((item, i) => (
        <button key={i} className="flex items-center gap-2 text-gray-700 hover:text-green-600">
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
