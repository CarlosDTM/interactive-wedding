"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

// Wedding date - adjust as needed
const WEDDING_DATE = new Date("2026-06-15T16:00:00")

const navItems = [
  { label: "RSVP",    color: "#3F0013", icon: "ri-heart-line" },
  { label: "GIFTS",   color: "#EA785B", icon: "ri-gift-line" },
  { label: "TRIVIA",  color: "#ED8EE4", icon: "ri-question-line" },
  { label: "GALLERY", color: "#A1A8BE", icon: "ri-image-line" },
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
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}

// ── Animation variants ───────────────────────────────────────────────────────
const navVariants: Variants = {
  hidden: { opacity: 0, y: -28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const lineVariants: Variants = {
  hidden: {},
  visible: (delayChildren: number) => ({
    transition: { staggerChildren: 0.08, delayChildren },
  }),
}

const charVariants: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(2px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const countdownContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 1.9 } },
}

const countdownUnitVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
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
    <div className="min-h-[100dvh]">
      {/* Top palette stripe bar — horizontal */}
      <div className="flex w-full" style={{ height: "10px" }}>
        <div className="flex-1" style={{ backgroundColor: "var(--grasslands)" }} />
        <div className="flex-1" style={{ backgroundColor: "var(--terra-cotta)" }} />
        <div className="flex-1" style={{ backgroundColor: "var(--sweet-cream)" }} />
        <div className="flex-1" style={{ backgroundColor: "var(--lilac)" }} />
        <div className="flex-1" style={{ backgroundColor: "var(--bluebell)" }} />
      </div>

      {/* Hero Section */}
      <section 
        className="relative min-h-[95vh] md:min-h-[100dvh] flex flex-col"
        style={{ backgroundColor: "#F3DDC3" }}
      >


        {/* Navigation */}
        <nav className="relative z-20 flex items-center justify-between px-4 md:px-8 py-4" style={{ paddingTop: 'max(env(safe-area-inset-top), 1rem)' }}>
          <motion.button
            className="flex items-center gap-2 font-medium tracking-wide hover:opacity-70 transition-opacity text-[length:var(--font-size-nav-btn)] md:text-[length:var(--font-size-nav-btn-desktop)]"
            style={{ color: "#5F5A20" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0 }}
          >
            <i className="ri-user-3-line" />
            Sign In
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.label}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white font-medium tracking-wider hover:opacity-90 transition-opacity"
                style={{ backgroundColor: item.color, fontSize: "var(--font-size-nav-options)" }}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 + index * 0.1 }}
              >
                <i className={item.icon} />
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button - Pill style */}
          <motion.button
            className="md:hidden flex items-center gap-2 px-4 py-1.5 rounded-full text-white font-medium tracking-wide hover:opacity-90 transition-opacity text-[length:var(--font-size-nav-btn)]"
            style={{ backgroundColor: "#5F5A20" }}
            onClick={() => setMenuOpen(!menuOpen)}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <i className={menuOpen ? "ri-close-line" : "ri-apps-2-line"} />
            {menuOpen ? "Close" : "More"}
          </motion.button>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm md:hidden"
              style={{ backgroundColor: "rgba(243, 221, 195, 0.95)", paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="flex flex-col gap-4 items-center"
              >
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 px-8 py-4 rounded-full text-white font-medium tracking-wider hover:opacity-90 transition-opacity w-fit"
                    style={{ backgroundColor: item.color, fontSize: "var(--font-size-nav-btn)" }}
                    onClick={() => setMenuOpen(false)}
                  >
                    <i className={`${item.icon} text-xl`} />
                    {item.label}
                  </motion.button>
                ))}
              </motion.div>
              <button
                className="absolute top-4 right-4 flex items-center gap-1.5 px-4 py-1.5 rounded-full font-medium tracking-wide text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#5F5A20", fontSize: "var(--font-size-nav-btn)" }}
                onClick={() => setMenuOpen(false)}
              >
                <i className="ri-close-line" />
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pb-8 pt-16 md:pt-0">
          {/* Names - character-by-character write-in animation */}
          <motion.h1
            className="font-serif font-bold text-center leading-none mt-8"
            style={{ color: "var(--grasslands)", fontSize: "var(--font-size-couple-names)" }}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            custom={0.3}
          >
            {"Carlos &".split("").map((char, i) => (
              <motion.span key={i} variants={charVariants} style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}>
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.h1
            className="font-serif font-bold text-center leading-none"
            style={{ color: "var(--grasslands)", fontSize: "var(--font-size-couple-names)" }}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            custom={1.1}
          >
            {"Alexia".split("").map((char, i) => (
              <motion.span key={i} variants={charVariants} style={{ display: "inline-block" }}>
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Countdown - Below names */}
          <motion.div
            className="mt-12 flex items-end gap-2 justify-center"
            initial="hidden"
            animate="visible"
            variants={countdownContainerVariants}
          >
            {[
              { value: timeLeft.days,  label: "days" },
              { value: timeLeft.hours, label: "hrs" },
              { value: timeLeft.mins,  label: "min" },
              { value: timeLeft.secs,  label: "sec" },
            ].map(({ value, label }, i) => (
              <motion.div key={i} className="flex items-end gap-2" variants={countdownUnitVariants}>
                <div className="flex flex-col items-center gap-0.5">
                  <span
                    className="font-medium tabular-nums leading-none pb-1"
                    style={{
                      fontSize: "var(--font-size-countdown)",
                      color: "var(--grasslands)",
                      borderBottom: "2px solid var(--terra-cotta)",
                    }}
                  >
                    {String(value).padStart(2, "0")}
                  </span>
                  <span className="text-[0.75rem] uppercase tracking-widest font-medium" style={{ color: "var(--terra-cotta)" }}>
                    {label}
                  </span>
                </div>
                {i < 3 && (
                  <span
                    className="font-medium leading-none mb-5"
                    style={{ fontSize: "var(--font-size-countdown)", color: "var(--terra-cotta)" }}
                  >
                    :
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* View More Button */}
          <motion.button
            onClick={scrollToFirstStory}
            className="mt-8 flex items-center gap-2 px-6 py-2 rounded-full font-medium tracking-wide hover:opacity-90 transition-all text-[length:var(--font-size-nav-btn)] md:text-[length:var(--font-size-nav-btn-desktop)]"
            style={{ backgroundColor: "var(--grasslands)", color: "#faf4f1" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut", delay: 2.4 }}
          >
            View More
            <ChevronDown className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Floral divider */}
        <motion.div
          className="w-full overflow-visible md:hidden"
          style={{ marginBottom: "-19px" }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 2.8 }}
        >
          <img
            src="/row_of_flowers.png"
            alt=""
            className="w-full"
            style={{ display: "block" }}
          />
        </motion.div>
      </section>

      {/* Story Feed Section */}
      <section className="py-10 md:py-12" style={{ backgroundColor: "var(--grasslands)" }}>
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <h2
            className="font-sans font-bold text-center mb-10 tracking-wide"
            style={{ color: "var(--sweet-cream)", fontSize: "var(--font-size-section-title)" }}
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
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-6 md:gap-10`}
              >
                {/* Image */}
                <div className="w-full md:w-2/5">
                  <div
                    className="aspect-[3/4] relative overflow-hidden rounded-lg"
                    style={{ border: "3px solid var(--sweet-cream)" }}
                  >
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
                    style={{ color: "var(--sweet-cream)" }}
                  >
                    {story.text}
                  </p>
                  
                  {/* Next Story Button */}
                  {index < stories.length - 1 && (
                    <button
                      onClick={() => scrollToNextStory(index)}
                      className="mt-6 self-start flex items-center gap-2 px-6 py-2 rounded-full font-medium tracking-wider transition-all hover:opacity-80"
                      style={{ backgroundColor: "var(--sweet-cream)", color: "var(--grasslands)", fontSize: "var(--font-size-nav-btn-desktop)" }}
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
        className="py-8 md:py-12"
        style={{ backgroundColor: "#F3DDC3", paddingBottom: 'max(env(safe-area-inset-bottom), 2rem)' }}
      >
        <div className="text-center">
          <h3 className="font-serif font-bold text-4xl md:text-5xl" style={{ color: "var(--grasslands)" }}>
            Carlos & Alexia
          </h3>
        </div>
      </footer>
    </div>
  )
}
