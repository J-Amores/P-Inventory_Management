# eslint.config.mjs

```mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;

```

# next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

# next.config.ts

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

```

# package.json

```json
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@emotion/react": "^11.11.4",
    "@emotion/styled": "^11.11.5",
    "@mui/material": "^5.16.0",
    "@mui/x-data-grid": "^7.9.0",
    "@reduxjs/toolkit": "^2.5.1",
    "dotenv": "^16.4.7",
    "lucide-react": "^0.407.0",
    "next": "15.1.7",
    "numeral": "^2.0.6",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-redux": "^9.2.0",
    "recharts": "^2.12.7",
    "redux-persist": "^6.0.0",
    "uuid": "^10.0.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@types/node": "^20",
    "@types/numeral": "^2.0.5",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/uuid": "^10.0.0",
    "eslint": "^9",
    "eslint-config-next": "15.1.7",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "tw-colors": "^3.3.1",
    "typescript": "^5"
  }
}

```

# postcss.config.mjs

```mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;

```

# public/assets/logo.png

This is a binary file of the type: Image

# public/assets/product1.png

This is a binary file of the type: Image

# public/assets/product2.png

This is a binary file of the type: Image

# public/assets/product3.png

This is a binary file of the type: Image

# public/assets/profile.jpg

This is a binary file of the type: Image

# public/file.svg

This is a file of the type: SVG Image

# public/globe.svg

This is a file of the type: SVG Image

# public/next.svg

This is a file of the type: SVG Image

# public/vercel.svg

This is a file of the type: SVG Image

# public/window.svg

This is a file of the type: SVG Image

# src/app/(components)/Header/index.tsx

```tsx
type HeaderProps = {
    name: string;
}

const Header = ({ name }: HeaderProps) => {
    return <h1 className="text-2xl font-semibold text-gray-700"> {name} </h1>;
};

export default Header; 
```

# src/app/(components)/Navbar/index.tsx

```tsx
"use client";



import { Bell, Menu, Moon, Settings, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {


  return (
    <div className="flex justify-between items-center w-full mb-7">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="relative">
          <input
            type="search"
            placeholder="Start type to search groups & products"
            className="pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
          />

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-non">
            <Bell className="text-gray-500" size={20} />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            <button>
              
            </button>
          </div>
          <div className="relative">
            <Bell className="cursor-pointer text-gray-500" size={24} />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
              3
            </span>
          </div>
          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            <Image
              src="/assets/profile.jpg"
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full h-full object-cover"
            />
            <span className="font-semibold"></span>
          </div>
        </div>
        <Link href="/settings">
          <Settings className="cursor-pointer text-gray-500" size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
```

# src/app/(components)/Rating/index.tsx

```tsx
type RatingProps = {
    rating: number;
};

const Rating = ({}) => {

};
```

# src/app/(components)/Sidebar/index.tsx

```tsx
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
import React from "react";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const Sidebar = () => {


  return (
    <div>
      {/* TOP LOGO */}
      <div
      >
        <Image
          src= "/assets/logo.png"
          alt="edstock-logo"
          width={27}
          height={27}
          className="rounded w-8"
        />
        <h1
        >
          EDSTOCK
        </h1>

        <button
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8">

      </div>

      {/* FOOTER */}
      <div>
        <p className="text-center text-xs text-gray-500">&copy; 2024 Edstock</p>
      </div>
    </div>
  );
};

export default Sidebar;
```

# src/app/dashboard/page.tsx

```tsx


const Dashboard = () => {
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard
```

# src/app/dashboardWrapper.tsx

```tsx
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
```

# src/app/expenses/page.tsx

```tsx
const Expenses = () => {
    return (
      <div>Expenses</div>
    )
  }
  
  export default Expenses
```

# src/app/favicon.ico

This is a binary file of the type: Binary

# src/app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body,
#root,
.app {
  height: 100%;
  width: 100%;
  @apply text-sm;
  @apply bg-gray-500;
  @apply text-gray-900;
}

@media (min-width: 768px) {
  .custom-grid-rows {
    grid-template-rows: repeat(8, 20vh);
  }
}

@media (min-width: 1280px) {
  .custom-grid-rows {
    grid-template-rows: repeat(8, 7.5vh);
  }
}
```

# src/app/inventory/page.tsx

```tsx
const Inventory = () => {
    return (
      <div>Inventory</div>
    )
  }
  
  export default Inventory
```

# src/app/layout.tsx

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "./dashboardWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventory Management",
  description: "A dashboard concept for a Inventory Management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}
```

# src/app/page.tsx

```tsx
import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <Dashboard />
  );
}

```

# src/app/products/page.tsx

```tsx
const Products = () => {
    return (
      <div>Products</div>
    )
  }
  
  export default Products
```

# src/app/settings/page.tsx

```tsx
const Settings = () => {
    return (
      <div>Settings</div>
    )
  }
  
  export default Settings
```

# src/app/users/page.tsx

```tsx
const Users = () => {
    return (
      <div>Users</div>
    )
  }
  
  export default Users
```

# tailwind.config.ts

```ts
import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";
import colors from "tailwindcss/colors";

const baseColors = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];

const shadeMapping = {
  "50": "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
};

const generateThemeObject = (colors: any, mapping: any, invert = false) => {
 const theme: any = {};
 baseColors.forEach((color) => {
  theme[color]={};
  Object.entries(mapping).forEach(([key, value]:any) => {
    const shadeKey = invert ? value : key;
    theme[color][key] = colors[color][shadeKey];
  });
 });

 return theme;
};

//Light vs Dark Mode
const lightTheme  = generateThemeObject(colors, shadeMapping);
const darkTheme = generateThemeObject(colors, shadeMapping, true);

const themes = {
  light: {
    ...lightTheme,
    white: "#ffffff",
  },
  dark: {
    ...darkTheme,
    white: colors.gray["950"],
    black: colors.gray["50"],
  },
};

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [createThemes(themes)],
};

export default config;

```

# tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

