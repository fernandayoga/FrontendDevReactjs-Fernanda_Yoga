import { useNavigate } from 'react-router-dom'

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function RestaurantCard({ meal }) {
  const navigate = useNavigate()

  

  return (
    <div className="bg-white rounded-lg overflow-hidden flex flex-col">
      {/* Image */}
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-44 object-cover bg-gray-200"
      />

      {/* Info */}
      <div className="pt-3 pb-2 flex flex-col gap-1 flex-1">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight">
          {meal.strMeal}
        </h3>
        <StarRating rating={meal.rating} />
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {meal.strCategory || meal.strArea} • {meal.priceRange}
          </span>
          <span className={`text-xs font-medium flex items-center gap-1 ${meal.isOpen ? 'text-green-600' : 'text-red-500'}`}>
            <span className={`w-2 h-2 rounded-full ${meal.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
            {meal.isOpen ? 'OPEN NOW' : 'CLOSED'}
          </span>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={() => navigate(`/detail/${meal.idMeal}`)}
        className="w-full bg-[#0f2557] text-white text-xs font-semibold tracking-widest py-3 mt-2 hover:bg-[#1a3a7a] transition"
      >
        LEARN MORE
      </button>
    </div>
  )
}