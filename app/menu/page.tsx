"use client"
import { Suspense } from "react"
import { useState } from "react"
import { Search, ChevronDown } from "lucide-react"
import { Navigation } from "@/components/navigation"

function MenuContent({
  cart = [],
  onNavigate = () => {},
  addToCart = () => {},
}: {
  cart?: Array<{ id: number; name: string; price: string }>
  onNavigate?: (page: string) => void
  addToCart?: (dish: { id: number; name: string; price: string }) => void
}) {
  const [selectedCategory, setSelectedCategory] = useState("burgers")
  const [searchQuery, setSearchQuery] = useState("")
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const cartCount = cart?.length || 0

  const menuItems = {
    burgers: [
      {
        id: 104,
        name: "Classic chicken Burger",
        description: "",
        price: "₹120",
        allergens: "Contains gluten, lactose, sesame",
        image: "/ccb.jpg",
      },
      {
        id: 1,
        name: "Chicken zinger Burger",
        description: "Juicy beef patty with melted cheddar",
        price: "₹170",
        allergens: "Contains gluten, lactose",
        image: "/czb.jpg",
      },
      {
        id: 2,
        name: "Grills Chicken Burger",
        description: "Beef patty with jalapeños and spicy sauce",
        price: "₹190",
        allergens: "Contains gluten, lactose",
        image: "/gcb.jpg",
      },
      {
        id: 3,
        name: "Avocado Grill chicken Burger",
        description: "Plant-based patty with fresh veggies",
        price: "₹220",
        allergens: "Contains gluten",
        image: "/agcb.jpg",
      },
      {
        id: 4,
        name: "BBQ Grills chicken Burger",
        description: "Smoky BBQ sauce with crispy bacon",
        price: "₹999",
        allergens: "Contains gluten, lactose",
        image: "/bbqb.jpg",
      },
      {
        id: 5,
        name: "Classic Veg patty Burger",
        description: "Beef patty with sautéed mushrooms and Swiss cheese",
        price: "₹90",
        allergens: "Contains gluten, lactose",
        image: "/classicVeg.jpg",
      },
      {
        id: 6,
        name: "4 Mug Spl jumbo Burger",
        description: "Two beef patties with double cheese",
        price: "₹270",
        allergens: "Contains gluten, lactose",
        image: "/spzllBur.jpg",
      },
    ],
    sandwich: [
      {
        id: 2,
        name: "Cheesy Corn Sandwich",
        description: "Chicken breast with fresh vegetables",
        price: "₹160",
        allergens: "Contains gluten",
        image: "/ccsand.jpg",
      },
      {
        id: 3,
        name: "Veg Sandwich ",
        description: "Crispy paneer with mint chutney",
        price: "₹170",
        allergens: "Contains gluten, lactose",
        image: "/vegSand.jpg",
      },
      {
        id: 4,
        name: "Chicken Tikka Sandwich",
        description: "Mixed vegetables with special sauce",
        price: "₹210",
        allergens: "Contains gluten",
        image: "/ctsand.jpg",
      },
      {
        id: 5,
        name: "Grill Chicken Sandwich",
        description: "Spiced tandoori chicken with yogurt",
        price: "₹190",
        allergens: "Contains gluten, lactose",
        image: "/gcsand.jpg",
      },
      {
        id: 6,
        name: "Peri peri Grill Chicken Sandwich",
        description: "Paneer with schezwan sauce",
        price: "₹210",
        allergens: "Contains gluten, lactose",
        image: "/perisand.jpg",
      },
      {
        id: 7,
        name: "4 Mug Spl Club Sandwich",
        description: "Grilled chicken with BBQ sauce",
        price: "₹270",
        allergens: "Contains gluten, lactose",
        image: "/spzlsand.jpg",
      },
    ],
    loadedFries: [
      {
        id: 4,
        name: "Cheese Loaded Fries",
        description: "Crispy fries with melted cheese sauce",
        price: "₹499",
        allergens: "Contains lactose",
        image: "/biryani-rice.jpg",
      },
      {
        id: 5,
        name: "Bacon Loaded Fries",
        description: "Fries topped with bacon and cheddar",
        price: "₹599",
        allergens: "Contains lactose",
        image: "/biryani-rice.jpg",
      },
    ],
    appetizers: [
      {
        id: 801,
        name: "Spring Rolls",
        description: "Crispy vegetable spring rolls",
        price: "₹299",
        allergens: "Contains gluten",
        image: "/paneer-cheese-dish.jpg",
      },
      {
        id: 802,
        name: "Chicken Wings",
        description: "Spiced chicken wings",
        price: "₹449",
        allergens: "None",
        image: "/tandoori-meat-bbq.jpg",
      },
    ],
    mains: [
      {
        id: 901,
        name: "Butter Chicken",
        description: "Tender chicken in butter sauce",
        price: "₹749",
        allergens: "Contains lactose",
        image: "/biryani-rice.jpg",
      },
      {
        id: 902,
        name: "Paneer Tikka Masala",
        description: "Cottage cheese in spiced gravy",
        price: "₹699",
        allergens: "Contains lactose",
        image: "/butter-chicken.png",
      },
    ],
    rice: [
      {
        id: 1001,
        name: "Biryani Rice",
        description: "Fragrant basmati rice with spices",
        price: "₹549",
        allergens: "None",
        image: "/classic-chicken-curry-rice.jpg",
      },
      {
        id: 1002,
        name: "Fried Rice",
        description: "Egg fried rice with vegetables",
        price: "₹399",
        allergens: "Contains eggs",
        image: "/paneer-cheese-dish.jpg",
      },
    ],
    breads: [
      {
        id: 701,
        name: "Garlic Naan",
        description: "Soft naan with garlic butter",
        price: "₹199",
        allergens: "Contains gluten, lactose",
        image: "/butter-chicken.png",
      },
      {
        id: 702,
        name: "Butter Roti",
        description: "Traditional Indian bread",
        price: "₹149",
        allergens: "Contains gluten, lactose",
        image: "/classic-chicken-curry-rice.jpg",
      },
    ],
    salads: [
      {
        id: 601,
        name: "Greek Salad",
        description: "Fresh vegetables with feta",
        price: "₹499",
        allergens: "Contains lactose",
        image: "/tandoori-meat-bbq.jpg",
      },
      {
        id: 602,
        name: "Quinoa Power Bowl",
        description: "Healthy quinoa with greens",
        price: "₹599",
        allergens: "None",
        image: "/biryani-rice.jpg",
      },
    ],
    soups: [
      {
        id: 501,
        name: "Tomato Basil Soup",
        description: "Fresh tomato with basil",
        price: "₹299",
        allergens: "None",
        image: "/classic-chicken-curry-rice.jpg",
      },
      {
        id: 502,
        name: "Mushroom Bisque",
        description: "Creamy mushroom soup",
        price: "₹349",
        allergens: "Contains lactose",
        image: "/paneer-cheese-dish.jpg",
      },
    ],
    drinks: [
      {
        id: 201,
        name: "Fresh Lemonade",
        description: "Freshly squeezed lemon juice",
        price: "₹350",
        allergens: "None",
        image: "/tea-chai-beverage.jpg",
      },
      {
        id: 202,
        name: "Iced Coffee",
        description: "Cold brew coffee with ice",
        price: "₹400",
        allergens: "Contains caffeine",
        image: "/tea-chai-beverage.jpg",
      },
    ],
    desserts: [
      {
        id: 301,
        name: "Chocolate Cake",
        description: "Rich chocolate dessert",
        price: "₹499",
        allergens: "Contains gluten, lactose, eggs",
        image: "/full-meal-thali.jpg",
      },
      {
        id: 302,
        name: "Vanilla Panna Cotta",
        description: "Creamy vanilla dessert",
        price: "₹449",
        allergens: "Contains lactose, eggs",
        image: "/garlic-bread-naan.jpg",
      },
    ],
  }

  const foodSubcategories = [
    { id: "burgers", label: "Burgers" },
    { id: "sandwich", label: "Sandwich" },
    { id: "loadedFries", label: "Loaded Fries" },
    { id: "appetizers", label: "Starters" },
    { id: "mains", label: "Mains" },
    { id: "rice", label: "Rice" },
    { id: "breads", label: "Breads" },
    { id: "salads", label: "Salads" },
    { id: "soups", label: "Soups" },
  ]

  const beveragesSubcategories = [
    { id: "drinks", label: "Drinks" },
    { id: "desserts", label: "Desserts" },
  ]

  const currentItems = menuItems[selectedCategory as keyof typeof menuItems] || []
  const filteredItems = currentItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@400;500;600&display=swap');
      `}</style>
      
      {/* Page Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white px-4 py-8 border-b border-red-600/10">
        <h1 className="text-4xl font-semibold text-center text-slate-900" style={{ fontFamily: "'Bodoni Moda', serif" }}>
          Our Menu
        </h1>
        <p className="text-center text-slate-600 text-sm mt-2">Discover our carefully curated selection</p>
      </div>

      {/* Search & Filters Section */}
      <div className="sticky top-16 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="px-4 py-4">
          {/* Search Bar */}
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 mb-4 border border-slate-200 focus-within:border-red-600 focus-within:bg-white transition">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none flex-1 text-sm text-slate-700 placeholder-slate-400"
            />
          </div>

          {/* Food and Beverages Dropdowns */}
          <div className="flex gap-3">
            {/* Food Dropdown */}
            <div className="relative flex-1">
              <button
                onClick={() => setOpenDropdown(openDropdown === "food" ? null : "food")}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all"
              >
                <span>🍔 Food</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDropdown === "food" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "food" && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                  {foodSubcategories.map((cat, idx) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id)
                        setOpenDropdown(null)
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                        selectedCategory === cat.id
                          ? "bg-red-50 text-red-700 font-semibold"
                          : "text-slate-700 hover:bg-slate-50"
                      } ${idx !== foodSubcategories.length - 1 ? "border-b border-slate-100" : ""}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Beverages Dropdown */}
            <div className="relative flex-1">
              <button
                onClick={() => setOpenDropdown(openDropdown === "beverages" ? null : "beverages")}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all"
              >
                <span>🥤 Beverages</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDropdown === "beverages" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "beverages" && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                  {beveragesSubcategories.map((cat, idx) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id)
                        setOpenDropdown(null)
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                        selectedCategory === cat.id
                          ? "bg-red-50 text-red-700 font-semibold"
                          : "text-slate-700 hover:bg-slate-50"
                      } ${idx !== beveragesSubcategories.length - 1 ? "border-b border-slate-100" : ""}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 py-6 space-y-4 bg-slate-50">
        {/* Category Label */}
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full mb-4">
            {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace(/([A-Z])/g, ' $1')}
          </span>
        </div>

        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4 border border-slate-100">
              <div className="flex gap-4">
                {/* Image */}
                <div className="w-20 h-20 flex-shrink-0 bg-slate-200 rounded-lg overflow-hidden">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-1 line-clamp-2">{item.name}</h3>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="font-bold text-red-600 text-base">{item.price}</p>
                    <button
                      onClick={() => addToCart(item)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg transition-all text-xs font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 text-sm">No items found matching your search</p>
          </div>
        )}
      </div>
    </>
  )
}

export default function MenuPage({
  cart = [],
  onNavigate = () => {},
  addToCart = () => {},
}: {
  cart?: Array<{ id: number; name: string; price: string }>
  onNavigate?: (page: string) => void
  addToCart?: (dish: { id: number; name: string; price: string }) => void
}) {
  const cartCount = cart?.length || 0

  return (
    <div className="min-h-screen bg-background pb-20">
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading menu...</div>}>
        <MenuContent cart={cart} onNavigate={onNavigate} addToCart={addToCart} />
      </Suspense>
      <Navigation cartCount={cartCount} currentPage="menu" onNavigate={onNavigate} />
    </div>
  )
}
