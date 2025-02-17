// src/app/(components)/Sidebar/index.tsx
"use client";

import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  Menu,
  SlidersHorizontal,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useStore from "@/store/useStore";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer
          ${isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
      >
        <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
        <span className={isActive ? 'font-semibold' : 'text-gray-700'}>{label}</span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useStore();

  const links = [
    { href: "/dashboard", icon: Layout, label: "Dashboard" },
    { href: "/inventory", icon: Archive, label: "Inventory" },
    { href: "/products", icon: Clipboard, label: "Products" },
    { href: "/expenses", icon: CircleDollarSign, label: "Expenses" },
    { href: "/users", icon: User, label: "Users" },
    { href: "/settings", icon: SlidersHorizontal, label: "Settings" },
  ];

  return (
    <div className={`h-screen bg-white shadow-lg transition-all duration-300 
      ${sidebarOpen ? 'w-64' : 'w-20'} p-4 flex flex-col`}>
      {/* TOP LOGO */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/logo.png"
            alt="edstock-logo"
            width={27}
            height={27}
            className="rounded w-8"
          />
          {sidebarOpen && (
            <h1 className="text-xl font-bold">EDSTOCK</h1>
          )}
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8">
        {links.map((link) => (
          <SidebarLink key={link.href} {...link} />
        ))}
      </div>

      {/* FOOTER */}
      <div className="mt-auto">
        <p className="text-center text-xs text-gray-500">&copy; 2024 Edstock</p>
      </div>
    </div>
  );
};

export default Sidebar;