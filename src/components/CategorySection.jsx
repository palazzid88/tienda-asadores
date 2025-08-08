import ProductCard from './ProductCard'

export default function CategorySection({ category, products }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{category.title}</h2>
      <div className="flex overflow-x-auto space-x-4 py-2">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {/* Aquí podés agregar botón "Ver todos" */}
    </section>
  )
}
