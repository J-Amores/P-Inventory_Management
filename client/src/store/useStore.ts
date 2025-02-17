// src/store/useStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
}

interface Product {
  id: string
  name: string
  price: number
  stock: number
}

interface StoreState {
  // Auth State
  user: User | null
  isAuthenticated: boolean
  
  // UI State
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  
  // Data State
  products: Product[]
  loading: boolean
  error: string | null
  
  // Actions
  setUser: (user: User | null) => void
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: 'light' | 'dark') => void
  setProducts: (products: Product[]) => void
  addProduct: (product: Product) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      sidebarOpen: true,
      theme: 'light',
      products: [],
      loading: false,
      error: null,

      // Actions
      setUser: (user) => 
        set((state) => ({ 
          user, 
          isAuthenticated: !!user 
        })),
      
      setSidebarOpen: (open) => 
        set(() => ({ sidebarOpen: open })),
      
      setTheme: (theme) => 
        set(() => ({ theme })),
      
      setProducts: (products) => 
        set(() => ({ products })),
      
      addProduct: (product) => 
        set((state) => ({ 
          products: [...state.products, product] 
        })),
      
      updateProduct: (id, updates) => 
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...updates } : product
          ),
        })),
      
      deleteProduct: (id) => 
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        })),
      
      setLoading: (loading) => 
        set(() => ({ loading })),
      
      setError: (error) => 
        set(() => ({ error })),
    }),
    {
      name: 'app-storage', // name of the item in localStorage
      skipHydration: true, // needed for Next.js
    }
  )
)

export default useStore