"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Home,
  LayoutDashboard,
  Shield,
  User,
  Settings,
  Menu,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Package,
  Tag,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCollapseChange?: (collapsed: boolean) => void;
}

interface NavigationItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  requiresAuth?: boolean;
  requiresRole?: string[];
}

const navigationItems: NavigationItem[] = [
  { href: "/", label: "Home", icon: Home },
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    requiresAuth: true,
  },
  {
    href: "/admin",
    label: "Admin Panel",
    icon: Shield,
    requiresRole: ["admin"],
  },
  { href: "/profile", label: "Profile", icon: User, requiresAuth: true },
  { href: "/settings", label: "Settings", icon: Settings, requiresAuth: true },
  { href: "/products", label: "Products", icon: Package, requiresAuth: true },
  { href: "/brands", label: "Brands", icon: Tag, requiresAuth: true },
  { href: "/box-types", label: "Box Types", icon: Package, requiresAuth: true },
];

export default function Sidebar({
  isOpen,
  onClose,
  onCollapseChange,
}: SidebarProps) {
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredItems = navigationItems.filter((item) => {
    if (item.requiresAuth && !isAuthenticated) return false;
    if (item.requiresRole && item.requiresRole.length > 0) {
      const userRole = user?.role?.name;
      if (!userRole || !item.requiresRole.includes(userRole)) return false;
    }
    return true;
  });

  const SidebarContent = () => (
    <div className="flex flex-col h-full relative">
      {/* Logo */}
      <div
        className={`${
          isCollapsed ? "h-14 px-3" : "h-14 px-6"
        } flex items-center border-b border-gray-200 dark:border-gray-700`}
      >
        <Link
          href="/"
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "space-x-2"
          }`}
          onClick={onClose}
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 min-w-8">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          {!isCollapsed && (
            <span className="font-bold text-xl text-gray-900 dark:text-white whitespace-nowrap overflow-hidden">
              Tattoo Client
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center ${
                isCollapsed ? "justify-center px-2" : "space-x-3 px-3"
              } py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-r-2 border-blue-600"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      {isAuthenticated && (
        <div
          className={`${
            isCollapsed ? "p-2" : "p-4"
          } border-t border-gray-200 dark:border-gray-700`}
        >
          {!isCollapsed ? (
            <>
              <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-2 text-sm">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {user?.email}
                  </span>
                </div>
                {user?.role && (
                  <div className="mt-1">
                    <span className="inline-flex items-center rounded-md bg-blue-100 dark:bg-blue-900 px-2 py-1 text-xs font-medium text-blue-800 dark:text-blue-200">
                      {user.role.name}
                    </span>
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full h-9"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Collapse Toggle Button - only visible on desktop */}
      <div className="hidden md:block absolute -right-3 top-20">
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm"
          onClick={() => {
            const newCollapsed = !isCollapsed;
            setIsCollapsed(newCollapsed);
            onCollapseChange?.(newCollapsed);
          }}
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div
        className={`hidden md:flex md:flex-col md:fixed md:inset-y-0 md:z-50 transition-all duration-300 ${
          isCollapsed ? "md:w-16" : "md:w-64"
        }`}
      >
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
          <SidebarContent />
        </div>
      </div>

      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-80 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}

// Mobile Menu Button Component
export function MobileMenuButton({ onOpen }: { onOpen: () => void }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onOpen}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
    </Sheet>
  );
}
