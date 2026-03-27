export default function FilterBar({
  openNow, setOpenNow,
  price, setPrice,
  category, setCategory,
  categories, clearAll
}) {
  return (
    <div className="flex items-center justify-between border-y border-gray-200 py-3 mt-6">
      <div className="flex items-center gap-5 flex-wrap">
        {/* Open Now */}
        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
          <input
            type="checkbox"
            checked={openNow}
            onChange={e => setOpenNow(e.target.checked)}
            className="accent-[#0f2557]"
          />
          Open Now
        </label>

        {/* Price Filter */}
        <select
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="text-sm border border-gray-300 rounded px-2 py-1 text-gray-700 focus:outline-none"
        >
          <option value="" disabled>Price</option>
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
          <option value="$$$$">$$$$</option>
        </select>

        {/* Category Filter */}
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="text-sm border border-gray-300 rounded px-2 py-1 text-gray-700 focus:outline-none"
        >
          <option value="" disabled>Categories</option>
          {categories.map(cat => (
            <option key={cat.idCategory} value={cat.strCategory}>
              {cat.strCategory}
            </option>
          ))}
        </select>
      </div>

      {/* Clear All */}
      <button
        onClick={clearAll}
        className="text-sm border border-gray-300 px-4 py-1 rounded text-gray-600 hover:bg-gray-100 transition"
      >
        CLEAR ALL
      </button>
    </div>
  )
}