import { menuItems } from "./menuItems";

export default function SidebarMenu() {
  return (
    <nav id="menu" className="flex flex-col space-y-2">
      {menuItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
        >
          {item.icon}
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
