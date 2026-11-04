import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  // Équivalent de x-data="{ sidenav: true }"
  const [sidenav, setSidenav] = useState<boolean>(true);

  return (
    <div
      id="view"
      className="h-full w-screen flex flex-row font-poppins antialiased"
    >
      <button
        type="button"
        onClick={() => setSidenav(true)}
        className="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden"
        aria-label="Ouvrir le menu"
      >
        <svg
          className="w-5 h-5 fill-current"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <Sidebar open={sidenav} onClose={() => setSidenav(false)} />
    </div>
  );
}
