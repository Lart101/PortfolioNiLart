import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Mail, Briefcase, User, Code, GraduationCap, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PortfolioData } from "@/lib/portfolio-data";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const navItems = [
  { label: "About", href: "/", icon: User, hash: "#about" },
  { label: "Experience", href: "/", icon: Briefcase, hash: "#experience" },
  { label: "Projects", href: "/projects", icon: Code, hash: "" },
  { label: "Skills", href: "/", icon: Code, hash: "#skills" },
  { label: "Education", href: "/", icon: GraduationCap, hash: "#education" },
  { label: "Contact", href: "/", icon: Phone, hash: "#contact" },
];

export function SidebarContent({ data, activeSection, setActiveSection }: { data: PortfolioData, activeSection?: string, setActiveSection?: (s: string) => void }) {
  const initials = "YL";
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-card/80 backdrop-blur-xl border-r border-border/40 p-6 lg:w-64">
      <div className="flex flex-col items-center gap-4 mb-10 mt-4">
        <Avatar className="size-24 border-4 border-background shadow-xl">
          <AvatarImage src={data.profile.avatar} alt="Profile photo" className="object-cover" />
          <AvatarFallback className="text-xl font-medium bg-primary/10 text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-lg font-heading font-semibold text-foreground tracking-tight">{data.profile.name}</h2>
          <p className="text-xs text-muted-foreground mt-1 font-sans">{data.profile.title}</p>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActivePath = pathname === item.href;
          const isActiveHash = activeSection === item.hash.slice(1);
          const isActive = item.href === "/" ? (isActivePath && isActiveHash) : isActivePath;

          const targetUrl = item.href === "/" ? `/${item.hash}` : item.href;

          return (
            <Link
              key={item.label}
              href={targetUrl}
              onClick={() => {
                if (item.href === "/" && setActiveSection) {
                  setActiveSection(item.hash.slice(1));
                }
              }}
              className={`group relative px-4 py-3 text-sm font-sans transition-all duration-300 rounded-xl flex items-center gap-3 ${
                isActive
                  ? "text-primary font-medium bg-primary/10 shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <item.icon className={`w-4 h-4 transition-colors ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8 flex items-center justify-center gap-4">
        <a
          href={`mailto:${data.contact.email}`}
          className="p-2.5 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 shadow-sm"
        >
          <Mail className="w-4 h-4" />
        </a>
        <a
          href={`https://github.com/${data.social.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 shadow-sm"
        >
          <GithubIcon className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
