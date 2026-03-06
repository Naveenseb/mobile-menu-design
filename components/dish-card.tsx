"use client"

import { ShoppingCart } from "lucide-react"
import { getImagePath } from "@/lib/image-path"

interface Dish {
  id: number
  name: string
  price: string
  image: string
}

interface DishCardProps {
  dish: Dish
  onAddCart: () => void
}

export function DishCard({ dish, onAddCart }: DishCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-border hover:shadow-md transition">
      {/* Image */}
      <div className="relative w-full aspect-square bg-neutral-100 overflow-hidden">
        <img src={getImagePath(dish.image || "/placeholder.svg")} alt={dish.name} className="w-full h-full object-cover" />
      </div>

      <div className="p-3 space-y-2">
        <p className="text-sm font-semibold text-foreground break-words">{dish.name}</p>

        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-orange-600">{dish.price}</p>
          <button onClick={onAddCart} className="p-1.5 bg-orange-600 rounded-lg hover:bg-orange-700 transition">
            <ShoppingCart className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
