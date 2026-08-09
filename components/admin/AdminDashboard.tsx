"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Plus, Trash2, LogOut, Save, ChevronDown, ChevronUp, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PROJECT_CATEGORIES, type PortfolioData } from "@/lib/portfolio-data";

const portfolioSchema = z.object({
  profile: z.object({
    name: z.string().min(1, "Required"),
    title: z.string().min(1, "Required"),
    bio: z.string().min(1, "Required"),
    avatar: z.string().min(1, "Required"),
  }),
  contact: z.object({
    location: z.string().min(1, "Required"),
    phone: z.string().min(1, "Required"),
    email: z.string().email("Invalid email"),
  }),
  social: z.object({
    github: z.string().min(1, "Required"),
    email: z.string().email("Invalid email"),
  }),
  experience: z.array(
    z.object({
      company: z.string().min(1, "Required"),
      role: z.string().min(1, "Required"),
      period: z.string().min(1, "Required"),
      highlights: z.array(z.string()),
    })
  ),
  projects: z.array(
    z.object({
      name: z.string().min(1, "Required"),
      description: z.string().min(1, "Required"),
      tech: z.array(z.string()),
      category: z.string().min(1, "Required"),
      role: z.string().min(1, "Required"),
      image: z.string().optional(),
      url: z.string().optional(),
    })
  ),
  skills: z.array(
    z.object({
      category: z.string().min(1, "Required"),
      items: z.array(z.string()),
    })
  ),
  education: z.object({
    school: z.string().min(1, "Required"),
    campus: z.string().min(1, "Required"),
    degree: z.string().min(1, "Required"),
    field: z.string().min(1, "Required"),
    period: z.string().min(1, "Required"),
  }),
  certifications: z.array(
    z.object({
      name: z.string().min(1, "Required"),
      provider: z.string().min(1, "Required"),
      year: z.number(),
    })
  ),
});

type FormValues = z.infer<typeof portfolioSchema>;

// A helper component for collapsible sections to improve UX
function CollapsibleCard({ title, defaultOpen = false, onRemove, onMoveUp, onMoveDown, isFirst, isLast, children }: any) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <Card className="overflow-hidden border border-border/50 shadow-sm transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between py-3 bg-muted/20">
        <div className="flex items-center gap-2 cursor-pointer select-none flex-1" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
        </div>
        <div className="flex items-center gap-1">
          {onMoveUp && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); onMoveUp(); }} disabled={isFirst}>
              <ArrowUp className="w-4 h-4" />
            </Button>
          )}
          {onMoveDown && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); onMoveDown(); }} disabled={isLast}>
              <ArrowDown className="w-4 h-4" />
            </Button>
          )}
          {onRemove && (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={(e) => { e.stopPropagation(); onRemove(); }}>
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent className="pt-4 pb-6">
          {children}
        </CardContent>
      )}
    </Card>
  );
}

export function AdminDashboard({ adminPassword, onLogout }: { adminPassword: string, onLogout: () => void }) {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(portfolioSchema),
    // Async defaultValues guarantees data is fetched before the form initializes perfectly
    defaultValues: async () => {
      try {
        const res = await fetch("/api/portfolio");
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        return data;
      } catch (error) {
        toast.error("Failed to load portfolio data.");
        // Return empty structure as fallback
        return {
          profile: { name: "", title: "", bio: "", avatar: "" },
          contact: { location: "", phone: "", email: "" },
          social: { github: "", email: "" },
          experience: [],
          projects: [],
          skills: [],
          education: { school: "", campus: "", degree: "", field: "", period: "" },
          certifications: [],
        };
      }
    },
  });

  const { control, handleSubmit, register, formState: { isLoading } } = form;

  const { fields: expFields, append: appendExp, remove: removeExp, move: moveExp } = useFieldArray({ control, name: "experience" });
  const { fields: projFields, append: appendProj, remove: removeProj, move: moveProj } = useFieldArray({ control, name: "projects" });
  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control, name: "skills" });
  const { fields: certFields, append: appendCert, remove: removeCert } = useFieldArray({ control, name: "certifications" });

  const onSubmit = async (data: FormValues) => {
    setIsSaving(true);
    
    // Clean up comma-separated and newline-separated inputs
    const cleanedData = {
      ...data,
      projects: data.projects.map(p => ({
        ...p,
        tech: p.tech.map(t => t.trim()).filter(Boolean)
      })),
      skills: data.skills.map(s => ({
        ...s,
        items: s.items.map(i => i.trim()).filter(Boolean)
      })),
      experience: data.experience.map(e => ({
        ...e,
        highlights: e.highlights.map(h => h.trim()).filter(Boolean)
      }))
    };

    try {
      const res = await fetch("/api/portfolio", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword,
        },
        body: JSON.stringify(cleanedData),
      });

      if (res.ok) {
        toast.success("Portfolio updated successfully!");
      } else if (res.status === 401) {
        toast.error("Unauthorized! Your session might be invalid.");
        onLogout();
      } else {
        toast.error("Failed to update portfolio.");
      }
    } catch (err) {
      toast.error("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">Loading your portfolio data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/10 pb-20">
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b shadow-sm">
        <h1 className="text-xl font-bold font-heading">Portfolio Admin</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
          <Button size="sm" onClick={handleSubmit(onSubmit)} disabled={isSaving}>
            {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8 mt-4">
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="flex flex-wrap h-auto p-1.5 bg-muted/50 rounded-xl max-w-2xl mx-auto shadow-inner">
            <TabsTrigger value="profile" className="rounded-lg flex-1">Profile</TabsTrigger>
            <TabsTrigger value="experience" className="rounded-lg flex-1">Experience</TabsTrigger>
            <TabsTrigger value="projects" className="rounded-lg flex-1">Projects</TabsTrigger>
            <TabsTrigger value="skills" className="rounded-lg flex-1">Skills & Edu</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="bg-muted/10">
                <CardTitle>Profile Details</CardTitle>
                <CardDescription>Your main introductory information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input {...register("profile.name")} placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title/Headline</label>
                    <Input {...register("profile.title")} placeholder="Software Engineer" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Avatar URL (Local or Remote)</label>
                    <Input {...register("profile.avatar")} placeholder="/profile.jpg" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Bio</label>
                    <Textarea {...register("profile.bio")} rows={4} placeholder="A short bio about yourself..." />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader className="bg-muted/10">
                <CardTitle>Contact & Social</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input {...register("contact.email")} type="email" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input {...register("contact.phone")} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input {...register("contact.location")} placeholder="City, Country" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">GitHub Username/URL</label>
                    <Input {...register("social.github")} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between pb-2 border-b">
              <h2 className="text-2xl font-semibold tracking-tight">Work Experience</h2>
              <Button onClick={() => appendExp({ company: "", role: "", period: "", highlights: [] })} variant="default" size="sm">
                <Plus className="w-4 h-4 mr-2" /> Add Experience
              </Button>
            </div>
            
            {expFields.length === 0 && (
              <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-xl">
                No experience added yet. Click the button above to add one.
              </div>
            )}

            <div className="space-y-4">
              {expFields.map((field, index) => (
                <CollapsibleCard 
                  key={field.id} 
                  title={`${form.watch(`experience.${index}.role`) || "New Role"} at ${form.watch(`experience.${index}.company`) || "Company"}`}
                  defaultOpen={index === 0}
                  onRemove={() => removeExp(index)}
                  onMoveUp={index > 0 ? () => moveExp(index, index - 1) : undefined}
                  onMoveDown={index < expFields.length - 1 ? () => moveExp(index, index + 1) : undefined}
                  isFirst={index === 0}
                  isLast={index === expFields.length - 1}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Company</label>
                      <Input {...register(`experience.${index}.company`)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Role</label>
                      <Input {...register(`experience.${index}.role`)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Period</label>
                      <Input {...register(`experience.${index}.period`)} placeholder="e.g. Jan 2024 - Present" />
                    </div>
                    <div className="space-y-2 md:col-span-3">
                      <label className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                        Highlights (One per line)
                      </label>
                      <Controller
                        control={control}
                        name={`experience.${index}.highlights`}
                        render={({ field }) => (
                          <Textarea 
                            value={field.value?.join("\n")} 
                            onChange={(e) => field.onChange(e.target.value.split("\n"))}
                            placeholder="Developed new features...&#10;Led a team of..."
                            rows={4}
                            className="resize-none"
                          />
                        )}
                      />
                    </div>
                  </div>
                </CollapsibleCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between pb-2 border-b">
              <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
              <Button onClick={() => appendProj({ name: "", description: "", tech: [], category: "", role: "", image: "", url: "" })} variant="default" size="sm">
                <Plus className="w-4 h-4 mr-2" /> Add Project
              </Button>
            </div>
            
            {projFields.length === 0 && (
              <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-xl">
                No projects added yet. Click the button above to add one.
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {projFields.map((field, index) => (
                <CollapsibleCard 
                  key={field.id} 
                  title={form.watch(`projects.${index}.name`) || "New Project"}
                  defaultOpen={index === 0}
                  onRemove={() => removeProj(index)}
                  onMoveUp={index > 0 ? () => moveProj(index, index - 1) : undefined}
                  onMoveDown={index < projFields.length - 1 ? () => moveProj(index, index + 1) : undefined}
                  isFirst={index === 0}
                  isLast={index === projFields.length - 1}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Project Name</label>
                      <Input {...register(`projects.${index}.name`)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Category</label>
                      <select
                        {...register(`projects.${index}.category`)}
                        className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="" disabled>Select a category</option>
                        {PROJECT_CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Your Role</label>
                      <Input {...register(`projects.${index}.role`)} placeholder="Lead Developer" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Tech Stack (comma separated)</label>
                      <Controller
                        control={control}
                        name={`projects.${index}.tech`}
                        render={({ field }) => (
                          <Input 
                            value={field.value?.join(",")} 
                            onChange={(e) => field.onChange(e.target.value.split(","))}
                            placeholder="React, Next.js, Tailwind"
                          />
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Project URL</label>
                      <Input {...register(`projects.${index}.url`)} placeholder="https://..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Image URL</label>
                      <Input {...register(`projects.${index}.image`)} placeholder="/projects/example.png or https://..." />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-muted-foreground">Description</label>
                      <Textarea {...register(`projects.${index}.description`)} rows={3} />
                    </div>
                  </div>
                </CollapsibleCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Education Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Education</h2>
              <Card className="border-border/50 shadow-sm">
                <CardContent className="space-y-5 pt-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">School/University</label>
                    <Input {...register("education.school")} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Degree</label>
                      <Input {...register("education.degree")} placeholder="BSIT" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Field of Study</label>
                      <Input {...register("education.field")} placeholder="Information Technology" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Campus</label>
                      <Input {...register("education.campus")} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Period</label>
                      <Input {...register("education.period")} placeholder="2022 - 2026" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Skills Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b">
                  <h2 className="text-xl font-semibold">Skills</h2>
                  <Button onClick={() => appendSkill({ category: "", items: [] })} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" /> Category
                  </Button>
                </div>
                
                {skillFields.map((field, index) => (
                  <Card key={field.id} className="border-border/50 shadow-sm relative group">
                    <CardHeader className="flex flex-row items-center justify-between py-3 bg-muted/10">
                      <Input {...register(`skills.${index}.category`)} className="font-semibold border-none bg-transparent shadow-none w-3/4 px-0 h-8 text-base focus-visible:ring-0" placeholder="Category Name (e.g. Languages)" />
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeSkill(index)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4 pb-4">
                      <Controller
                        control={control}
                        name={`skills.${index}.items`}
                        render={({ field }) => (
                          <Textarea 
                            value={field.value?.join(",")} 
                            onChange={(e) => field.onChange(e.target.value.split(","))}
                            placeholder="React, Vue, Angular (comma separated)"
                            rows={3}
                            className="resize-none"
                          />
                        )}
                      />
                    </CardContent>
                  </Card>
                ))}
              </section>

              {/* Certifications Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b">
                  <h2 className="text-xl font-semibold">Certifications</h2>
                  <Button onClick={() => appendCert({ name: "", provider: "", year: new Date().getFullYear() })} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" /> Add Cert
                  </Button>
                </div>
                
                {certFields.map((field, index) => (
                  <Card key={field.id} className="border-border/50 shadow-sm relative group">
                    <CardHeader className="flex flex-row items-center justify-between py-3 bg-muted/10">
                      <CardTitle className="text-sm font-semibold">{form.watch(`certifications.${index}.name`) || "New Cert"}</CardTitle>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeCert(index)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4 pb-4">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">Certificate Name</label>
                        <Input {...register(`certifications.${index}.name`)} className="h-8 text-sm" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-muted-foreground">Provider</label>
                          <Input {...register(`certifications.${index}.provider`)} className="h-8 text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-muted-foreground">Year</label>
                          <Input type="number" {...register(`certifications.${index}.year`, { valueAsNumber: true })} className="h-8 text-sm" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </section>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
