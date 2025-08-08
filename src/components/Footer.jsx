export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 p-6 mt-12">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} Tienda Asadores. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
