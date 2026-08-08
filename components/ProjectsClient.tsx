"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ExternalLink } from "lucide-react";
import type { PortfolioData } from "@/lib/portfolio-data";
import { SidebarContent } from "@/components/Sidebar";

export default function ProjectsClient({ data }: { data: PortfolioData }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,_var(--primary)_0%,_transparent_70%)] opacity-[0.03] blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,_var(--accent-secondary)_0%,_transparent_70%)] opacity-[0.03] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-50 w-64 shadow-2xl shadow-primary/5">
        <SidebarContent data={data} />
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
            />
          </SheetContent>
        </Sheet>
      </header>

      {/* Main Content Wrapper */}
      <main className="relative z-10 flex-1 lg:ml-64 flex flex-col pt-20 lg:pt-0">
        <div className="max-w-5xl mx-auto w-full px-6 py-12 xl:px-12">
          
          <div className="mb-12 animate-fade-up">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground tracking-tight mb-4">
              All Projects
            </h1>
            <p className="text-lg text-foreground/70 font-sans max-w-2xl">
              A comprehensive showcase of the projects I&apos;ve built, exploring different technologies and solving various challenges.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {data.projects.map((project, index) => (
              <div key={index} className="animate-fade-up group h-full" style={{ animationDelay: `${(index % 5) * 100}ms` }}>
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
                          <span className="text-[10px] font-medium uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded">
                            {project.type}
                          </span>
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
                        <span className="text-[10px] font-medium uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {project.type}
                        </span>
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
