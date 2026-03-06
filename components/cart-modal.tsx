"use client"

interface CartItem {
  id: number
  name: string
  price: string
}

interface CartModalProps {
  items: CartItem[]
  onClose: () => void
  onClearCart: () => void
}

export function CartModal({ items, onClose, onClearCart }: CartModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-end">
      <div className="bg-white w-full rounded-t-2xl p-4 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Cart Items</h2>
          <button onClick={onClose} className="text-neutral-500 hover:text-foreground">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-neutral-600 text-center py-6">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-2 mb-4">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between p-2 border-b border-border">
                  <span className="text-sm text-foreground">{item.name}</span>
                  <span className="text-sm font-semibold text-orange-600">{item.price}</span>
                </div>
              ))}
            </div>
            <button
              onClick={onClearCart}
              className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
            >
              Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  )
}
