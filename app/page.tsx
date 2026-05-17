"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = navItems.map(item => item.href.slice(1));
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? "bg-background/90 backdrop-blur-xl border-b border-border/30 py-3" 
        : "bg-transparent py-5"
    }`}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link 
          href="/" 
          className="flex items-center gap-2 group"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.55_0.12_45)] to-[oklch(0.65_0.18_85)] rounded-full blur-sm opacity-50 group-hover:opacity-80 transition-opacity" />
            <span className="relative text-lg font-heading font-semibold text-foreground tracking-tight">
              YL
            </span>
          </div>
          <div className="h-4 w-px bg-border/50" />
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground/70 hidden sm:block">
            Portfolio
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-2 py-1.5 text-xs sm:text-sm font-sans transition-all duration-300 rounded-md ${
                activeSection === item.href.slice(1)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="relative z-10">{item.label}</span>
              {activeSection === item.href.slice(1) && (
                <div className="absolute inset-0 bg-[oklch(0.55_0.12_45_/_0.08)] rounded-md" />
              )}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-[oklch(0.55_0.12_45)] transition-all duration-300 ${
                activeSection === item.href.slice(1) ? "w-4" : "w-0"
              }`} />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

function FloatingOrb({ className }: { className?: string }) {
  return (
    <div className={`absolute rounded-full blur-3xl ${className}`}>
      <div className="w-40 h-40 rounded-full bg-[oklch(0.55_0.12_45)] opacity-20" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground grain-overlay overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to main content
      </a>
      
      <Navbar />
      
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,_oklch(0.55_0.12_45_/_0.08)_0%,_transparent_70%)]" />
        <div className="absolute top-[10%] right-[-5%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,_oklch(0.65_0.18_85_/_0.06)_0%,_transparent_70%)]" />
        <div className="absolute bottom-[20%] left-[10%] w-[250px] h-[250px] rounded-full bg-[radial-gradient(circle,_oklch(0.55_0.12_45_/_0.05)_0%,_transparent_70%)]" />
        <div className="absolute -bottom-20 right-[20%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,_oklch(0.65_0.18_85_/_0.04)_0%,_transparent_70%)]" />
        
        <svg className="absolute top-40 left-[5%] w-48 h-48 opacity-[0.03]" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
        
        <div className="absolute top-[30%] left-0 w-px h-[20%] bg-gradient-to-b from-transparent via-[oklch(0.55_0.12_45_/_0.1)] to-transparent" />
        <div className="absolute top-[50%] right-[5%] w-px h-[25%] bg-gradient-to-b from-transparent via-[oklch(0.65_0.18_85)_/_0.08)] to-transparent" />
        <div className="absolute bottom-[25%] left-[15%] w-px h-[15%] bg-gradient-to-b from-transparent via-[oklch(0.55_0.12_45_/_0.06)] to-transparent" />
        
        <div className="absolute top-[15%] left-[20%] w-3 h-3 rounded-full bg-[oklch(0.55_0.12_45)]/20 animate-pulse-subtle" />
        <div className="absolute top-[40%] right-[25%] w-2 h-2 rounded-full bg-[oklch(0.65_0.18_85)]/15 animate-pulse-subtle" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[30%] left-[40%] w-2.5 h-2.5 rounded-full bg-[oklch(0.55_0.12_45)]/10 animate-pulse-subtle" style={{ animationDelay: '2s' }} />
      </div>

      <main id="main-content" className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pt-28 pb-16 sm:px-6 sm:pt-32">
        
        <header id="about" className="flex flex-col gap-12 mb-12 scroll-mt-24">
          <div className="relative">
            <div className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[oklch(0.55_0.12_45)]/30 to-transparent hidden lg:block" />
            <div className="flex flex-col lg:flex-row gap-10 lg:items-center lg:justify-between animate-fade-up">
              <div className="flex-1">
                <div className="flex flex-col gap-4">
                  <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-[oklch(0.55_0.12_45_/_0.08)] rounded-full w-fit border border-[oklch(0.55_0.12_45)_/_0.15]">
                    <span className="w-2 h-2 rounded-full bg-[oklch(0.55_0.12_45)] animate-pulse" />
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-[oklch(0.55_0.12_45)]">
                      Available for opportunities
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <h1 className="text-6xl sm:text-7xl lg:text-8xl font-heading font-semibold tracking-tight text-foreground leading-[1]">
                      Yeoj
                    </h1>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-semibold tracking-tight text-foreground leading-[1]">
                      Artjohn <span className="text-amber-700/80">T. Lacrete</span>
                    </h1>
                  </div>
                </div>
                
                <p className="text-lg sm:text-xl leading-relaxed text-foreground/70 font-sans mt-6 max-w-2xl">
                  Deeply interested in building <span className="text-[oklch(0.55_0.12_45)] font-medium">accessible</span> digital tools that help people. Always learning, always building.
                </p>
                
                <div className="flex gap-4 mt-8">
                  <a 
                    href="mailto:yeojlacrete@gmail.com"
                    className="inline-flex items-center gap-2.5 px-6 py-3 bg-[oklch(0.55_0.12_45)] text-white rounded-xl font-medium text-sm hover:bg-[oklch(0.5_0.1_45)] transition-all shadow-xl shadow-[oklch(0.55_0.12_45)_/_0.25] hover:scale-105"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Get in touch
                  </a>
                  <a 
                    href="https://github.com/Lart101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3 bg-background border-2 border-border rounded-xl font-medium text-sm hover:border-[oklch(0.55_0.12_45)] hover:text-[oklch(0.55_0.12_45)] transition-all hover:scale-105"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
              
              <div className="flex-shrink-0 lg:self-center">
                <div className="relative group">
                  <div className="absolute -inset-6 bg-gradient-to-br from-[oklch(0.55_0.12_45)] via-[oklch(0.65_0.18_85)] to-[oklch(0.55_0.12_45)] rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity animate-float" />
                  <div className="absolute inset-0 rounded-full border-2 border-[oklch(0.55_0.12_45)]/20" />
                  <Avatar className="size-40 lg:size-56 border-4 border-background shadow-2xl overflow-hidden relative">
                    <AvatarImage src="/profile-cut.jpg" alt="Profile photo" className="object-cover" />
                    <AvatarFallback className="text-3xl font-medium bg-[oklch(0.55_0.12_45_/_0.1)]">YL</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-up animation-delay-200">
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-foreground/60">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-[oklch(0.55_0.12_45)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Malabon City
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-[oklch(0.55_0.12_45)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (+63) 9456194590
              </span>
              <a href="mailto:yeojlacrete@gmail.com" className="flex items-center gap-1.5 hover:text-[oklch(0.55_0.12_45)] transition-colors">
                <svg className="w-3.5 h-3.5 text-[oklch(0.55_0.12_45)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                yeojlacrete@gmail.com
              </a>
            </div>
          </div>
        </header>

        <Separator className="my-10 bg-gradient-to-r from-transparent via-border/60 to-transparent" />

        <section id="experience" aria-labelledby="experience-heading" className="flex flex-col gap-6 mb-10 scroll-mt-24">
          <div className="relative">
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[oklch(0.55_0.12_45)]/30 hidden lg:block" />
            <div className="flex items-center gap-3 animate-fade-up animation-delay-300">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[oklch(0.55_0.12_45)] to-[oklch(0.65_0.18_85)] flex items-center justify-center shadow-lg shadow-[oklch(0.55_0.12_45)_/_0.2]">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 id="experience-heading" className="text-2xl font-heading font-semibold text-foreground">Experience</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-[oklch(0.55_0.12_45)]/20 to-transparent" />
            </div>
          </div>
          
          <div className="animate-fade-up animation-delay-400 group">
            <Card className="relative bg-card/50 backdrop-blur-sm border-border/30 transition-all duration-500 hover:border-[oklch(0.55_0.12_45)_/_0.25] hover:shadow-lg hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[oklch(0.55_0.12_45)] via-[oklch(0.65_0.18_85)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                  <CardTitle className="text-base font-medium group-hover:text-[oklch(0.55_0.12_45)] transition-colors">
                    Software Engineer Intern
                  </CardTitle>
                  <span className="text-xs text-[oklch(0.55_0.12_45)] font-medium px-2 py-0.5 bg-[oklch(0.55_0.12_45_/_0.1)] rounded-full">
                    Dec 2025 — Mar 2026
                  </span>
                </div>
                <p className="text-sm text-foreground/70 font-sans">Digima Web Solutions</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground marker:text-[oklch(0.55_0.12_45)] list-disc pl-4">
                  <li className="pl-1 group-hover:text-foreground/80 transition-colors">
                    Improved frontend design and UI for an integrated web app using Angular and Laravel.
                  </li>
                  <li className="pl-1 group-hover:text-foreground/80 transition-colors">
                    Navigated Frappe/ERPNext business flows like Procure-to-Pay and assisted with custom applications.
                  </li>
                  <li className="pl-1 group-hover:text-foreground/80 transition-colors">
                    Built custom print formats with HTML, CSS, and Jinja, and supported deployment of website modules and customer portals.
                  </li>
                  <li className="pl-1 group-hover:text-foreground/80 transition-colors">
                    Completed a 480-hour internship with pair programming and practical development tasks.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10 bg-gradient-to-r from-transparent via-border/40 to-transparent" />

        <section id="projects" aria-labelledby="projects-heading" className="flex flex-col gap-6 mb-10 scroll-mt-24">
          <div className="flex items-center gap-3 animate-fade-up animation-delay-300">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[oklch(0.65_0.18_85)] to-[oklch(0.55_0.12_45)] flex items-center justify-center shadow-md">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 id="projects-heading" className="text-xl font-heading font-semibold text-foreground">Projects</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-border/40 to-transparent" />
          </div>
          
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="animate-fade-up animation-delay-400 group">
              <Card className="relative h-full bg-card/50 backdrop-blur-sm border-border/30 transition-all duration-500 hover:border-[oklch(0.55_0.12_45)_/_0.25] hover:shadow-lg hover:-translate-y-1">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[oklch(0.55_0.12_45)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">👋</span>
                      <CardTitle className="text-base font-medium group-hover:text-[oklch(0.55_0.12_45)] transition-colors">
                        Signademy
                      </CardTitle>
                    </div>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-[oklch(0.55_0.12_45)] bg-[oklch(0.55_0.12_45_/_0.08)] px-2 py-0.5 rounded">
                      Capstone
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-sans">Lead Developer</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors">
                    Web platform for inclusive education with webcam gesture detection. Awarded Student&apos;s Choice Award for IT Capstone (2025-2026).
                  </p>
                  <div className="flex gap-1.5 mt-3">
                    <span className="text-[10px] px-1.5 py-0.5 bg-[oklch(0.55_0.12_45)_/_0.08)] text-[oklch(0.55_0.12_45)] rounded">React</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-[oklch(0.55_0.12_45)_/_0.08)] text-[oklch(0.55_0.12_45)] rounded">MediaPipe</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="animate-fade-up animation-delay-500 group">
              <Card className="relative h-full bg-card/50 backdrop-blur-sm border-border/30 transition-all duration-500 hover:border-[oklch(0.65_0.18_85)_/_0.35] hover:shadow-lg hover:-translate-y-1">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[oklch(0.65_0.18_85)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📚</span>
                      <CardTitle className="text-base font-medium group-hover:text-[oklch(0.65_0.18_85)] transition-colors">
                        Epilogue Vault
                      </CardTitle>
                    </div>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-[oklch(0.65_0.18_85)] bg-[oklch(0.65_0.18_85)_/_0.08)] px-2 py-0.5 rounded">
                      Solo
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-sans">Lead Developer</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors">
                    AI reading companion with EPUB/PDF-to-podcast generation, built with Next.js 15, Supabase, and Groq LLM.
                  </p>
                  <div className="flex gap-1.5 mt-3">
                    <span className="text-[10px] px-1.5 py-0.5 bg-[oklch(0.65_0.18_85)_/_0.08)] text-[oklch(0.65_0.18_85)] rounded">Next.js</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-[oklch(0.65_0.18_85)_/_0.08)] text-[oklch(0.65_0.18_85)] rounded">Supabase</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Separator className="my-10 bg-gradient-to-r from-transparent via-border/40 to-transparent" />

        <section id="skills" aria-labelledby="skills-heading" className="flex flex-col gap-6 mb-10 scroll-mt-24">
          <div className="flex items-center gap-3 animate-fade-up animation-delay-300">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[oklch(0.55_0.12_45)] to-[oklch(0.65_0.18_85)] flex items-center justify-center shadow-md">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h2 id="skills-heading" className="text-xl font-heading font-semibold text-foreground">Technical Skills</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-border/40 to-transparent" />
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="animate-fade-up animation-delay-400 group">
              <Card className="relative bg-card/50 backdrop-blur-sm border-border/30 transition-all duration-500 hover:border-[oklch(0.55_0.12_45)_/_0.25] hover:shadow-md">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[oklch(0.55_0.12_45)] to-[oklch(0.65_0.18_85)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium tracking-wide uppercase text-[oklch(0.55_0.12_45)] font-sans flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.55_0.12_45)]" />
                    Web & UI Development
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {["HTML", "CSS", "JavaScript", "TypeScript", "Angular", "React.js", "Node.js", "PHP"].map((skill) => (
                      <span 
                        key={skill} 
                        className="px-2 py-1 text-[10px] bg-muted/30 text-muted-foreground border border-border/20 rounded transition-all duration-300 hover:bg-[oklch(0.55_0.12_45)] hover:text-white hover:border-[oklch(0.55_0.12_45)] cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="animate-fade-up animation-delay-500 group">
              <Card className="relative bg-card/50 backdrop-blur-sm border-border/30 transition-all duration-500 hover:border-[oklch(0.65_0.18_85)_/_0.3] hover:shadow-md">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[oklch(0.65_0.18_85)] to-[oklch(0.55_0.12_45)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium tracking-wide uppercase text-[oklch(0.65_0.18_85)] font-sans flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.65_0.18_85)]" />
                    Programming & Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {["Python", "C++", "Pandas", "NumPy"].map((skill) => (
                      <span 
                        key={skill} 
                        className="px-2 py-1 text-[10px] bg-muted/30 text-muted-foreground border border-border/20 rounded transition-all duration-300 hover:bg-[oklch(0.65_0.18_85)] hover:text-white hover:border-[oklch(0.65_0.18_85)] cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="animate-fade-up animation-delay-600 group">
              <Card className="relative bg-card/50 backdrop-blur-sm border-border/30 transition-all duration-500 hover:border-[oklch(0.55_0.12_45)_/_0.25] hover:shadow-md">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[oklch(0.55_0.12_45)] to-[oklch(0.65_0.18_85)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium tracking-wide uppercase text-[oklch(0.55_0.12_45)] font-sans flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.55_0.12_45)]" />
                    Databases & Backend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {["SQL", "Supabase", "Firebase"].map((skill) => (
                      <span 
                        key={skill} 
                        className="px-2 py-1 text-[10px] bg-muted/30 text-muted-foreground border border-border/20 rounded transition-all duration-300 hover:bg-[oklch(0.55_0.12_45)] hover:text-white hover:border-[oklch(0.55_0.12_45)] cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="animate-fade-up animation-delay-700 group">
              <Card className="relative bg-card/50 backdrop-blur-sm border-border/30 transition-all duration-500 hover:border-[oklch(0.65_0.18_85)_/_0.3] hover:shadow-md">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[oklch(0.65_0.18_85)] to-[oklch(0.55_0.12_45)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium tracking-wide uppercase text-[oklch(0.65_0.18_85)] font-sans flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.65_0.18_85)]" />
                    Tools & Version Control
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {["Git", "GitHub"].map((skill) => (
                      <span 
                        key={skill} 
                        className="px-2 py-1 text-[10px] bg-muted/30 text-muted-foreground border border-border/20 rounded transition-all duration-300 hover:bg-[oklch(0.65_0.18_85)] hover:text-white hover:border-[oklch(0.65_0.18_85)] cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Separator className="my-10 bg-gradient-to-r from-transparent via-border/40 to-transparent" />

        <section id="education" aria-labelledby="education-heading" className="grid gap-4 sm:grid-cols-2 mb-10 scroll-mt-24">
          <div className="animate-fade-up animation-delay-400 group">
            <Card className="relative bg-card/50 backdrop-blur-sm border-border/30 transition-all duration-500 hover:border-[oklch(0.55_0.12_45)_/_0.25] hover:shadow-md h-full">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[oklch(0.55_0.12_45)] to-[oklch(0.65_0.18_85)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <CardTitle className="text-xs font-medium tracking-wide uppercase text-[oklch(0.55_0.12_45)] font-sans flex items-center gap-1.5">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  </svg>
                  Education
                </CardTitle>
                <p className="text-base font-medium text-foreground pt-2">University of the East</p>
                <p className="text-xs text-muted-foreground">Caloocan Campus</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <span className="text-foreground font-medium">BSIT</span> — Information Technology<br />
                  <span className="text-[oklch(0.55_0.12_45)]">2022 — 2026</span>
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="animate-fade-up animation-delay-500 group">
            <Card className="relative bg-card/50 backdrop-blur-sm border-border/30 transition-all duration-500 hover:border-[oklch(0.65_0.18_85)_/_0.3] hover:shadow-md h-full">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[oklch(0.65_0.18_85)] to-[oklch(0.55_0.12_45)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <CardTitle className="text-xs font-medium tracking-wide uppercase text-[oklch(0.65_0.18_85)] font-sans flex items-center gap-1.5">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 text-xs leading-relaxed text-muted-foreground">
                  <li className="flex items-start gap-1.5">
                    <span className="w-1 h-1 mt-1 rounded-full bg-[oklch(0.55_0.12_45)] shrink-0" />
                    <span>AI for Beginners — HP LIFE <span className="text-[oklch(0.55_0.12_45)]">(2025)</span></span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-1 h-1 mt-1 rounded-full bg-[oklch(0.65_0.18_85)] shrink-0" />
                    <span>Digital Transformation — Google <span className="text-[oklch(0.65_0.18_85)]">(2025)</span></span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-1 h-1 mt-1 rounded-full bg-[oklch(0.65_0.18_85)] shrink-0" />
                    <span>Cybersecurity — Cisco <span className="text-[oklch(0.65_0.18_85)]">(2025)</span></span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-1 h-1 mt-1 rounded-full bg-[oklch(0.55_0.12_45)] shrink-0" />
                    <span>Ethical Hacking — UE <span className="text-[oklch(0.55_0.12_45)]">(2024)</span></span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10 bg-gradient-to-r from-transparent via-border/40 to-transparent" />

        <section id="contact" aria-labelledby="contact-heading" className="flex flex-col gap-6 mb-6 scroll-mt-24">
          <div className="flex items-center gap-3 animate-fade-up animation-delay-300">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[oklch(0.65_0.18_85)] to-[oklch(0.55_0.12_45)] flex items-center justify-center shadow-md">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 id="contact-heading" className="text-xl font-heading font-semibold text-foreground">Contact</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-border/40 to-transparent" />
          </div>
          
          <div className="animate-fade-up animation-delay-400">
            <Card className="relative bg-card/50 backdrop-blur-sm border-border/30 transition-all duration-500 hover:border-[oklch(0.55_0.12_45)_/_0.25] hover:shadow-md">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[oklch(0.55_0.12_45)] via-[oklch(0.65_0.18_85)] to-transparent" />
              <CardContent className="flex flex-col sm:flex-row gap-6 sm:gap-12 py-5 px-5">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-[oklch(0.55_0.12_45)] font-sans">Email</span>
                  <a 
                    href="mailto:yeojlacrete@gmail.com" 
                    className="text-sm text-foreground hover:text-[oklch(0.55_0.12_45)] underline-offset-4 transition-all duration-300 hover:underline"
                  >
                    yeojlacrete@gmail.com
                  </a>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-[oklch(0.65_0.18_85)] font-sans">GitHub</span>
                  <a 
                    href="https://github.com/Lart101" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-foreground hover:text-[oklch(0.65_0.18_85)] underline-offset-4 transition-all duration-300 hover:underline"
                  >
                    github.com/Lart101
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <footer className="mt-16 pt-8 border-t border-border/20">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-px bg-gradient-to-r from-transparent to-[oklch(0.55_0.12_45)]" />
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[oklch(0.55_0.12_45)] to-[oklch(0.65_0.18_85)]" />
              <div className="w-6 h-px bg-gradient-to-l from-transparent to-[oklch(0.65_0.18_85)]" />
            </div>
            <p className="text-xs text-muted-foreground/50 font-sans">
              Designed & Built by Yeoj Artjohn T. Lacrete
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}