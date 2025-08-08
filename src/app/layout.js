import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css' // tu tailwind css

export const metadata = {
  title: 'Tienda Asadores',
  description: 'Tienda online para productos de asadores, parrillas y más'
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
