"use client"

import React, { useEffect } from "react";
import Navbar from "@/app/(components)/Navbar";
import Sidebar from "./(components)/Sidebar";





const DashboardLayout = ({ children }: { children: React.ReactNode }) => {


  
    return (
      <div
      >
        <Sidebar />
        <main
        >
          <Navbar />
          {children}
        </main>
      </div>
    );
  };
  
  const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <DashboardLayout>{children}</DashboardLayout>

    );
  };
  
  export default DashboardWrapper;