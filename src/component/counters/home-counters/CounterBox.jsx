'use client'

import { useState, useEffect, useRef } from 'react'

const CounterBox = ({ target, suffix = '+', duration = 2000, label }) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current)
      }
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime = null
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      const easeOutQuad = progress * (2 - progress)
      const currentCount = Math.floor(easeOutQuad * target)
      
      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, target, duration])

  return (
    <div className="counter-box" ref={counterRef}>
      <h2 suppressHydrationWarning>{count}{suffix}</h2>
      <p>{label}</p>
    </div>
  )
}

export default CounterBox
