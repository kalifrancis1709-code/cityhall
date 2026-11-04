import { useRef } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import SidebarProfile from "./SidebarProfile";
import SidebarSearch from "./SidebarSearch";
import SidebarMenu from "./SidebarMenu";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Équivalent de @click.away="sidenav = false"
  useClickOutside(ref, onClose);

  return (
    <div
      id="sidebar"
      ref={ref}
      className={`${
        open ? "block" : "hidden"
      } md:block bg-white h-screen shadow-xl px-3 md:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out`}
    >
      <div className="space-y-6 md:space-y-10 mt-10">
        <h1 className="font-bold text-4xl text-center md:hidden">
          D<span className="text-teal-600">.</span>
        </h1>
        <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">
          Dashwind<span className="text-teal-600">.</span>
        </h1>

        <SidebarProfile
          name="Eduard Pantazi"
          role="Administrator"
          avatarUrl="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80"
        />
        <SidebarSearch />
        <SidebarMenu />
      </div>
    </div>
  );
}
