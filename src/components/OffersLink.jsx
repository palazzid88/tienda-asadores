// src/components/OffersLink.jsx
import Link from 'next/link'
import { sanityClient } from '@/lib/sanity'

export default async function OffersLink() {
  // Consulta ejemplo: traer productos con variante marcada como promoción
  // (ajustá el query según tu schema)
  const query = `*[_type == "product" && variants[].promotion == true]{
    _id
  }`
  const offers = await sanityClient.fetch(query)

  return (
    <Link href="/offers" className="hover:underline cursor-pointer">
      Ofertas {offers.length > 0 ? `(${offers.length})` : ''}
    </Link>
  )
}
