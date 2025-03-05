# Project Structure - Inventory Management System

## Root Directory
```
├── .next/                  # Next.js build output
├── src/                    # Source code
├── public/                 # Public assets
│   └── assets/             # Static assets
├── prisma/                 # Database ORM
│   ├── dev.db              # SQLite database
│   ├── migrations/         # Database migrations
│   ├── seedData/           # Seed data for the database
│   ├── seed.ts             # Database seeding script
│   └── schema.prisma       # Prisma schema definition
├── scripts/                # Utility scripts
├── node_modules/           # Dependencies
├── package.json            # Project configuration
├── package-lock.json       # Dependency lock file
├── tailwind.config.js      # Tailwind CSS configuration
├── tailwind.config.ts      # TypeScript version of Tailwind config
├── tsconfig.json           # TypeScript configuration
├── postcss.config.mjs      # PostCSS configuration
├── next.config.mjs         # Next.js configuration
├── .env                    # Environment variables
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore file
├── README.md               # Project documentation
├── README-PRISMA.md        # Prisma-specific documentation
└── components.json         # UI components configuration
```

## Source Directory (src/)
```
├── lib/                    # Utility functions and helpers
│   ├── transaction-utils.ts # Transaction-related utilities
│   ├── id-utils.ts         # ID generation utilities
│   ├── prisma-utils.ts     # Prisma database utilities
│   ├── prisma.ts           # Prisma client configuration
│   └── utils.ts            # General utilities
├── app/                    # Next.js App Router
│   ├── api/                # API routes
│   ├── components/         # Shared components
│   │   ├── ui/             # UI components
│   │   ├── inventory/      # Inventory-specific components
│   │   ├── sidebar.tsx     # Sidebar navigation component
│   │   ├── vault-table.tsx # Vault table component
│   │   ├── metrics-card.tsx # Metrics card component
│   │   ├── stat-card.tsx   # Statistics card component
│   │   ├── stats-chart.tsx # Statistics chart component
│   │   └── theme-provider.tsx # Theme provider component
│   ├── dashboard/          # Dashboard page
│   ├── expenses/           # Expenses page
│   ├── inventory/          # Inventory management page
│   ├── settings/           # Settings page
│   ├── users/              # User management page
│   ├── fonts/              # Font assets
│   ├── favicon.ico         # Site favicon
│   ├── globals.css         # Global CSS styles
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Home page component
└── layout.tsx              # Additional layout component
```

## Key Features
- **Next.js App Router**: Modern routing system with file-based routing
- **Prisma ORM**: Type-safe database access with migrations
- **Tailwind CSS**: Utility-first CSS framework for styling
- **TypeScript**: Static type checking for improved code quality
- **Component-based Architecture**: Reusable UI components

## Main Application Pages
- **Dashboard**: Overview and key metrics
- **Inventory**: Inventory management functionality
- **Expenses**: Expense tracking and management
- **Users**: User management
- **Settings**: Application settings

This structure follows modern Next.js practices with the App Router pattern, separating concerns between UI components, pages, and utility functions. 