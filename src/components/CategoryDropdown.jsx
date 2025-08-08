"use client";

import { useState } from "react";

export default function CategoryDropdown({ categories }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        Categorías
        <span className="ml-2">&#x25BC;</span>
      </button>

      {isOpen && (
        <ul className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((cat) => (
              <li key={cat.slug?.current || cat.slug}>
                <a
                  href={`/category/${cat.slug?.current || cat.slug}`}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  {cat.title || cat.name}
                </a>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No hay categorías</li>
          )}
        </ul>
      )}
    </div>
  );
}
