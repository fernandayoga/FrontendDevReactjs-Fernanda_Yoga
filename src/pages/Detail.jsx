import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

// Simulasi data reviews
function generateReviews() {
  const names = ['Ahmad', 'Budi', 'Chandra', 'Diana', 'Erlan']
  const comments = [
    'Amazing food, highly recommend!',
    'Great taste and atmosphere.',
    'Good food but service was slow.',
    'Absolutely loved it, will come back!',
    'Decent place, nothing too special.',
  ]
  return names.map((name, i) => ({
    id: i,
    name,
    rating: parseFloat((3 + Math.random() * 2).toFixed(1)),
    text: comments[i],
    image: `https://i.pravatar.cc/100?img=${i + 10}`,
  }))
}

export default function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => {
        const m = data.meals[0]
        setMeal({
          ...m,
          rating: parseFloat((3 + Math.random() * 2).toFixed(1)),
          priceRange: ['$', '$$', '$$$', '$$$$'][Math.floor(Math.random() * 4)],
          isOpen: Math.random() > 0.3,
        })
        setReviews(generateReviews())
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>
  if (!meal) return <div className="text-center py-20 text-gray-400">Restaurant not found.</div>

  return (
    <div className="min-h-screen bg-white px-8 py-10 max-w-4xl mx-auto">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-[#0f2557] font-semibold mb-6 flex items-center gap-1 hover:underline"
      >
        ← Back
      </button>

      {/* Restaurant Image */}
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-72 object-cover rounded-lg"
      />

      {/* Restaurant Info */}
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-gray-900">{meal.strMeal}</h1>
        <div className="flex items-center gap-3 mt-2 flex-wrap">
          <StarRating rating={meal.rating} />
          <span className="text-sm text-gray-500">{meal.rating} / 5</span>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-500 uppercase">{meal.strCategory}</span>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-500">{meal.priceRange}</span>
          <span className="text-sm text-gray-400">•</span>
          <span className={`text-sm font-medium flex items-center gap-1 ${meal.isOpen ? 'text-green-600' : 'text-red-500'}`}>
            <span className={`w-2 h-2 rounded-full ${meal.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
            {meal.isOpen ? 'OPEN NOW' : 'CLOSED'}
          </span>
        </div>

        {/* Area / Origin */}
        <p className="text-gray-500 mt-3 text-sm">
          🌍 Origin: <span className="font-medium text-gray-700">{meal.strArea}</span>
        </p>
      </div>

      <hr className="my-8 border-gray-200" />

      {/* Reviews Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
        <div className="flex flex-col gap-6">
          {reviews.map(review => (
            <div key={review.id} className="flex gap-4 items-start">
              {/* Avatar */}
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              {/* Review Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{review.name}</span>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-gray-600 text-sm mt-1">{review.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}