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

const menuData = {
  topSelling: [
    {
      id: 1,
      name: "Classic Chicken Curry Rice",
      price: "₹220",
      image: "/classic-chicken-curry-rice.jpg",
    },
    {
      id: 2,
      name: "Zaituni Paneer Cheese Tikka",
      price: "₹399",
      image: "/paneer-cheese-dish.jpg",
    },
    {
      id: 3,
      name: "Tandoori Pomegranate Kebab",
      price: "₹649",
      image: "/tandoori-meat-bbq.jpg",
    },
    {
      id: 4,
      name: "Butter Chicken Supreme",
      price: "₹499",
      image: "/butter-chicken.png",
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
  const [cart, setCart] = useState<Array<{ id: number; name: string; price: string }>>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState("home")
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  // const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev: number) => (prev + 1) % banners.length)
    }, 30000)
    return () => clearInterval(timer)
  }, [])

  const banners = [
    getImagePath("/restaurant-promotional-banner-offers.jpg"),
    getImagePath("/classic-chicken-curry-rice.jpg"),
    getImagePath("/butter-chicken.png"),
    getImagePath("/biryani-rice.jpg"),
  ]

  const addToCart = (dish: { id: number; name: string; price: string }) => {
    setCart((prev: Array<{ id: number; name: string; price: string }>) => [...prev, dish])
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

  if (currentPage === "menu") {
    return <MenuPage cart={cart} onNavigate={setCurrentPage} addToCart={addToCart} />
  }

  if (currentPage === "order") {
    return <OrderPage cartItems={cart} onNavigate={setCurrentPage} setCart={setCart} />
  }


  return (
    <div className="min-h-screen bg-background pb-20">
      <Header cartCount={cart.length} />

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
            {filteredTopSelling.slice(0, 4).map((dish) => (
              <DishCard key={dish.id} dish={dish} onAddCart={() => addToCart(dish)} />
            ))}
          </div>
          {filteredTopSelling.length > 4 && (
            <button className="w-full mt-4 px-4 py-2 text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition font-medium text-sm">
              View All Top Selling
            </button>
          )}
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

      <Navigation cartCount={cart.length} currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  )
}

