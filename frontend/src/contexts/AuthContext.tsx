"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserAuth } from "@/generated/graphql";

interface AuthContextType {
  user: UserAuth | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (accessToken: string, refreshToken: string, user: UserAuth) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Helper function to safely access localStorage
const getLocalStorageItem = (key: string): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};

const setLocalStorageItem = (key: string, value: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

const removeLocalStorageItem = (key: string): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserAuth | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check for existing tokens on app load
    const storedAccessToken = getLocalStorageItem("accessToken");
    const storedRefreshToken = getLocalStorageItem("refreshToken");
    const storedUser = getLocalStorageItem("user");

    if (storedAccessToken && storedRefreshToken && storedUser) {
      try {
        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        removeLocalStorageItem("accessToken");
        removeLocalStorageItem("refreshToken");
        removeLocalStorageItem("user");
      }
    }
    setIsInitialized(true);
  }, []);

  const login = (
    newAccessToken: string,
    newRefreshToken: string,
    newUser: UserAuth
  ) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    setUser(newUser);
    setLocalStorageItem("accessToken", newAccessToken);
    setLocalStorageItem("refreshToken", newRefreshToken);
    setLocalStorageItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    removeLocalStorageItem("accessToken");
    removeLocalStorageItem("refreshToken");
    removeLocalStorageItem("user");
  };

  const value: AuthContextType = {
    user,
    accessToken,
    refreshToken,
    login,
    logout,
    isAuthenticated: !!accessToken,
    isInitialized,
  };

  // Don't render until we've checked localStorage
  if (!isInitialized) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
