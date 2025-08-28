"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun, User, LogOut } from "lucide-react";
import { MobileMenuButton } from "./Sidebar";

interface HeaderProps {
  onSidebarOpen: () => void;
  isSidebarOpen?: boolean;
}

export default function Header({
  onSidebarOpen,
  isSidebarOpen = false,
}: HeaderProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-900">
      <div className="w-full flex h-14 items-center px-4 sm:px-6 lg:px-8">
        <MobileMenuButton onOpen={onSidebarOpen} />

        <div
          className={`flex mr-4 transition-all duration-300 ${
            isSidebarOpen ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
          }`}
        >
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white whitespace-nowrap">
              Tattoo Client
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium mr-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="transition-colors hover:text-blue-600 text-gray-700 dark:text-gray-300"
                >
                  Dashboard
                </Link>
                <Link
                  href="/products"
                  className="transition-colors hover:text-blue-600 text-gray-700 dark:text-gray-300"
                >
                  Products
                </Link>
                <Link
                  href="/box-types"
                  className="transition-colors hover:text-blue-600 text-gray-700 dark:text-gray-300"
                >
                  Box Types
                </Link>
                {user?.role?.name === "admin" && (
                  <Link
                    href="/admin"
                    className="transition-colors hover:text-blue-600 text-gray-700 dark:text-gray-300"
                  >
                    Admin Panel
                  </Link>
                )}
              </>
            ) : (
              <Link
                href="/"
                className="transition-colors hover:text-blue-600 text-gray-700 dark:text-gray-300"
              >
                Home
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:flex items-center space-x-2 text-sm">
                  <User className="h-4 w-4" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {user?.email}
                  </span>
                  {user?.role && (
                    <span className="hidden md:inline-flex items-center rounded-md bg-blue-100 dark:bg-blue-900 px-2 py-1 text-xs font-medium text-blue-800 dark:text-blue-200 ring-1 ring-inset ring-blue-200 dark:ring-blue-700">
                      {user.role.name}
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className="h-9 w-9"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link href="/auth">
                <Button size="sm">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
