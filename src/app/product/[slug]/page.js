import { sanityClient, urlFor } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'

export default async function ProductPage({ params }) {
  const { slug } = params

  const query = `
    *[_type == "product" && slug.current == $slug][0]{
      title,
      description,
      image,
      category->{
        title,
        "slug": slug.current
      },
      variants
    }
  `

  const product = await sanityClient.fetch(query, { slug })

  if (!product) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold">Producto no encontrado</h2>
        <Link href="/" className="text-blue-500 underline">
          Volver al inicio
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <Link href="/" className="text-blue-500 underline">← Volver</Link>

      <div className="grid md:grid-cols-2 gap-8 mt-6">
        {product.image && (
          <Image
            src={urlFor(product.image).width(600).height(600).url()}
            alt={product.title}
            width={600}
            height={600}
            className="rounded-lg shadow-md object-cover"
          />
        )}

        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          {product.category && (
            <p className="text-sm text-gray-500 mt-1">
              Categoría:{' '}
              <Link
                href={`/category/${product.category.slug}`}
                className="text-blue-500 underline"
              >
                {product.category.title}
              </Link>
            </p>
          )}

          <p className="mt-6 leading-relaxed text-gray-700">{product.description}</p>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Variantes</h2>
            {product.variants && product.variants.length > 0 ? (
              product.variants.map((variant, index) => {
                // Armar el mensaje para WhatsApp
                const message = encodeURIComponent(
                  `Hola, quiero consultar por el producto "${product.title}", variante: "${variant.description || 'Sin descripción'}", código: ${variant.code || 'No tiene código'}.`
                )
                const whatsappLink = `https://wa.me/5493364309084?text=${message}` // Cambiá el número al tuyo

                return (
                  <div key={index} className="border p-4 rounded mb-4 shadow-sm">
                    {variant.description && <p className="font-medium">{variant.description}</p>}
                    <p className="text-green-600 font-bold">${variant.price?.toFixed(2) ?? 'Sin precio'}</p>
                    {variant.promocion && (
                      <span className="inline-block bg-yellow-300 text-yellow-900 px-2 py-1 rounded text-xs font-semibold">
                        Promoción
                      </span>
                    )}
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                      Consultar
                    </a>
                  </div>
                )
              })
            ) : (
              <p>No hay variantes disponibles.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
