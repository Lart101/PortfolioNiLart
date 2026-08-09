"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Mail, ExternalLink, Briefcase, User, Code, GraduationCap, Phone } from "lucide-react";
import Link from "next/link";
import type { PortfolioData } from "@/lib/portfolio-data";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

import { SidebarContent } from "@/components/Sidebar";
import { HireMeButton } from "@/components/HireMeButton";

export default function PortfolioClient({ data }: { data: PortfolioData }) {
  const [activeSection, setActiveSection] = useState("about");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateActiveFromHash = () => {
      const hash = window.location.hash.slice(1) || "about";
      setActiveSection(hash);
    };

    const handleScroll = () => {
      const sections = ["about", "experience", "skills", "education", "contact"];
      let currentSection = sections[0];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    updateActiveFromHash();
    window.addEventListener("hashchange", updateActiveFromHash);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("hashchange", updateActiveFromHash);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const nameParts = data.profile.name.split(" ");
  const firstName = nameParts[0];
  const restName = nameParts.slice(1).join(" ");

  return (
    <div className="relative flex min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft Warm Gradients instead of harsh orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,_var(--primary)_0%,_transparent_70%)] opacity-[0.03] blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,_var(--accent-secondary)_0%,_transparent_70%)] opacity-[0.03] blur-3xl" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-50 w-64 shadow-2xl shadow-primary/5">
        <SidebarContent data={data} activeSection={activeSection} setActiveSection={setActiveSection} />
      </aside>

      {/* Mobile Header & Sheet */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <Avatar className="size-8 border border-border">
            <AvatarImage src={data.profile.avatar} />
            <AvatarFallback className="text-xs bg-primary/10 text-primary">YL</AvatarFallback>
          </Avatar>
          <span className="font-heading font-semibold text-foreground tracking-tight">{data.profile.name}</span>
        </div>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <button className="p-2 -mr-2 text-foreground/80 hover:text-foreground transition-colors focus:outline-none">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 border-r-0">
            <SidebarContent 
              data={data} 
              activeSection={activeSection} 
              setActiveSection={(s) => {
                setActiveSection(s);
                setIsMobileMenuOpen(false);
              }} 
            />
          </SheetContent>
        </Sheet>
      </header>

      {/* Main Content Wrapper */}
      <main className="relative z-10 flex-1 lg:ml-64 flex flex-col pt-20 lg:pt-0">
        <div className="max-w-4xl mx-auto w-full px-6 py-12 lg:py-24 xl:px-12">
          
          <section id="about" className="flex flex-col gap-8 scroll-mt-24 min-h-[85vh] justify-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20 mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-medium uppercase tracking-widest text-primary">
                  Available for opportunities
                </span>
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-8 mb-10">
                <div className="flex-1">
                  <h1 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-semibold tracking-tight text-foreground leading-[1.1] mb-2">
                    {firstName}
                  </h1>
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-semibold tracking-tight text-muted-foreground leading-[1.1]">
                    {restName}
                  </h1>
                </div>

                <Avatar className="size-32 sm:size-40 lg:size-48 xl:size-56 border-4 border-background shadow-2xl shrink-0">
                  <AvatarImage src={data.profile.avatar} alt="Profile photo" className="object-cover" />
                  <AvatarFallback className="text-4xl font-medium bg-primary/10 text-primary">YL</AvatarFallback>
                </Avatar>
              </div>
              
              <p className="text-lg sm:text-xl leading-relaxed text-foreground/80 font-sans mt-8 max-w-2xl font-light">
                {data.profile.bio}
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <HireMeButton size="lg" />
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-card border border-border rounded-xl font-medium text-sm hover:border-primary hover:text-primary transition-all shadow-sm hover:-translate-y-0.5"
                >
                  <Code className="w-4 h-4" />
                  View All Projects
                </Link>
              </div>
            </div>
          </section>

          <Separator className="my-16 lg:my-24 bg-border/50" />

          <section id="experience" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-10 animate-fade-up">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent lg:hidden" />
              <h2 className="text-3xl font-heading font-semibold text-foreground">Experience</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            </div>

            <div className="flex flex-col gap-6">
              {data.experience.map((exp, index) => (
                <div key={index} className="animate-fade-up group" style={{ animationDelay: `${index * 100}ms` }}>
                  <Card className="bg-card/40 backdrop-blur-md border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                    <CardHeader className="pb-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {exp.role}
                        </CardTitle>
                        <span className="text-xs text-primary font-medium px-2.5 py-1 bg-primary/10 rounded-full w-fit">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground font-medium">{exp.company}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm leading-relaxed text-foreground/70 marker:text-primary list-disc pl-4">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="pl-2">{highlight}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </section>

          <Separator className="my-16 lg:my-24 bg-border/50" />

          <section id="projects" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-10 animate-fade-up">
              <h2 className="text-3xl font-heading font-semibold text-foreground">Featured Projects</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.projects.slice(0, 3).map((project, index) => (
                <div key={index} className="animate-fade-up group h-full" style={{ animationDelay: `${index * 100}ms` }}>
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                      <Card className="h-full flex flex-col bg-card/40 backdrop-blur-md border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden">
                        {project.image && (
                          <div className="w-full h-48 overflow-hidden bg-muted">
                            <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          </div>
                        )}
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">
                              {project.name}
                            </CardTitle>
                            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 opacity-0 group-hover:opacity-100" />
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {project.category && (
                              <span className="text-[10px] font-medium uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded">
                                {project.category}
                              </span>
                            )}
                            <span className="text-xs text-muted-foreground font-medium">• {project.role}</span>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                          <p className="text-sm leading-relaxed text-foreground/70 mb-6 flex-1">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tech.map((t) => (
                              <span key={t} className="text-xs px-2 py-1 bg-muted/50 border border-border/50 text-muted-foreground rounded-md transition-colors group-hover:border-primary/20 group-hover:bg-primary/5">
                                {t}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  ) : (
                    <Card className="h-full flex flex-col bg-card/40 backdrop-blur-md border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden">
                      {project.image && (
                        <div className="w-full h-48 overflow-hidden bg-muted">
                          <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                      )}
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">
                            {project.name}
                          </CardTitle>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {project.category && (
                            <span className="text-[10px] font-medium uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded">
                              {project.category}
                            </span>
                          )}
                          <span className="text-xs text-muted-foreground font-medium">• {project.role}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <p className="text-sm leading-relaxed text-foreground/70 mb-6 flex-1">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {project.tech.map((t) => (
                            <span key={t} className="text-xs px-2 py-1 bg-muted/50 border border-border/50 text-muted-foreground rounded-md transition-colors group-hover:border-primary/20 group-hover:bg-primary/5">
                              {t}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center animate-fade-up">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium text-sm hover:bg-secondary/80 transition-all shadow-sm border border-border/50"
              >
                View All Projects
              </Link>
            </div>
          </section>

          <Separator className="my-16 lg:my-24 bg-border/50" />

          <section id="skills" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-10 animate-fade-up">
              <h2 className="text-3xl font-heading font-semibold text-foreground">Skills & Tech</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {data.skills.map((skillGroup, index) => (
                <div key={skillGroup.category} className="animate-fade-up group" style={{ animationDelay: `${index * 100}ms` }}>
                  <Card className="bg-card/40 backdrop-blur-md border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-semibold tracking-wide uppercase text-primary font-sans">
                        {skillGroup.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1.5 text-xs font-medium bg-background border border-border/60 text-foreground/80 rounded-md transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </section>

          <Separator className="my-16 lg:my-24 bg-border/50" />

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <section id="education" className="scroll-mt-24">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6 animate-fade-up">Education</h2>
              
              <div className="animate-fade-up group relative pl-6 border-l-2 border-primary/20 hover:border-primary/50 transition-colors">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5 shadow-[0_0_0_4px_var(--background)]" />
                <h3 className="text-lg font-semibold text-foreground">{data.education.school}</h3>
                <p className="text-sm text-primary font-medium mt-1">{data.education.period}</p>
                <div className="mt-3 text-sm text-foreground/70 leading-relaxed">
                  <p className="font-medium text-foreground">{data.education.degree}</p>
                  <p>{data.education.field}</p>
                  <p className="text-xs text-muted-foreground mt-1">{data.education.campus}</p>
                </div>
              </div>

              <h2 className="text-2xl font-heading font-semibold text-foreground mt-12 mb-6 animate-fade-up">Certifications</h2>
              <div className="space-y-6">
                {data.certifications.map((cert, index) => (
                  <div key={index} className="animate-fade-up group relative pl-6 border-l-2 border-primary/20 hover:border-primary/50 transition-colors">
                    <div className="absolute w-2 h-2 bg-muted-foreground rounded-full -left-[5px] top-1.5 group-hover:bg-primary transition-colors shadow-[0_0_0_4px_var(--background)]" />
                    <h3 className="text-sm font-semibold text-foreground">{cert.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{cert.provider} • {cert.year}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="contact" className="scroll-mt-24">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6 animate-fade-up">Get in Touch</h2>
              <Card className="bg-card/40 backdrop-blur-md border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
                <CardContent className="flex flex-col gap-6 p-6">
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                  </p>
                  
                  <div className="space-y-4">
                    <a href={`mailto:${data.contact.email}`} className="flex items-center gap-3 text-sm text-foreground/80 hover:text-primary transition-colors group">
                      <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{data.contact.email}</span>
                    </a>
                    <a href={`https://github.com/${data.social.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-foreground/80 hover:text-primary transition-colors group">
                      <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <GithubIcon className="w-4 h-4" />
                      </div>
                      <span className="font-medium">github.com/{data.social.github}</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          <footer className="mt-24 pt-8 border-t border-border/40 text-center">
            <p className="text-sm text-muted-foreground font-sans">
              Designed & Built with warmth by <span className="font-medium text-foreground">{data.profile.name}</span>
            </p>
          </footer>
          
        </div>
      </main>
    </div>
  );
}
