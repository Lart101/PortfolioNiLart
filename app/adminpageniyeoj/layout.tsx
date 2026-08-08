import { Toaster } from "@/components/ui/sonner"

export const metadata = {
  title: 'Portfolio Admin',
  description: 'Admin dashboard to manage portfolio data',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
      <Toaster />
    </div>
  )
}
