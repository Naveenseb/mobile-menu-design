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
  const [selectedCategory, setSelectedCategory] = useState("Starters")
  const [searchQuery, setSearchQuery] = useState("")
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const cartCount = cart?.length || 0

  const menuItems = {
    mains: [
      {
        id: 901,
        name: "Chicken Biriyani",
        price: "₹450",
        image: "/cbiriyani.jpg",
      },
      {
        id: 902,
        name: "Beef Biriyani",
        price: "₹500",
        image: "/beefbiriyani.jpg",
      },
      {
        id: 903,
        name: "Veg Meals",
        price: "₹350",
        image: "/vegmeals.jpg",
      },
      {
        id: 904,
        name: "Non-Veg Meals",
        price: "₹450",
        image: "/nonvegmeals.jpg",
      },
      {
        id: 905,
        name: "Kappa Biriyani",
        price: "₹400",
        image: "/kbiriyani.jpg",
      },
      {
        id: 906,
        name: "Kappa Fish Curry",
        price: "₹380",
        image: "/kfish.jpg",
      },
      {
        id: 907,
        name: "Neychoru Beef/Chicken Stew",
        price: "₹480",
        image: "/neychoru.jpg",
      },
    ],
    burgers: [
      {
        id: 104,
        name: "Classic chicken Burger",
        price: "₹120",
        image: "/ccb.jpg",
      },
      {
        id: 1,
        name: "Chicken zinger Burger",
        price: "₹170",
        image: "/czb.jpg",
      },
      {
        id: 2,
        name: "Grills Chicken Burger",
        price: "₹190",
        image: "/gcb.jpg",
      },
      {
        id: 3,
        name: "Avocado Grill chicken Burger",
        price: "₹220",
        image: "/agcb.jpg",
      },
      {
        id: 4,
        name: "BBQ Grills chicken Burger",
        price: "₹999",
        image: "/bbqb.jpg",
      },
      {
        id: 5,
        name: "Classic Veg patty Burger",
        price: "₹90",
        image: "/classicVeg.jpg",
      },
      {
        id: 6,
        name: "4 Mug Spl jumbo Burger",
        price: "₹270",
        image: "/spzllBur.jpg",
      },
    ],
    sandwich: [
      {
        id: 2,
        name: "Cheesy Corn Sandwich",
        price: "₹160",
        image: "/ccsand.jpg",
      },
      {
        id: 3,
        name: "Veg Sandwich",
        price: "₹170",
        image: "/vegsand.jpg",
      },
      {
        id: 4,
        name: "Chicken Tikka Sandwich",
        price: "₹210",
        image: "/ctsand.jpg",
      },
      {
        id: 5,
        name: "Grill Chicken Sandwich",
        price: "₹190",
        image: "/gcsand.jpg",
      },
      {
        id: 6,
        name: "Peri peri Grill Chicken Sandwich",
        price: "₹210",
        image: "/perisand.jpg",
      },
      {
        id: 7,
        name: "4 Mug Spl Club Sandwich",
        price: "₹270",
        image: "/spzlsand.jpg",
      },
    ],
    loadedFries: [
      {
        id: 4,
        name: "Zinger Chicken loaded Fries",
        price: "₹190",
        image: "/zcload.jpg",
      },
      {
        id: 5,
        name: "Mexican cheesy loaded Fries",
        price: "₹200",
        image: "/mcload.jpg",
      },
      {
        id: 8,
        name: "Lays Chicken loaded Fries",
        price: "₹210",
        image: "/laysload.jpg",
      },
      {
        id: 9,
        name: "Zinger Chicken (Family)",
        price: "₹230",
        image: "/zfamload.jpg",
      },
      {
        id: 10,
        name: "Mexican Cheesy (Family)",
        price: "₹250",
        image: "/mfamload.jpg",
      },
    ],
    Starters: [
      {
        id: 801,
        name: "Chicken nuggets 6pc",
        price: "₹160",
        image: "/nugstart.jpg",
      },
      {
        id: 802,
        name: "Chicken Strips 5pc",
        price: "₹210",
        image: "/stripstart.jpg",
      },
      {
        id: 803,
        name: "Chicken Popcorn 12pc",
        price: "₹160",
        image: "/popstart.jpg",
      },
      {
        id: 804,
        name: "Butterfly prawns 6pc",
        price: "₹210",
        image: "/butstart.jpg",
      },
      {
        id: 805,
        name: " Fish Finger 6pc ",
        price: "₹210",
        image: "/fingstart.jpg",
      },
      {
        id: 806,
        name: "Dynamite Chicken",
        price: "₹210",
        image: "/dynstart.jpg",
      },
      {
        id: 807,
        name: "Dynamite Prawns",
        price: "₹230",
        image: "/dynprawstart.jpg",
      },
    ],
    
    rice: [
      {
        id: 1001,
        name: "Biryani Rice",
        price: "₹549",
        image: "/classic-chicken-curry-rice.jpg",
      },
      {
        id: 1002,
        name: "Fried Rice",
        price: "₹399",
        image: "/paneer-cheese-dish.jpg",
      },
    ],
    breads: [
      {
        id: 701,
        name: "Garlic Naan",
        price: "₹199",
        image: "/butter-chicken.png",
      },
      {
        id: 702,
        name: "Butter Roti",
        price: "₹149",
        image: "/classic-chicken-curry-rice.jpg",
      },
    ],
    salads: [
      {
        id: 601,
        name: "Greek Salad",
        price: "₹499",
        image: "/tandoori-meat-bbq.jpg",
      },
      {
        id: 602,
        name: "Quinoa Power Bowl",
        price: "₹599",
        image: "/biryani-rice.jpg",
      },
    ],
    soups: [
      {
        id: 501,
        name: "Tomato Basil Soup",
        price: "₹299",
        image: "/classic-chicken-curry-rice.jpg",
      },
      {
        id: 502,
        name: "Mushroom Bisque",
        price: "₹349",
        image: "/paneer-cheese-dish.jpg",
      },
    ],
    drinks: [
      {
        id: 201,
        name: "Fresh Lemonade",
        price: "₹350",
        image: "/tea-chai-beverage.jpg",
      },
      {
        id: 202,
        name: "Iced Coffee",
        price: "₹400",
        image: "/tea-chai-beverage.jpg",
      },
    ],
    desserts: [
      {
        id: 301,
        name: "Chocolate Cake",
        price: "₹499",
        image: "/full-meal-thali.jpg",
      },
      {
        id: 302,
        name: "Vanilla Panna Cotta",
        price: "₹449",
        image: "/garlic-bread-naan.jpg",
      },
    ],
    wraps: [
      {
        id: 1201,
        name: "Veg Wrap",
        price: "₹199",
        image: "/vwrap.jpg",
      },
      {
        id: 1202,
        name: "Crispy chicken Wrap",
        price: "₹179",
        image: "/ccwrap.jpg",
      },
      {
        id: 1203,
        name: "Chicken Tikka wrap",
        price: "₹189",
        image: "/twrap.jpg",
      },
      {
        id: 1204,
        name: "Peri peri Grill chicken Wrap",
        price: "₹169",
        image: "/pwrap.jpg",
      },
    ],
    frenchFries: [
      {
        id: 1301,
        name: "Regular Fries",
        price: "₹90",
        image: "/rfries.jpg",
      },
      {
        id: 1302,
        name: "PERI PERI FRENCH FRIES",
        price: "₹110",
        image: "/pfries.jpg",
      },
      {
        id: 1303,
        name: "MASALA FRENCH FRIES",
        price: "₹110",
        image: "/mfries.jpg",
      },
    ],
    momos: [
      {
        id: 1401,
        name: "CHICKEN STEAM  (S/F)",
        price: "₹80/90",
        image: "/cmomos.jpg",
      },
      {
        id: 1402,
        name: "CHICKEN CHEESE  (S/F)",
        price: "₹90/100",
        image: "/chmomos.jpg",
      },
      {
        id: 1403,
        name: "CHICKEN KURKURE (F)",
        price: "₹110/120",
        image: "/kmomos.jpg",
      },
      {
        id: 1404,
        name: "CHICKEN SCHEZWAN(S/F)",
        price: "₹100/110",
        image: "/scmomos.jpg",
      },
      {
        id: 1405,
        name: "CHICKEN TIKKA (S/F)",
        price: "₹90/100",
        image: "/tmomos.jpg",
      },
      {
        id: 1406,
        name: "VEG. MIX (S/F)",
        price: "₹80/90",
        image: "/vmomos.jpg",
      },
      {
        id: 1407,
        name: "BUTTER CHICKEN (S/F)",
        price: "₹100/110",
        image: "/bmomos.jpg",
      },
    ],
    fourMigSpecial: [
      {
        id: 1501,
        name: "4Mig Special Burger",
        price: "₹299",
        image: "/4migspecial.jpg",
      },
    ],
  }

  const foodSubcategories = [
    { id: "Starters", label: "Starters" },
    { id: "mains", label: "Main" },
    { id: "burgers", label: "Burgers" },
    { id: "loadedFries", label: "Loaded Fries" },
    { id: "wraps", label: "Wraps" },
    { id: "sandwich", label: "Sandwiches" },
    { id: "frenchFries", label: "French Fries" },
    { id: "momos", label: "Momos" },
    { id: "salads", label: "Salads" },
    { id: "fourMigSpecial", label: "4Mug Special" },
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
