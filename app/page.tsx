"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { DishCard } from "@/components/dish-card"
import { Header } from "@/components/header"
import { getImagePath } from "@/lib/image-path"
import MenuPage from "./menu/page"
import OrderPage from "./order/page"
// import { SplashScreen } from "@/components/splash-screen"

type CartItem = { id: number; name: string; price: string; quantity: number }

type TopSellingItem = {
  id: number
  name: string
  categoryId: string
  image: string
}

type ComboDish = { id: number; name: string; price: string; image: string }

const menuData: { topSelling: TopSellingItem[]; combos: ComboDish[] } = {
  topSelling: [
    {
      id: 1,
      name: "Loaded Fries",
      categoryId: "loadedFries",
      image: "/topselling/loadedfries.jpg",
    },
    {
      id: 2,
      name: "Burgers",
      categoryId: "burgers",
      image: "/topselling/burgers.jpg",
    },
    {
      id: 3,
      name: "Momos",
      categoryId: "momos",
      image: "/topselling/momos.jpg",
    },
    {
      id: 4,
      name: "Shakes",
      categoryId: "shake",
      image: "/topselling/shakes.jpg",
    },
  ],
  combos: [
    { id: 5, name: "Family Combo Pack Deluxe", price: "₹899", image: "/biryani-rice.jpg" },
    { id: 6, name: "Combo Meal Deal Special", price: "₹649", image: "/samosa-snack-fried.jpg" },
    { id: 7, name: "Starter Combo Platter", price: "₹499", image: "/full-meal-thali.jpg" },
    { id: 8, name: "Weekend Family Bundle", price: "₹1299", image: "/garlic-bread-naan.jpg" },
  ],
}

export default function HomePage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState("home")
  const [menuCategory, setMenuCategory] = useState<string | undefined>(undefined)
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  // const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev: number) => (prev + 1) % banners.length)
    }, 30000)
    return () => clearInterval(timer)
  }, [])

  const banners = [
    getImagePath("/banner/11.png"),
    getImagePath("/classic-chicken-curry-rice.jpg"),
    getImagePath("/banner/3.png"),
    getImagePath("/biryani-rice.jpg"),
  ]

  const addToCart = (dish: { id: number; name: string; price: string }) => {
    setCart((prev: CartItem[]) => {
      const existing = prev.find((item) => item.id === dish.id)
      if (existing) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...prev, { ...dish, quantity: 1 }]
    })
  }

  const filteredTopSelling = menuData.topSelling.filter(
    (dish) =>
      dish.name.toLowerCase().startsWith(searchQuery.toLowerCase().trim()) ||
      dish.name.toLowerCase().includes(searchQuery.toLowerCase().trim()),
  )
  const filteredCombos = menuData.combos.filter(
    (dish) =>
      dish.name.toLowerCase().startsWith(searchQuery.toLowerCase().trim()) ||
      dish.name.toLowerCase().includes(searchQuery.toLowerCase().trim()),
  )

  // if (showSplash) {
  //   return <SplashScreen onComplete={() => setShowSplash(false)} />
  // }

  const handleNavigate = (page: string) => {
    if (page !== "menu") {
      setMenuCategory(undefined)
    }
    setCurrentPage(page)
  }

  const goToMenuCategory = (categoryId: string) => {
    setMenuCategory(categoryId)
    setCurrentPage("menu")
  }

  if (currentPage === "menu") {
    return (
      <MenuPage
        cart={cart}
        onNavigate={handleNavigate}
        addToCart={addToCart}
        initialCategory={menuCategory}
      />
    )
  }

  if (currentPage === "order") {
    return <OrderPage cartItems={cart} onNavigate={handleNavigate} setCart={setCart} />
  }


  return (
    <div className="min-h-screen bg-background pb-20">
      <Header cartCount={cart.reduce((sum, item) => sum + (item.quantity || 1), 0)} />

      <div className="px-4 py-4">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl h-40 flex items-center justify-center text-white font-bold text-lg overflow-hidden shadow-md relative">
          <img
            src={getImagePath(banners[currentBannerIndex] || "/placeholder.svg")}
            alt={`Banner ${currentBannerIndex + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Banner indicators */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentBannerIndex(idx)}
                className={`w-2 h-2 rounded-full transition ${
                  idx === currentBannerIndex ? "bg-white w-6" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-8">
        {/* Top Selling Section */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">
            Top Selling {searchQuery && `(${filteredTopSelling.length})`}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {filteredTopSelling.slice(0, 4).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goToMenuCategory(item.categoryId)}
                className="relative w-full overflow-hidden rounded-xl border border-orange-200 bg-neutral-100 shadow-sm hover:shadow-md hover:border-orange-400 transition"
              >
                <div className="relative w-full aspect-square">
                  <img
                    src={getImagePath(item.image || "/placeholder.jpg")}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <span className="absolute bottom-2 left-2 right-2 text-xs font-semibold text-white drop-shadow">
                    {item.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">
            Combos & Offers {searchQuery && `(${filteredCombos.length})`}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {filteredCombos.slice(0, 4).map((dish) => (
              <DishCard key={dish.id} dish={dish} onAddCart={() => addToCart(dish)} />
            ))}
          </div>
          {filteredCombos.length > 4 && (
            <button className="w-full mt-4 px-4 py-2 text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition font-medium text-sm">
              View All Combos
            </button>
          )}
        </section>
      </div>

      <Navigation
        cartCount={cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
    </div>
  )
}

