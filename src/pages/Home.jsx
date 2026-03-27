import { useState, useEffect } from 'react'
import FilterBar from '../components/FilterBar'
import RestaurantCard from '../components/RestaurantCard'

export default function Home() {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [openNow, setOpenNow] = useState(false)
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])

 

  // Fetch categories for dropdown
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(res => res.json())
      .then(data => setCategories(data.categories))
  }, [])

  // Fetch meals (server-side filter by category)
  useEffect(() => {
    setLoading(true)
    const url = category
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      : `https://www.themealdb.com/api/json/v1/1/search.php?s=`

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.meals || []
        const enriched = results.map((meal, i) => ({
          ...meal,
          rating: parseFloat((3 + Math.random() * 2).toFixed(1)),
          priceRange: ['$', '$$', '$$$', '$$$$'][i % 4],
          isOpen: Math.random() > 0.3,
        }))
        setMeals(enriched)
        setLoading(false)
      })
  }, [category])

  // Client-side filter
  const filtered = meals.filter(meal => {
    if (openNow && !meal.isOpen) return false
    if (price && meal.priceRange !== price) return false
    return true
  })

  const clearAll = () => {
    setOpenNow(false)
    setPrice('')
    setCategory('')
  }

  return (
    <div className="min-h-screen bg-white px-8 py-10">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-900">Restaurants</h1>
      <p className="text-gray-500 mt-2 max-w-md">
        Discover the best restaurants around you. Filter by category, price, and availability to find your perfect dining experience.
      </p>

      {/* Filter Bar */}
      <FilterBar
        openNow={openNow}
        setOpenNow={setOpenNow}
        price={price}
        setPrice={setPrice}
        category={category}
        setCategory={setCategory}
        categories={categories}
        clearAll={clearAll}
      />

      {/* Restaurant List */}
      <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">All Restaurants</h2>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No restaurants found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(meal => (
            <RestaurantCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  )
}