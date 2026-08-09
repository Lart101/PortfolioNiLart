"use client";

import { useState } from "react";
import { Mail, Check, Copy } from "lucide-react";

import Link from "next/link";

interface HireMeButtonProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function HireMeButton({ className = "", size = "md" }: HireMeButtonProps) {
  const email = "yeojlacretework@gmail.com";
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3.5 text-base"
  };

  const iconClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  return (
    <div className={`flex items-stretch shadow-xl shadow-primary/20 rounded-xl overflow-hidden hover:-translate-y-0.5 transition-transform ${className}`}>
      <Link
        href="/#contact"
        className={`inline-flex items-center justify-center gap-2.5 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all ${sizeClasses[size]} flex-1`}
      >
        <Mail className={iconClasses[size]} />
        Hire Me
      </Link>
      <button
        onClick={handleCopy}
        className={`inline-flex items-center justify-center bg-primary/20 text-primary hover:bg-primary/30 transition-all border-l border-primary/20 ${sizeClasses[size]}`}
        title="Copy email address"
      >
        {copied ? <Check className={iconClasses[size]} /> : <Copy className={iconClasses[size]} />}
      </button>
    </div>
  );
}
