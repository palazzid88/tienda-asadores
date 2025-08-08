import { getCategories, getProducts } from '@/lib/sanity'
import CategorySection from '@/components/CategorySection'

export default async function Home() {
  const categories = await getCategories()
  const products = await getProducts()

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-8">Tienda Todo para el Asador</h1>
      {categories.map(category => (
        <CategorySection 
          key={category._id} 
          category={category} 
          products={products.filter(p => p.category?.slug.current === category.slug.current)} 
        />
      ))}
    </main>
  )
}
