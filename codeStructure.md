# Project Folder Structure

```
root/
├── public/
│   ├── assets/
│   │   ├── logo.png
│   │   ├── product1.png
│   │   ├── product2.png
│   │   ├── product3.png
│   │   └── profile.jpg
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── src/
│   ├── app/
│   │   ├── (components)/
│   │   │   ├── Header/
│   │   │   │   └── index.tsx
│   │   │   ├── Navbar/
│   │   │   │   └── index.tsx
│   │   │   ├── Rating/
│   │   │   │   └── index.tsx
│   │   │   └── Sidebar/
│   │   │       └── index.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── expenses/
│   │   │   └── page.tsx
│   │   ├── inventory/
│   │   │   └── page.tsx
│   │   ├── products/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   ├── users/
│   │   │   └── page.tsx
│   │   │
│   │   ├── dashboardWrapper.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   └── store/
│       └── useStore.ts
│
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

This is a Next.js project with TypeScript and Tailwind CSS. The main structure follows Next.js 13+ conventions with the app directory pattern. Key areas include:

- Configuration files at the root level for TypeScript, ESLint, Next.js, and Tailwind
- Public assets directory for static files
- Source code under `src/app` with:
  - Reusable components in the `(components)` directory
  - Page routes following Next.js file-based routing
  - Global styling and layout files

This was created using this script: 
 - To package up your codebase for AI use, run `npx ai-digest` in your project directory