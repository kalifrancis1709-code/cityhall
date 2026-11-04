export default function SidebarSearch() {
  return (
    <div className="flex border-2 border-gray-200 rounded-md focus-within:ring-2 ring-teal-500">
      <input
        type="text"
        className="w-full rounded-tl-md rounded-bl-md px-2 py-3 text-sm text-gray-600 focus:outline-none"
        placeholder="Search"
      />
      <button
        type="button"
        className="rounded-tr-md rounded-br-md px-2 py-3 hidden md:block"
        aria-label="Rechercher"
      >
        <svg
          className="w-4 h-4 fill-current"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
