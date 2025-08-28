"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useBreadcrumbs } from "@/contexts/BreadcrumbsContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomeClient() {
  const { isAuthenticated, user } = useAuth();
  const { clearBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    clearBreadcrumbs();
  }, [clearBreadcrumbs]);

  return (
    <>
      <section className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
        {!isAuthenticated ? (
          <>
            <div className="rounded-md shadow">
              <Link href="/auth">
                <Button size="lg" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="w-full">
                  Dashboard
                </Button>
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link href="/products">
                <Button variant="outline" size="lg" className="w-full">
                  Products
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-md shadow">
              <Link href="/dashboard">
                <Button size="lg" className="w-full">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
            {user?.role?.name === "admin" && (
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link href="/admin">
                  <Button variant="outline" size="lg" className="w-full">
                    Admin Panel
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </section>

      <section className="mt-20">
        <h2 className="sr-only">Platform Features</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <article className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Authentication
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Secure login and registration with JWT tokens and GraphQL
              integration.
            </p>
          </article>

          <article className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Role Management
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Role-based access control with protected routes for different user
              levels.
            </p>
          </article>

          <article className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Modern Tech Stack
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Built with Next.js 14, TypeScript, Tailwind CSS, and Apollo
              Client.
            </p>
          </article>
        </div>
      </section>

      {/* Приветствие авторизованного пользователя */}
      {isAuthenticated && (
        <section className="mt-12 text-center">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Welcome back, {user?.firstName || user?.email}!
            </h3>
            {user?.role && (
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Role:{" "}
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {user.role.name}
                </span>
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
}
