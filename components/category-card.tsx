"use client"

interface Category {
  id: number
  name: string
  image: string
  count: number
}

interface CategoryCardProps {
  category: Category
  isSelected: boolean
  onSelect: () => void
}

export function CategoryCard({ category, isSelected, onSelect }: CategoryCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`rounded-lg overflow-hidden aspect-square relative hover:shadow-md transition ${
        isSelected ? "ring-2 ring-orange-600" : ""
      }`}
    >
      {/* Image */}
      <img src={category.image || "/placeholder.svg"} alt={category.name} className="w-full h-full object-cover" />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-2">
        <p className="font-bold text-sm">{category.name}</p>
        <p className="text-xs opacity-80">{category.count} items</p>
      </div>
    </button>
  )
}
