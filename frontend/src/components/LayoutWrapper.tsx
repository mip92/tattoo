"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useBreadcrumbs } from "@/contexts/BreadcrumbsContext";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header
        onSidebarOpen={() => setIsSidebarOpen(true)}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="flex">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onCollapseChange={setIsSidebarCollapsed}
        />
        <main
          className={`flex-1 transition-all duration-300 ${
            isSidebarCollapsed ? "md:ml-16" : "md:ml-64"
          }`}
        >
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((item, index) => (
                    <React.Fragment key={index}>
                      <BreadcrumbItem>
                        {item.href && !item.isActive ? (
                          <BreadcrumbLink asChild>
                            <Link href={item.href}>{item.label}</Link>
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumbs.length - 1 && (
                        <BreadcrumbSeparator />
                      )}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>

              {/* Page Title */}
              {breadcrumbs.length > 0 && (
                <div className="mt-4">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {breadcrumbs[breadcrumbs.length - 1].label}
                  </h1>
                </div>
              )}
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  );
}
