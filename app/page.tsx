"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

// Wedding date - adjust as needed
const WEDDING_DATE = new Date("2026-06-15T16:00:00")

const navItems = [
  { label: "RSVP", color: "#3F0013" },
  { label: "GIFTS", color: "#EA785B" },
  { label: "TRIVIA", color: "#ED8EE4" },
  { label: "GALLERY", color: "#A1A8BE" },
]

const stories = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop",
    text: "We met on a warm summer evening in 2019, at a friend's rooftop gathering. Chris was telling a terrible joke, and Donna was the only one who laughed. That laugh changed everything.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=800&fit=crop",
    text: "Our first official date was at a small Italian restaurant downtown. We talked for hours, completely losing track of time. The staff had to politely remind us they were closing.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=800&fit=crop",
    text: "Three years later, on a quiet beach at sunset, Chris got down on one knee. Through happy tears, Donna said yes before he could even finish the question.",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=600&h=800&fit=crop",
    text: "Now we're ready to begin our greatest adventure together. We can't wait to celebrate this special day surrounded by the people we love most.",
  },
]

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 })

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        })
      }
    }

    calculateTime()
    const interval = setInterval(calculateTime, 60000)
    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}

export default function WeddingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const timeLeft = useCountdown(WEDDING_DATE)
  const firstStoryRef = useRef<HTMLDivElement>(null)
  const storyRefs = useRef<(HTMLDivElement | null)[]>([])

  const scrollToFirstStory = () => {
    firstStoryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const scrollToNextStory = (currentIndex: number) => {
    const nextRef = storyRefs.current[currentIndex + 1]
    if (nextRef) {
      nextRef.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex flex-col"
        style={{ backgroundColor: "#F3DDC3" }}
      >


        {/* Navigation */}
        <nav className="relative z-20 flex items-center justify-between px-4 md:px-8 py-4">
          <button 
            className="text-xs md:text-sm tracking-wide hover:opacity-70 transition-opacity"
            style={{ color: "#5F5420" }}
          >
            Sign In
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="px-4 py-2 rounded-full text-white text-xs font-medium tracking-wider hover:opacity-90 transition-opacity"
                style={{ backgroundColor: item.color }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button - Pill style */}
          <button
            className="md:hidden px-4 py-2 rounded-full text-white text-xs tracking-wide hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#5F5420" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close" : "More"}
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm md:hidden"
              style={{ backgroundColor: "rgba(243, 221, 195, 0.95)" }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="flex flex-col gap-4"
              >
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-12 py-4 rounded-full text-white text-lg font-medium tracking-wider"
                    style={{ backgroundColor: item.color }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </motion.div>
              <button
                className="absolute top-4 right-4 text-sm tracking-wide"
                style={{ color: "#5F5420" }}
                onClick={() => setMenuOpen(false)}
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
          {/* Names - stacked on mobile for bigger text */}
          <h1 
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-center"
            style={{ color: "#EA785B" }}
          >
            Carlos &
          </h1>
          <h1 
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-center"
            style={{ color: "#EA785B" }}
          >
            Alexia
          </h1>

          {/* Countdown - Smaller and below names */}
          <div 
            className="mt-4 flex items-center gap-3 text-center"
            style={{ color: "#5F5420" }}
          >
            <span className="text-sm">-</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg md:text-xl font-medium">{timeLeft.days}</span>
              <span className="text-xs uppercase tracking-wider">d</span>
            </div>
            <span className="text-sm">:</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg md:text-xl font-medium">{timeLeft.hours}</span>
              <span className="text-xs uppercase tracking-wider">h</span>
            </div>
            <span className="text-sm">:</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg md:text-xl font-medium">{timeLeft.mins}</span>
              <span className="text-xs uppercase tracking-wider">m</span>
            </div>
            <span className="text-sm">-</span>
          </div>

          {/* View More Button */}
          <button
            onClick={scrollToFirstStory}
            className="mt-6 px-8 py-3 rounded-full text-white text-sm tracking-wider hover:opacity-90 transition-all flex items-center gap-2"
            style={{ backgroundColor: "#EA785B" }}
          >
            View More
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Story Feed Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <h2 
            className="font-serif text-3xl md:text-4xl text-center mb-10"
            style={{ color: "#EA785B" }}
          >
            Our Story
          </h2>

          <div className="space-y-12 md:space-y-16">
            {stories.map((story, index) => (
              <motion.div
                key={story.id}
                ref={(el) => {
                  storyRefs.current[index] = el
                  if (index === 0) firstStoryRef.current = el
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-6 md:gap-10`}
              >
                {/* Image */}
                <div className="w-full md:w-2/5">
                  <div className="aspect-[3/4] relative overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={story.image}
                      alt={`Our story - chapter ${story.id}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2 flex flex-col">
                  <p 
                    className="text-base md:text-lg leading-relaxed"
                    style={{ color: "#5F5420" }}
                  >
                    {story.text}
                  </p>
                  
                  {/* Next Story Button - Pill with border */}
                  {index < stories.length - 1 && (
                    <button
                      onClick={() => scrollToNextStory(index)}
                      className="mt-4 self-start px-6 py-2 rounded-full border-2 text-sm tracking-wider hover:bg-[#5F5420] hover:text-white transition-all flex items-center gap-2"
                      style={{ borderColor: "#5F5420", color: "#5F5420" }}
                    >
                      Next Story
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-6 md:py-8"
        style={{ backgroundColor: "#EA785B" }}
      >
        <div className="text-center">
          <h3 className="font-serif text-white text-2xl md:text-3xl">
            Carlos & Alexia
          </h3>
        </div>
      </footer>
    </div>
  )
}
