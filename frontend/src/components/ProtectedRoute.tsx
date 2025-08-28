"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  fallbackPath?: string;
}

export default function ProtectedRoute({
  children,
  requiredRole,
  fallbackPath = "/auth",
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isInitialized } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push(fallbackPath);
    }
  }, [isAuthenticated, isInitialized, router, fallbackPath]);

  React.useEffect(() => {
    if (isInitialized && isAuthenticated && requiredRole) {
      const userRole = user?.role?.name;
      if (userRole !== requiredRole) {
        router.push("/");
      }
    }
  }, [isAuthenticated, isInitialized, user, requiredRole, router]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRole && user?.role?.name !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}
