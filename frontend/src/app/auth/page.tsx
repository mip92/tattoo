import React from "react";
import { AuthClient } from "./AuthClient";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <AuthClient />
    </div>
  );
}
