import Image from 'next/image'
import { urlFor } from '@/lib/sanity' // importa el helper

export default function ProductCard({ product }) {
  const imageUrl = product.image ? urlFor(product.image).width(400).height(300).url() : null

  return (
    <div className="w-60 flex-shrink-0 border rounded shadow p-4">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={product.title}
          width={400}
          height={300}
          className="mb-2 rounded object-cover"
          priority={false}
        />
      ) : (
        <div className="bg-gray-200 h-40 mb-2 flex items-center justify-center">
          <span className="text-gray-500">Sin imagen</span>
        </div>
      )}
      <h3 className="text-lg font-medium">{product.title}</h3>
    </div>
  )
}
