"use client";

import { useState } from "react";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  if (!isAuthenticated) {
    return (
      <LoginForm
        onLogin={(pwd) => {
          setPassword(pwd);
          setIsAuthenticated(true);
        }}
      />
    );
  }

  return (
    <AdminDashboard
      adminPassword={password}
      onLogout={() => {
        setIsAuthenticated(false);
        setPassword("");
      }}
    />
  );
}
