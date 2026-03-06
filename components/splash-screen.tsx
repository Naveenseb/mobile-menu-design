"use client"

import { useEffect } from "react"

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 4000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-orange-600 flex items-center justify-center z-50">
      <style>{`
        @keyframes rotateMug {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .mug-spin {
          animation: rotateMug 3s linear infinite;
        }
      `}</style>
      <div className="mug-spin text-8xl">☕</div>
    </div>
  )
}
