// sanity.js
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: process.env.SANITY_API_VERSION || '2023-07-01',
}

export const sanityClient = createClient(config)

// Builder para las URLs de las imágenes
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source) {
  return builder.image(source)
}

// Obtener categorías
export async function getCategories() {
  const query = `*[_type == "category"]{
    _id,
    title,
    slug
  }`
  return sanityClient.fetch(query)
}

// Obtener todos los productos
export async function getProducts() {
  const query = `*[_type == "product"]{
    _id,
    title,
    slug { current },
    image,
    category->{slug, title},
    variants
  }`
  return sanityClient.fetch(query)
}

// Obtener un producto por su slug
export async function getProductBySlug(slug) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    title,
    slug { current },
    image,
    description,
    category->{slug, title},
    variants
  }`
  return sanityClient.fetch(query, { slug })
}
