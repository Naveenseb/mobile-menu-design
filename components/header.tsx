"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

interface HeaderProps {
  cartCount?: number
}

export function Header({ cartCount = 0 }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      } else if (currentScrollY > 80) {
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@400;500;600&display=swap');
        
        .cafe-name {
          font-family: 'Bodoni Moda', serif;
          font-size: 48px;
          font-weight: 500;
          letter-spacing: 2px;
          color: #dc2626;
          line-height: 1;
          text-align: center;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .cafe-tagline {
          font-family: 'Bodoni Moda', serif;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 1px;
          color: #991b1b;
          margin-top: -6px;
          text-align: center;
          text-transform: lowercase;
        }

        .header-container {
          transition: transform 0.3s ease-in-out;
          transform: ${isVisible ? 'translateY(0)' : 'translateY(-100%)'};
        }
      `}</style>
      
      <header className="header-container sticky top-0 z-50 bg-white border-b border-red-600/20 shadow-md">
        <div className="flex items-center justify-center px-6 py-4 relative">
          <div className="flex items-center gap-3">
            {/* Logo PNG */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <Image
                src="/log3.png"
                alt="4MUG Logo"
                width={60}
                height={60}
                className="object-contain"
                priority
              />
            </div>
            
            {/* Brand Info - Right Side */}
            <div className="flex flex-col items-center justify-center">
              <h1 className="cafe-name">4MUG</h1>
              <span className="cafe-tagline">only 4 you</span>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
