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
  cart?: Array<{ id: number; name: string; price: string; quantity?: number }>
  onNavigate?: (page: string) => void
  addToCart?: (dish: { id: number; name: string; price: string }) => void
}) {
  const [selectedCategory, setSelectedCategory] = useState("Starters")
  const [searchQuery, setSearchQuery] = useState("")
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [localCart, setLocalCart] = useState(cart.map(item => ({ ...item, quantity: item.quantity || 1 })))

  const handleAddToCart = (dish: { id: number; name: string; price: string }) => {
    // Update global cart via prop (if provided)
    addToCart?.(dish)

    // Keep local cart in sync for quantity display/logic
    setLocalCart((prev) => {
      const existing = prev.find(item => item.id === dish.id)
      if (existing) {
        return prev.map(item => 
          item.id === dish.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 } 
            : item
        )
      } else {
        return [...prev, { ...dish, quantity: 1 }]
      }
    })
  }

  const cartCount = localCart.reduce((sum, item) => sum + (item.quantity || 1), 0)

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
        name: "Grill Chicken Salads",
        price: "₹270",
        image: "/gcsalad.jpg",
      },
      {
        id: 603,
        name: "Hawaiian Chicken salads",
        price: "₹290",
        image: "/hcsalad.jpg",
      },
      {
        id: 602,
        name: "Veg Garden Rich Salads",
        price: "₹190",
        image: "/vsalad.jpg",
      },
    ],
    soups: [
      {
        id: 502,
        name: "Mushroom Bisque",
        price: "₹349",
        image: "/paneer-cheese-dish.jpg",
      },
    ],
    // Beverages - 10 main categories
    hotBeverages: [
      { id: 2001, name: "Coffee", price: "₹20", image: "/coffee.jpg" },
      { id: 2002, name: "Tea", price: "₹12", image: "/tea.jpg" },
      { id: 2003, name: "Black Tea", price: "₹10", image: "/blacktea.jpg" },
      { id: 2004, name: "Mint Tea", price: "₹12", image: "/minttea.jpg" },
      { id: 2005, name: "Lemon Tea", price: "₹15", image: "/lemtea.jpg" },
      { id: 2006, name: "Cardamom", price: "₹15", image: "/cartea.jpg" },
      { id: 2007, name: "Ginger", price: "₹15", image: "/gintea.jpg" },
      { id: 2008, name: "Masala", price: "₹15", image: "/mastea.jpg" },
    ],
    floralTeas: [
      { id: 2101, name: "Lavender", price: "₹35", image: "/lavtea.jpg" },
      { id: 2102, name: "Blue Pea Tea", price: "₹30", image: "/blueptea.jpg" },
      { id: 2103, name: "Hibiscus Tea", price: "₹30", image: "/hibtea.jpg" },
      { id: 2104, name: "Lemon Grass Tea", price: "₹20", image: "/lgtea.jpg" },
    ],
    herbalTeas: [
      { id: 2201, name: "Kashmiri Khawa", price: "₹30", image: "/kktea.jpg" },
      { id: 2202, name: "Digestion Tea", price: "₹25", image: "/digtea.jpg" },
      { id: 2203, name: "Lemon Mint Green Tea", price: "₹25", image: "/lminttea.jpg" },
      { id: 2204, name: "Mens Health Tea", price: "₹25", image: "/menstea.jpg" },
      { id: 2205, name: "Throat & Lungs Care Tea", price: "₹25", image: "/tltea.jpg" },
      { id: 2206, name: "Weight Loss Tea", price: "₹25", image: "/wltea.jpg" },
      { id: 2207, name: "Jasmine Tea", price: "₹25", image: "/jastea.jpg" },
    ],
    freshLime: [
      { id: 2301, name: "Normal Fresh Lime", price: "₹20", image: "/flime.jpg" },
      { id: 2302, name: "Grape Fresh Lime", price: "₹30", image: "/glime.jpg" },
      { id: 2303, name: "Pineapple Fresh Lime", price: "₹30", image: "/plime.jpg" },
      { id: 2304, name: "Orange Fresh Lime", price: "₹30", image: "/olime.jpg" },
      { id: 2305, name: "Mint Fresh Lime", price: "₹30", image: "/mintlime.jpg" },
      { id: 2306, name: "Ginger Fresh Lime", price: "₹30", image: "/ginlime.jpg" },
      { id: 2307, name: "Blue Light Fresh Lime", price: "₹30", image: "/bluelime.jpg" },
      { id: 2308, name: "Dark Light Fresh Lime", price: "₹30", image: "/darklime.jpg" },
      { id: 2309, name: "Freshlime Soda ", price: "₹30", image: "/sodalime.jpg" },
      { id: 2310, name: "4 Mug Special Fresh Lime", price: "₹50", image: "/spzllime.jpg" },
    ],
    freshJuice: [
      { id: 2401, name: "Watermelon Juice", price: "₹50", image: "/wmjuice.jpg" },
      { id: 2402, name: "Pineapple Juice", price: "₹70", image: "/pjuice.jpg" },
      { id: 2403, name: "Orange Juice", price: "₹70", image: "/ojuice.jpg" },
      { id: 2404, name: "Carrot Juice", price: "₹70", image: "/carrjuice.jpg" },
      { id: 2405, name: "Grape Juice", price: "₹70", image: "/grajuice.jpg" },
      { id: 2406, name: "Shamam Juice", price: "₹70", image: "/shjuice.jpg" },
      { id: 2407, name: "Anar Juice", price: "₹120", image: "/anarjuice.jpg" },
      { id: 2408, name: "Avacado Juice", price: "₹100", image: "/avjuice.jpg" },
      { id: 2409, name: "Apple Juice", price: "₹100", image: "/applejuice.jpg" },
      { id: 2410, name: "ABC Juice", price: "₹100", image: "/abcjuice.jpg" },
      { id: 2411, name: "Mixed Fruit Juice", price: "₹100", image: "/micjuice.jpg" },
    ],
    shake: [
      { id: 2501, name: "Sharja Shake", price: "₹60", image: "/shashake.jpg" },
      { id: 2502, name: "Special Shake", price: "₹80", image: "/spzlshake.jpg" },
      { id: 2503, name: "Vanila Shake", price: "₹70", image: "/vshake.jpg" },
      { id: 2504, name: "Strawberry Shake", price: "₹80", image: "/stshake.jpg" },
      { id: 2505, name: "Butterscotch Shake", price: "₹90", image: "/butshake.jpg" },
      { id: 2506, name: "Pista Shake", price: "₹90", image: "/pisshake.jpg" },
      { id: 2507, name: "Oreo Shake", price: "₹90", image: "/oreoshake.jpg" },
      { id: 2508, name: "Chocolate Shake", price: "₹90", image: "/shoshake.jpg" },
      { id: 2509, name: "Spanish Delight Shake", price: "₹90", image: "/sdshake.jpg" },
      { id: 2510, name: "Laila Majnu Shake", price: "₹100", image: "/lmshake.jpg" },
      { id: 2511, name: "4 Mug Special Shake", price: "₹120", image: "/mugshake.jpg" },
      { id: 2512, name: "Tender Coconut Shake", price: "₹90", image: "/tenshake.jpg" },
      { id: 2513, name: "Avacado Shake", price: "₹100", image: "/avshake.jpg" },
      { id: 2514, name: "Chickku Shake", price: "₹80", image: "/chshake.jpg" },
      { id: 2515, name: "Dry Fruit Shake", price: "₹100", image: "/dryshake.jpg" },
      { id: 2516, name: "Nutella Shake", price: "₹120", image: "/nushake.jpg" },
    ],
    falooda: [
      { id: 2601, name: "Normal Falooda", price: "₹140", image: "/nfalooda.jpg" },
      { id: 2602, name: "Royal Falooda", price: "₹150", image: "/rfalooda.jpg" },
      { id: 2603, name: "Royal Special Falooda", price: "₹180", image: "/rspzlfalooda.jpg" },
      { id: 2604, name: "4 Mug Special Falooda", price: "₹200", image: "/mugfalooda.jpg" },
      { id: 2605, name: "Chocolate Falooda", price: "₹150", image: "/chfalooda.jpg" },
      { id: 2606, name: "Mango Falooda", price: "₹150", image: "/mfalooda.jpg" },
      { id: 2607, name: "Mini Falooda", price: "₹100", image: "/minifalooda.jpg" },
    ],
    mojito: [
      { id: 2701, name: "Virgin Mojito", price: "₹50", image: "/vmojito.jpg" },
      { id: 2702, name: "Green Apple Mojito", price: "₹80", image: "/gamojito.jpg" },
      { id: 2703, name: "Orange Mojito", price: "₹70", image: "/omojito.jpg" },
      { id: 2704, name: "Pineapple Mojito", price: "₹70", image: "/pmojito.jpg" },
      { id: 2705, name: "Mango Mojito", price: "₹70", image: "/mangomojito.jpg" },
      { id: 2706, name: "Blue Light Mojito", price: "₹70", image: "/blmojito.jpg" },
      { id: 2707, name: "Watermelon Mojito", price: "₹70", image: "/wmojito.jpg" },
    ],
    avilMilk: [
      { id: 2801, name: "Normal Avil Milk", price: "₹90", image: "/navmilk.jpg" },
      { id: 2802, name: "Special Avil Milk", price: "₹110", image: "/spzlavmilk.jpg" },
      { id: 2803, name: "Dry Fruit Avil Milk", price: "₹130", image: "/dryavmilk.jpg" },
      { id: 2804, name: "Chocolate Avil Milk", price: "₹120", image: "/chavmilk.jpg" },
      { id: 2805, name: "Pista Avil Milk", price: "₹120", image: "/pavmilk.jpg" },
      { id: 2806, name: "Vanila Avil Milk", price: "₹110", image: "/vavmilk.jpg" },
      { id: 2807, name: "Strawberry Avil Milk", price: "₹110", image: "/stavmilk.jpg" },
    ],
    smoothie: [
      { id: 2901, name: "Orange Smoothie", price: "₹80", image: "/osmoothie.jpg" },
      { id: 2902, name: "Green Apple Smoothie", price: "₹80", image: "/gasmoothie.jpg" },
      { id: 2903, name: "Chocolate Smoothie", price: "₹80", image: "/chsmoothie.jpg" },
      { id: 2904, name: "Pineapple Smoothie", price: "₹80", image: "/psmoothie.jpg" },
    ],
    wraps: [
      {
        id: 1201,
        name: "Veg Wrap",
        price: "₹90",
        image: "/vwrap.jpg",
      },
      {
        id: 1202,
        name: "Crispy chicken Wrap",
        price: "₹160",
        image: "/ccwrap.jpg",
      },
      {
        id: 1203,
        name: "Chicken Tikka wrap",
        price: "₹150",
        image: "/twrap.jpg",
      },
      {
        id: 1204,
        name: "Peri peri Grill chicken Wrap",
        price: "₹170",
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
    fourMugSpecial: [
      {
        id: 1501,
        name: "FRIED ICE-CREAM",
        price: "₹170",
        image: "/fice.jpg",
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
    { id: "fourMugSpecial", label: "4Mug Special" },
  ]

  const beveragesSubcategories = [
    { id: "hotBeverages", label: "Hot Beverages" },
    { id: "floralTeas", label: "Floral Teas" },
    { id: "herbalTeas", label: "Herbal Teas" },
    { id: "freshLime", label: "Fresh Lime" },
    { id: "freshJuice", label: "Fresh Juice" },
    { id: "shake", label: "Shake" },
    { id: "falooda", label: "Falooda" },
    { id: "mojito", label: "Mojito" },
    { id: "avilMilk", label: "Avil Milk" },
    { id: "smoothie", label: "Smoothie" },
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
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-lg">
        <div className="px-3 py-2">
          {/* Search Bar and Dropdowns in same row */}
          <div className="flex gap-2 items-center">
            {/* Search Bar */}
            <div className="flex items-center gap-2 bg-slate-100 rounded-full px-3 py-2 border border-slate-200 focus-within:border-red-400 focus-within:bg-white focus-within:shadow-md transition-all" style={{width: '45%'}}>
              <Search className="w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none flex-1 text-sm text-slate-700 placeholder-slate-500"
              />
            </div>

            {/* Food Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === "food" ? null : "food")}
                className="flex items-center gap-1 px-3 py-2 bg-white border border-slate-300 rounded-full font-medium text-sm text-slate-700 hover:border-red-400 hover:shadow-md transition-all"
              >
                <span>Food</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${openDropdown === "food" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "food" && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="grid grid-cols-2 gap-0">
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
                        } ${idx % 2 === 0 ? "border-r border-slate-100" : ""} ${idx < foodSubcategories.length - 2 ? "border-b border-slate-100" : ""}`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Beverages Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === "beverages" ? null : "beverages")}
                className="flex items-center gap-1 px-3 py-2 bg-white border border-slate-300 rounded-full font-medium text-sm text-slate-700 hover:border-red-400 hover:shadow-md transition-all"
              >
                <span>Beverages</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${openDropdown === "beverages" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "beverages" && (
                <div className="absolute top-full right-0 mt-2 w-56 max-w-[calc(100vw-2rem)] bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="grid grid-cols-2 gap-0 max-h-[70vh] overflow-y-auto">
                    {beveragesSubcategories.map((cat, idx) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id)
                          setOpenDropdown(null)
                        }}
                        className={`w-full text-left px-3 py-2.5 text-xs font-medium transition-colors ${
                          selectedCategory === cat.id
                            ? "bg-red-50 text-red-700"
                            : "text-slate-700 hover:bg-slate-50"
                        } border-b border-r border-slate-100 last:border-r-0`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
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
                    <h3 className="font-semibold text-slate-900 text-base mb-1 line-clamp-2">{item.name}</h3>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="font-bold text-red-600 text-lg">{item.price}</p>
                    <button
                      onClick={() => handleAddToCart(item)}
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
  cart?: Array<{ id: number; name: string; price: string; quantity: number }>
  onNavigate?: (page: string) => void
  addToCart?: (dish: { id: number; name: string; price: string }) => void
}) {
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0)

  return (
    <div className="min-h-screen bg-background pb-20">
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading menu...</div>}>
        <MenuContent cart={cart} onNavigate={onNavigate} addToCart={addToCart} />
      </Suspense>
      <Navigation cartCount={cartCount} currentPage="menu" onNavigate={onNavigate} />
    </div>
  )
}
