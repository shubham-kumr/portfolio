"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { MapPin, Github, Linkedin, Twitter, ChevronDown } from "lucide-react"
import Image from 'next/image';

interface SparklesTextProps {
  text: string;
  className?: string;
}

const SparklesText = ({ text, className = "" }: SparklesTextProps) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute inline-block w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: Math.random() * 0.3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.span>
    </span>
  )
}

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
}

const ExpandableSection = ({ title, children }: ExpandableSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left text-xl font-semibold mb-2 bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
      >
        {title}
        <ChevronDown
          className={`w-6 h-6 transition-transform duration-200 ${
            isExpanded ? "transform rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function ProfileComponent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-sans">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl sm:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                <SparklesText text="Hi, I'm Shubham Kumar" />
              </h1>
              <motion.p
                className="text-xl text-gray-400 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Passionate Developer | Creative Problem Solver
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <ExpandableSection title="About Me">
            <div className="bg-gray-800 p-6 rounded-lg mt-2 space-y-4">
              <p className="text-gray-300">
                Dedicated and innovative developer with a keen interest in creating impactful solutions. 
                Always eager to learn and adapt to new technologies.
              </p>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Node.js", "GraphQL"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </ExpandableSection>

          <ExpandableSection title="Education">
            <div className="bg-gray-800 p-6 rounded-lg mt-2">
              <HoverCard>
                <HoverCardTrigger className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                  LLoyd Institute of Engineering and Technology
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-gray-700 border-gray-600">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">LLoyd Institute of Engineering and Technology</h4>
                    <p className="text-sm text-gray-400">
                      Greater Noida, Uttar Pradesh, India
                    </p>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-400">
                        Plot No. 1, Knowledge Park II
                      </span>
                    </div>
                    <div className="mt-2">
                      <Image
                        src="/placeholder.svg"
                        alt="Map location of LLoyd Institute"
                        width={200}
                        height={100}
                        className="rounded-md object-cover"
                      />
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <div className="mt-4 space-y-2">
                <p className="text-gray-300">B.Tech in Computer Science</p>
                <p className="text-gray-400">2018 - 2022</p>
                <p className="text-gray-300">CGPA: 8.5/10</p>
              </div>
            </div>
          </ExpandableSection>
        </motion.div>

        <motion.div
          className="mt-12 flex justify-center space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
            <Github className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
            <Twitter className="w-6 h-6" />
          </a>
        </motion.div>
      </div>
    </div>
  )
}