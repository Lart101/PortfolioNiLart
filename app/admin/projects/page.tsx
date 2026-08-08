"use client";

import { useEffect, useState } from "react";
import { PortfolioData, Project } from "@/lib/portfolio-data";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectFormDialog } from "@/components/ProjectFormDialog";
import Link from "next/link";
import { Loader2, Plus, Edit2, Trash2 } from "lucide-react";

export default function ProjectsDashboard() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/portfolio");
      if (!res.ok) {
        throw new Error("Failed to load portfolio data. Check your JSONBin credentials.");
      }
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveData = async (updatedData: PortfolioData) => {
    try {
      setSaving(true);
      const res = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error("Failed to save changes.");
      setData(updatedData);
    } catch (err: any) {
      alert("Error saving data: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setEditingIndex(null);
    setIsDialogOpen(true);
  };

  const handleEditProject = (project: Project, index: number) => {
    setEditingProject(project);
    setEditingIndex(index);
    setIsDialogOpen(true);
  };

  const handleDeleteProject = (index: number) => {
    if (!data) return;
    if (confirm("Are you sure you want to delete this project?")) {
      const newProjects = [...data.projects];
      newProjects.splice(index, 1);
      saveData({ ...data, projects: newProjects });
    }
  };

  const handleFormSubmit = (project: Project) => {
    if (!data) return;
    
    const newProjects = [...data.projects];
    if (editingIndex !== null) {
      // Update existing
      newProjects[editingIndex] = project;
    } else {
      // Add new
      newProjects.unshift(project);
    }

    saveData({ ...data, projects: newProjects });
    setIsDialogOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-[oklch(0.55_0.12_45)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground gap-4">
        <p className="text-destructive font-medium">{error}</p>
        <p className="text-muted-foreground text-sm">Did you set JSONBIN_BIN_ID and JSONBIN_API_KEY in .env.local?</p>
        <Button onClick={fetchData}>Try Again</Button>
        <Link href="/">
          <Button variant="outline">Back to Portfolio</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6 sm:p-12 grain-overlay">
      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Projects Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your portfolio projects in real-time.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/">
              <Button variant="outline">View Portfolio</Button>
            </Link>
            <Button onClick={handleAddProject} className="bg-[oklch(0.55_0.12_45)] text-white hover:bg-[oklch(0.5_0.1_45)] gap-2">
              <Plus className="w-4 h-4" /> Add Project
            </Button>
          </div>
        </div>

        {saving && (
          <div className="bg-muted text-muted-foreground px-4 py-2 rounded flex items-center gap-2 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" /> Saving changes to database...
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.projects.map((project, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur border-border/30 flex flex-col hover:border-[oklch(0.55_0.12_45)_/_0.3] transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-[oklch(0.55_0.12_45)] bg-[oklch(0.55_0.12_45_/_0.08)] px-2 py-0.5 rounded shrink-0">
                    {project.type}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{project.role}</p>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-foreground/80 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[10px] px-1.5 py-0.5 bg-muted/50 rounded text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="gap-2 pt-4 border-t border-border/20">
                <Button variant="secondary" size="sm" className="flex-1 gap-1.5" onClick={() => handleEditProject(project, index)}>
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </Button>
                <Button variant="destructive" size="sm" className="flex-1 gap-1.5 opacity-90" onClick={() => handleDeleteProject(index)}>
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {data?.projects.length === 0 && (
          <div className="text-center py-12 text-muted-foreground border border-dashed border-border/50 rounded-xl">
            No projects found. Add one to get started!
          </div>
        )}
      </div>

      <ProjectFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        project={editingProject}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
