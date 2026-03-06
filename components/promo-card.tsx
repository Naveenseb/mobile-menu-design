export function PromoCard() {
  return (
    <div className="mx-0 bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-stretch h-24">
        {/* Image */}
        <div className="w-24 h-24 bg-black/20 flex-shrink-0 flex items-center justify-center overflow-hidden">
          <img src="/food-dish-appetizer.jpg" alt="Promo" className="w-full h-full object-cover" />
        </div>

        {/* Text Content */}
        <div className="flex-1 p-4 flex flex-col justify-between text-white">
          <div>
            <p className="text-xs font-semibold opacity-90">LIMITED OFFER</p>
            <p className="text-xl font-bold">₹75 OFF</p>
            <p className="text-xs opacity-90">ON ORDER ABOVE ₹499</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded">CODE: RESTRO75</span>
          </div>
        </div>
      </div>
    </div>
  )
}
