"use client";
import { useState, useEffect, useRef } from "react";
import { Moon, Sun, Github, Linkedin, FileText } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SparklesText from "./ui/sparkles-text";
import Marquee from "@/components/ui/marquee";

interface Project {
  title: string;
  description: string;
  image: string;
  href: string;
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    card.addEventListener("mousemove", handleMouseMove);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <a href={project.href} target="_blank" rel="noopener noreferrer">
      <div
        ref={cardRef}
        className="relative w-full rounded-2xl border border-zinc-800 hover:cursor-pointer overflow-hidden group transform transition-transform duration-300 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="absolute inset-0 z-0 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle 150px at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1), transparent 80%)",
          }}
        />
        <div className="relative z-10 p-3">
          <div className="relative w-full aspect-[16/10] rounded overflow-hidden transition-transform duration-300">
            <Image
              src={project.image}
              alt={project.title}
              layout="fill"
              objectFit="cover"
              className="object-center rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <p className="text-sm dark:text-gray-300 text-zinc-900">
              {project.title}
            </p>
            <p className="text-xs dark:text-gray-400 text-zinc-950">
              {project.description}
            </p>
          </div>
        </div>
        {isHovered && (
          <div
            className="absolute z-20 px-6 py-7 text-sm dark:text-black text-white dark:bg-white bg-black rounded-full"
            style={{
              top: mousePosition.y,
              left: mousePosition.x,
              transform: "translate(-50%, -100%)",
            }}
          >
            View
          </div>
        )}
      </div>
    </a>
  );
}

const skills = [
  "JavaScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "Firebase",
  "TypeScript",
  "HTML",
  "CSS",
  "APIs",
  "Python",
  "MongoDB",
  "OpenAI",
  "Vercel",
  "Netlify",
  "ShadcnUI",
  "MagicUI",
  "Github",
];

const SkillCard = ({ skill }: { skill: string }) => {
  return (
    <span className="mx-4 text-6xl text-gray-800 dark:text-gray-200">
      {skill}
    </span>
  );
};

export function MarqueeDemo() {
  const firstRow = skills.slice(0, Math.ceil(skills.length / 2));
  const secondRow = skills.slice(Math.ceil(skills.length / 2));

  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((skill, index) => (
          <SkillCard key={index} skill={skill} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((skill, index) => (
          <SkillCard key={index} skill={skill} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}

export function PortfolioComponent() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const projects = [
    {
      title: "to-do app",
      description: "Stay organized and manage your tasks effectively.",
      image:
        "https://utfs.io/f/qrNhX5uLNRYDgNOfX95FiJ73qDY9kybxocvC1p6ZdmHztB25",
      href: "https://havetodoapp.netlify.app",
    },
    {
      title: "route system",
      description:
        "I built a route system to check the travel time between two places.",
      image:
        "https://utfs.io/f/qrNhX5uLNRYDyNMZdI6ek0iU5f8VcEIGJCqvOSdTb3NP6n2r",
      href: "https://routesystem.vercel.app",
    },
    {
      title: "shopping list app",
      description: "A simple shopping list app with add to list functionality.",
      image:
        "https://utfs.io/f/qrNhX5uLNRYDfuzN79Z0rTC34XFRcMw7EYeQt12kngK9ZHzs",
      href: "https://theshoppinglist.netlify.app",
    },
    {
      title: "password generator",
      description:
        "Generate strong passwords with our secure password generator.",
      image:
        "https://utfs.io/f/qrNhX5uLNRYDLRFNfQ8hWVN6PaiygOUqxZfjLw0eAvESdpcz",
      href: "https://passwdgenerateapp.netlify.app",
    },
    {
      title: "currency converter",
      description: "Convert currencies with our real-time currency converter.",
      image:
        "https://utfs.io/f/qrNhX5uLNRYDgOAgjq5FiJ73qDY9kybxocvC1p6ZdmHztB25",
      href: "https://currencypricechecker.netlify.app",
    },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="bg-white dark:bg-zinc-950 text-gray-900 dark:text-white transition-colors duration-300"></div>
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <header className="w-full max-w-3xl mb-16 flex justify-end items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </header>

        <main className="w-full max-w-3xl">
          <section className="mb-24 mt-16 text-center">
            <SparklesText text="Hi, I'm Shubham Kumar" />
            <p className="text-lg sm:text-2xl m-4 tracking-tight">
              Your friendly neighborhood developer - I love to build & design
              things.
            </p>
            <div className="flex justify-center space-x-4 flex-wrap">
              <a
                href="https://github.com/shubham-kumr"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4"
              >
                <Button variant="outline">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Button>
              </a>
              <a
                href="https://linkedin.com/in/shubham-kumr"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4"
              >
                <Button variant="outline">
                  <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                </Button>
              </a>
              <a
                href="https://twitter.com/shubhamkumr_"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4"
              >
                <Button variant="outline">
                  <FaXTwitter className="mr-2 h-4 w-4" /> Twitter / X
                </Button>
              </a>
              <Button variant="outline" asChild>
                <a
                  href="https://utfs.io/f/qrNhX5uLNRYD5lyYJgzUWgahfdreyB2KLPiqAoMHxC8Yulvk"
                  download
                  className="mt-4"
                >
                  <FileText className="mr-2 h-4 w-4" /> Download Resume
                </a>
              </Button>
            </div>
          </section>

          {/* Projects Section */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 dark:text-gray-200 text-zinc-950">
              projects 🏗️
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section className="mb-24 mt-40 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 dark:text-gray-200 text-zinc-950">
              Skills 🔧
            </h2>
            <MarqueeDemo /> {/* Use MarqueeDemo component */}
          </section>

          {/* Get in Touch Section */}
            <section className="mb-16 px-4 flex flex-col items-center justify-center sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-6xl font-bold mb-4 dark:text-gray-200 text-zinc-950 text-center">
              Get in Touch 🤝
            </h2>
            <p className="text-lg sm:text-2xl tracking-wider dark:text-gray-200 text-zinc-950 mb-4 text-center">
              I’d love to hear from you! Feel free to reach out with any questions or opportunities.
            </p>
            <a href="mailto:contactme.shubhamkumar@gmail.com" className="mt-4">
              <Button className="font-bold text-sm sm:text-xl px-6 sm:px-10 py-4 sm:py-5 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0L12 13.5 2.25 6.75"
                />
              </svg>
              contactme.shubhamkumar@gmail.com
              </Button>
            </a>
            </section>
        </main>
      </div>
    </div>
  );
}

export default PortfolioComponent;
