
"use client"

import React, { useEffect } from "react";
import Navbar from "@/app/(components)/Navbar";
import Sidebar from "./(components)/Sidebar";
import useStore from "@/store/useStore";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme, sidebarOpen } = useStore();

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  
  return (
    <div className={`flex h-screen ${theme}`}>
      <Sidebar />
      <main className={`flex-1 p-8 transition-all duration-300 
        ${sidebarOpen ? 'ml-64' : 'ml-20'} 
        bg-gray-50 dark:bg-gray-900`}>
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  // Initialize store here if needed
  useEffect(() => {
    useStore.persist.rehydrate();
  }, []);

  return (
    <DashboardLayout>{children}</DashboardLayout>
  );
};

export default DashboardWrapper;