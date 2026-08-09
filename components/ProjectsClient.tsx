"use client";

import { useState, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Menu, ExternalLink, Search, Filter } from "lucide-react";
import { PROJECT_CATEGORIES, type PortfolioData, type Project } from "@/lib/portfolio-data";
import { SidebarContent } from "@/components/Sidebar";

export default function ProjectsClient({ data }: { data: PortfolioData }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const allCategories = ["All", ...PROJECT_CATEGORIES];

  // Featured projects: either flagged 'featured: true' or just top 3
  const featuredProjects = useMemo(() => {
    const explicitlyFeatured = data.projects.filter(p => p.featured);
    if (explicitlyFeatured.length > 0) return explicitlyFeatured.slice(0, 3);
    return data.projects.slice(0, 3);
  }, [data.projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return data.projects.filter(project => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        project.name.toLowerCase().includes(query) || 
        project.description.toLowerCase().includes(query) ||
        project.tech.some(t => t.toLowerCase().includes(query));
      
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [data.projects, searchQuery, selectedCategory]);

  const ProjectCard = ({ project, index }: { project: Project, index: number }) => {
    const CardContentWrapper = () => (
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
            {project.url && <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 opacity-0 group-hover:opacity-100" />}
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
    );

    return (
      <div className="animate-fade-up h-full group" style={{ animationDelay: `${(index % 5) * 100}ms` }}>
        {project.url ? (
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="block h-full">
            <CardContentWrapper />
          </a>
        ) : (
          <CardContentWrapper />
        )}
      </div>
    );
  };

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
            <SidebarContent data={data} />
          </SheetContent>
        </Sheet>
      </header>

      {/* Main Content Wrapper */}
      <main className="relative z-10 flex-1 lg:ml-64 flex flex-col pt-20 lg:pt-0">
        <div className="max-w-5xl mx-auto w-full px-6 py-12 xl:px-12">
          
          <div className="mb-12 animate-fade-up">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground tracking-tight mb-4">
              My Work
            </h1>
            <p className="text-lg text-foreground/70 font-sans max-w-2xl">
              A comprehensive showcase of the projects I&apos;ve built, exploring different technologies and solving various challenges.
            </p>
          </div>

          {/* Featured Projects Hero */}
          {featuredProjects.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6 flex items-center gap-2">
                <span className="w-8 h-px bg-primary/50"></span>
                Featured Projects
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredProjects.map((project, index) => (
                  <ProjectCard key={`featured-${index}`} project={project} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Search & Tabs */}
          <div className="mb-10 flex flex-col gap-6 animate-fade-up z-20 relative">
            <div className="relative w-full max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search projects by name, description, or tools (e.g., React, Python)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 bg-background/60 backdrop-blur-md border-border/50 text-base rounded-2xl shadow-sm focus-visible:ring-primary/30"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 items-center">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* All Projects Grid */}
          <div className="mb-6 flex items-center gap-2 text-muted-foreground text-sm font-medium">
            <Filter className="w-4 h-4" />
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center animate-fade-up border border-dashed border-border/50 rounded-2xl bg-muted/10">
              <p className="text-muted-foreground mb-4">No projects found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-6 py-2 bg-primary/10 text-primary font-medium rounded-full hover:bg-primary/20 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={`project-${index}`} project={project} index={index} />
              ))}
            </div>
          )}

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
