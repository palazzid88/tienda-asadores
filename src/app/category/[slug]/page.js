import { sanityClient } from '@/lib/sanity'
import CategorySection from '@/components/CategorySection'

export const revalidate = 60 // opcional: ISR, refresca cada 60s

export async function generateStaticParams() {
  // Obtener todos los slugs de categorías para prerenderizar rutas
  const query = `*[_type == "category"]{ "slug": slug.current }`
  const categories = await sanityClient.fetch(query)
  return categories.map(cat => ({ slug: cat.slug }))
}

export default async function CategoryPage({ params }) {
  const { slug } = params

  // Consulta GROQ para traer categoría y productos filtrados por slug
  const query = `{
    "category": *[_type == "category" && slug.current == $slug][0],
    "products": *[_type == "product" && category->slug.current == $slug]{
      _id,
      title,
      image,
      variants
    }
  }`

  const { category, products } = await sanityClient.fetch(query, { slug })

  if (!category) {
    return <p>Categoría no encontrada</p>
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{category.title}</h1>
      <CategorySection category={category} products={products} />
    </main>
  )
}
