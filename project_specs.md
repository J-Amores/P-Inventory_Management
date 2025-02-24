# Inventory Management System Project Specifications

## Project Overview
A comprehensive inventory management system with a modern Next.js frontend and Express/Prisma backend, allowing users to track products, monitor sales, analyze expenses, and view various business metrics through interactive visualizations.

## Tech Stack
### Frontend
- Next.js 14.x
- TypeScript
- Tailwind CSS
- shadcn/ui Component Library
- Zustand for state management
- React Query for API calls
- Recharts for data visualization
- MUI Data Grid for advanced tables

### Backend
- Node.js/Express
- TypeScript
- Prisma ORM
- SQLite
- Vercel Serverless Functions
- Vercel Storage for SQLite

## Core Features

### 1. Dashboard Overview
- Interactive statistics cards using shadcn Card components
- Sales and purchase summaries with Recharts integration
- Expense tracking with shadcn DatePicker integration
- Popular products listing
- Real-time data visualization

### 2. Inventory Management
- Product listing with MUI DataGrid
- Stock quantity tracking
- Product ratings using custom Rating component
- Advanced filtering using shadcn Select and Input components
- Bulk selection capabilities

### 3. Expense Tracking
- Category-based expense analysis
- Interactive pie charts with Recharts
- Date range filtering with shadcn DatePicker
- Category filtering with shadcn Select
- Real-time data updates

### 4. Database Schema
- Users table for user management
- Products table for inventory tracking
- Sales and Purchases tables for transaction history
- Expenses table for cost tracking
- Summary tables for analytics (Sales, Purchases, Expenses)

## Project Structure

### Frontend Components
1. **Layout Components**
   - DashboardWrapper
   - Sidebar with shadcn navigation
   - Navbar with shadcn components
   - Header

2. **Dashboard Components**
   - StatCard (shadcn Card based)
   - CardSalesSummary
   - CardPurchaseSummary
   - CardExpenseSummary
   - CardPopularProducts

3. **Data Visualization**
   - PieChart (Recharts)
   - BarChart (Recharts)
   - AreaChart (Recharts)
   - DataGrid (MUI)

4. **shadcn UI Components**
   - Button
   - Card
   - Select
   - DatePicker
   - Avatar
   - DropdownMenu
   - Input
   - Dialog
   - Toast
   - Sheet

### Backend Components
1. **Controllers**
   - DashboardController
   - ProductController
   - ExpenseController
   - AuthController
   - User management

2. **Database Models (Prisma)**
   - Users
   - Products
   - Sales
   - Purchases
   - Expenses
   - Summary tables

3. **API Endpoints**
   - `/api/dashboard/metrics`
   - `/api/products`
   - `/api/expenses/category`
   - `/api/auth/login`
   - `/api/auth/refresh`
   - `/api/auth/logout`

### Deployment
1. **Vercel Setup**
   - Serverless function configuration
   - Environment variables setup
   - SQLite database integration
   - Automatic deployments from Git
   - Edge function configuration (optional)

2. **Database Setup**
   - SQLite database initialization
   - Prisma migrations
   - Seed data implementation
   - Vercel Storage configuration

## Development Status

### Completed
- Basic project structure
- Database schema design
- Core API endpoints
- Data seeding functionality
- Vercel deployment configuration
- Frontend integration
- Error handling middleware
- Security middleware implementation

### In Progress
- Dashboard Overview implementation (stat cards, charts, data fetching)
- API optimization
- Error handling improvements
- Additional endpoints
- Security implementation (JWT auth in progress)
- Performance optimization
- SQLite database optimization

### Pending
- User authentication
- Advanced filtering
- Export functionality
- Testing implementation
- Documentation

## Development Guidelines

### Frontend
1. Follow TypeScript best practices
2. Use shadcn/ui components by default
3. Maintain consistent component styling
4. Follow Next.js conventions
5. Implement proper error boundaries
6. Use Zustand for state management
7. Follow shadcn/ui theming conventions

### Backend
1. Follow TypeScript best practices
2. Implement proper error handling
3. Use Prisma for database operations
4. Maintain consistent API response format
5. Implement request validation
6. Use environment variables for configuration
7. Follow RESTful API principles

## Database Guidelines
1. Use Prisma migrations for schema changes
2. Implement proper indexing for SQLite
3. Maintain referential integrity
4. Use appropriate data types
5. Follow naming conventions
6. Implement soft deletes where appropriate
7. Handle SQLite concurrency limitations
8. Implement proper connection management
9. Regular database file optimization

## API Security Measures
1. Input validation
2. Request rate limiting
3. CORS configuration
4. Error handling
5. Secure headers (Helmet)
6. Environment variable protection
7. SQLite file security
8. Vercel environment isolation
9. JWT authentication (in progress)

## Deployment Guidelines
1. Configure Vercel project settings
2. Set up environment variables in Vercel
3. Configure build settings
4. Implement proper logging
5. Set up preview deployments
6. Configure domain settings
7. Monitor serverless function execution
8. Manage SQLite connection pooling

## Performance Optimization
1. Query optimization for SQLite
2. Database indexing
3. Response caching
4. Connection pooling for SQLite
5. Edge caching with Vercel
6. API route optimization
7. Database file size management
8. Query execution plan optimization

## Data Models

### Users
- userId (UUID)
- name (String)
- email (String)

### Products
- productId (UUID)
- name (String)
- price (Float)
- rating (Float, optional)
- stockQuantity (Integer)

### Sales/Purchases
- id (UUID)
- productId (UUID, foreign key)
- timestamp (DateTime)
- quantity (Integer)
- unitPrice/unitCost (Float)
- totalAmount/totalCost (Float)

### Expenses
- expenseId (UUID)
- category (String)
- amount (Float)
- timestamp (DateTime)

### Summary Tables
- Various summary tables for analytics
- Aggregated data for dashboard metrics
- Category-based expense tracking

## Future Enhancements
1. Real-time updates with WebSocket (via Vercel)
2. Advanced analytics dashboard
3. PDF report generation
4. Multi-language support
5. Advanced search functionality
6. Custom dashboard layouts
7. Automated database backups
8. Monitoring and alerting
9. Edge function implementation
10. Database sharding (if needed)

## SQLite-Specific Considerations
1. **Concurrency Management**
   - Implement proper write locking
   - Handle concurrent connections
   - Manage transaction timeouts
   - Implement retry mechanisms

2. **Database Maintenance**
   - Regular VACUUM operations
   - Index optimization
   - File size monitoring
   - Backup procedures

3. **Performance Tuning**
   - Write-ahead logging configuration
   - Memory-mapped I/O settings
   - Cache size optimization
   - Query optimization

4. **Limitations Management**
   - Handle single-writer constraint
   - Manage file size growth
   - Plan for data partitioning
   - Implement proper error handling

## Frontend Structure
- App Router pattern with server components for dashboard routes
- Hybrid rendering (SSR for dashboard, CSR for admin interfaces)
- API routes handling backend communication
- Layout system with shared UI components (sidebar/navbar)

## Zustand State Management Pattern

### Example store for inventory management
import { create } from 'zustand';

interface InventoryState {
  products: Product[];
  selectedCategories: string[];
  sortOrder: 'asc' | 'desc';
  actions: {
    bulkUpdateStock: (productIds: UUID[], adjustment: number) => Promise<void>;
    applyFilters: (filters: InventoryFilter) => void;
  };
}

export const useInventoryStore = create<InventoryState>((set) => ({
  products: [],
  selectedCategories: [],
  sortOrder: 'asc',
  actions: {
    bulkUpdateStock: async (productIds, adjustment) => {
      // API call to backend Prisma service
      await fetch('/api/inventory/bulk-update', {
        method: 'POST',
        body: JSON.stringify({ productIds, adjustment })
      });
      // Optimistic UI update
      set(state => ({
        products: state.products.map(p => 
          productIds.includes(p.productId) 
            ? {...p, stockQuantity: p.stockQuantity + adjustment}
            : p
        )
      }));
    },
    // ... existing filter logic ...
  }
})); 

Next.js Frontend → React Query → API Routes → Prisma Client → SQLite
          ↑                   ↓
      Zustand Store ← Optimistic Updates 

## API route for inventory updates
export async function POST(req: Request) {
  const db = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
    // SQLite-specific configuration
    adapter: {
      query: require('@prisma/adapter-sqlite').sqliteAdapter
    }
  });
  
  try {
    return await db.$transaction(async (tx) => {
      // ... transaction logic ...
    }, {
      maxWait: 5000,  // SQLite transaction timeout
      timeout: 10000
    });
  } finally {
    await db.$disconnect();
  }
} 