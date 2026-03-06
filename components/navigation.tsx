"use client"

import { Home, Menu, ShoppingCart } from "lucide-react"
import { useState, useEffect } from "react"

interface NavigationProps {
  cartCount: number
  currentPage?: string
  onNavigate?: (page: string) => void
}

export function Navigation({ cartCount, currentPage = "home", onNavigate }: NavigationProps) {
  const [active, setActive] = useState("home")

  useEffect(() => {
    setActive(currentPage)
  }, [currentPage])

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "menu", label: "Menu", icon: Menu },
    { id: "order", label: "Order", icon: ShoppingCart, badge: cartCount },
  ]

  const handleNav = (id: string) => {
    setActive(id)
    if (onNavigate) {
      onNavigate(id)
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition ${
                active === item.id ? "text-orange-600" : "text-neutral-500 hover:text-foreground"
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
