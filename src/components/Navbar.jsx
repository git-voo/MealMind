import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navItems = [
    { icon: "🏠", label: "Home", to: "/" },
    { icon: "🧺", label: "Shelf", to: "/shelf" },
    { icon: "📅", label: "Plan", to: "/plan" },
    { icon: "⚙️", label: "Settings", to: "#" },
  ];

  return (
    <nav className="flex justify-around bg-white shadow-sm py-3 rounded-xl">
      {navItems.map((item, i) => (
        <NavLink
          key={i}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-2 ${
              isActive ? "text-green-600 font-semibold" : "text-gray-700"
            }`
          }
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
