import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4">
      <Link to="/" className="text-xl font-bold text-yellow-500">
        🍽️ RestoFind
      </Link>
    </nav>
  )
}
