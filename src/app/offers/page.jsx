import Link from 'next/link'
import { sanityClient } from '@/lib/sanity'

export const metadata = {
  title: 'Ofertas - Tienda Asadores',
  description: 'Productos en promoción destacados en Tienda Asadores',
}

export default async function OffersPage() {
  const query = `*[_type == "product" && variants[promocion == true]]{
    _id,
    title,
    slug,
    image,
    variants[]{
      _key,
      code,
      description,
      price,
      promocion
    }
  }`

  const products = await sanityClient.fetch(query)

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Ofertas Destacadas</h1>
      {products.length === 0 ? (
        <p>No hay productos en promoción actualmente.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="border rounded shadow p-4">
              {product.slug?.current ? (
                <Link href={`/product/${product.slug.current}`} className="block mb-2">
                  {product.image?.asset ? (
                    <img
                      src={`https://cdn.sanity.io/images/yourProjectId/yourDataset/${product.image.asset._ref}.webp`}
                      alt={product.title}
                      className="w-full h-48 object-cover rounded"
                    />
                  ) : (
                    <div className="bg-gray-200 w-full h-48 flex items-center justify-center text-gray-500 rounded">
                      Sin imagen
                    </div>
                  )}
                  <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
                </Link>
              ) : (
                <div className="block mb-2">
                  {product.image?.asset ? (
                    <img
                      src={`https://cdn.sanity.io/images/yourProjectId/yourDataset/${product.image.asset._ref}.webp`}
                      alt={product.title}
                      className="w-full h-48 object-cover rounded"
                    />
                  ) : (
                    <div className="bg-gray-200 w-full h-48 flex items-center justify-center text-gray-500 rounded">
                      Sin imagen
                    </div>
                  )}
                  <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
                </div>
              )}

              <ul className="mt-2">
                {product.variants
                  .filter(variant => variant.promocion)
                  .map(variant => (
                    <li key={variant._key} className="border-t pt-2 mt-2">
                      <p><strong>{variant.description || variant.code}</strong></p>
                      <p className="text-yellow-600 font-bold">${variant.price.toFixed(2)}</p>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
