"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Header } from "@/components/header"
import { Trash2 } from "lucide-react"

interface OrderPageProps {
  cartItems?: Array<{ id: number; name: string; price: string; quantity: number }>
  onNavigate?: (page: string) => void
  setCart?: (cart: Array<{ id: number; name: string; price: string; quantity: number }>) => void
}

export default function OrderPage({ cartItems = [], onNavigate = () => {}, setCart = () => {} }: OrderPageProps) {
  const [localCart, setLocalCart] = useState(cartItems)
  const cartCount = localCart.reduce((sum, item) => sum + (item.quantity || 1), 0)

  const handleRemoveItem = (index: number) => {
    const updatedCart = localCart.filter((_, i) => i !== index)
    setLocalCart(updatedCart)
    if (setCart) {
      setCart(updatedCart)
    }
  }

  const handleClearCart = () => {
    setLocalCart([])
    if (setCart) {
      setCart([])
    }
  }

  const handleCheckout = () => {
    setLocalCart([])
    if (setCart) {
      setCart([])
    }
    if (onNavigate) {
      onNavigate("home")
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header cartCount={cartCount} />
      <div className="px-4 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Your Order</h1>

        {localCart.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🛒</div>
            <p className="text-neutral-600 mb-4">Your cart is empty</p>
            <button
              onClick={() => onNavigate("home")}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-6">
              {localCart.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-white rounded-lg border border-border"
                >
                  <div>
                    <p className="font-semibold text-foreground text-sm">{item.name}</p>
                    <p className="text-sm text-orange-600 font-bold">{item.price}</p>
                    <p className="text-xs text-neutral-500">Qty: {item.quantity || 1}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-600 hover:text-red-700 transition p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <button
                onClick={handleCheckout}
                className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-medium"
              >
                Order Collected By Our Team
              </button>
              <button
                onClick={() => onNavigate("home")}
                className="w-full px-6 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
      <Navigation cartCount={cartCount} currentPage="order" onNavigate={onNavigate} />
    </div>
  )
}
