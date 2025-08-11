import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '../lib/sanity' // ajusta según tu estructura

export default function ProductCard({ product }) {
  const imageUrl = product.image ? urlFor(product.image).width(400).height(300).url() : null
  const productSlug = product.slug?.current || product.slug
  const mainVariant = product.variants?.[0] || {}

  // console.log("slug", productSlug)
  // console.log("product", product)

  return (
    <div className="w-60 flex-shrink-0 border rounded shadow p-4 flex flex-col">
      {/* <p>Hola desde ProductCard</p> */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={product.title}
          width={400}
          height={300}
          className="mb-2 rounded object-cover"
        />
      ) : (
        <div className="bg-gray-200 h-40 mb-2 flex items-center justify-center">
          <span className="text-gray-500">Sin imagen</span>
        </div>
      )}

      <h3 className="text-lg font-medium mb-1">{product.title}</h3>

      {mainVariant.price !== undefined && (
        <p className="text-yellow-600 font-bold mb-2">${mainVariant.price.toFixed(2)}</p>
      )}

      {mainVariant.description && (
        <p className="text-sm text-gray-700 mb-4">{mainVariant.description}</p>
      )}

       <Link
        href={`/product/${productSlug}`}
        className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-center"
        prefetch={false}
      >
        Ver más
      </Link>
    </div>
  )
}
