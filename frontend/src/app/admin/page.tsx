import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AdminClient } from "./AdminClient";

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-muted/50">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <AdminClient />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
