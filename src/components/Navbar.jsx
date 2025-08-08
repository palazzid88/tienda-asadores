// src/components/Navbar.jsx
import Link from 'next/link'
import { sanityClient } from '@/lib/sanity'
import OffersLink from './OffersLink' // componente para ofertas

export default async function Navbar() {
  const query = `*[_type == "category"]{ title, slug }`
  const categories = await sanityClient.fetch(query)

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between">
      <div className="text-lg font-bold">
        <Link href="/">Mi Tienda</Link>
      </div>

      <ul className="flex items-center gap-6">
        <li>
          <Link href="/" className="hover:underline cursor-pointer">
            Inicio
          </Link>
        </li>
        <li>
          <OffersLink />
        </li>
        <li className="relative group">
          <button className="hover:underline cursor-pointer">
            Categorías ▼
          </button>
          <ul className="absolute hidden group-hover:block bg-white text-gray-900 mt-2 rounded shadow-lg">
            {categories.map(cat => (
              <li key={cat.slug.current || cat.slug}>
                <Link
                  href={`/category/${cat.slug.current || cat.slug}`}
                  className="block px-4 py-2 hover:bg-yellow-400 hover:text-white"
                >
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  )
}
