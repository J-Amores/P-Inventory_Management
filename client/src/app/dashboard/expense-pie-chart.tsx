"use client"

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CategoryExpense {
  category: string;
  amount: number;
  originalAmount?: number;
  totalOriginalAmount?: number;
}

// Color palette for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#4D81D8', '#D88C43', '#9A55D8'];

// Helper function to safely format numbers
const formatNumber = (value: any): string => {
  const num = Number(value);
  return !isNaN(num) 
    ? num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '0.00';
};

// Custom tooltip for the pie chart
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    
    // Get the original amount
    const originalAmount = data.payload?.originalAmount;
    const totalOriginalAmount = data.payload?.totalOriginalAmount;
    
    // Calculate percentage using the originalAmount which is the real value
    const percentage = totalOriginalAmount && originalAmount 
      ? (originalAmount / totalOriginalAmount) 
      : 0;
    
    // Format percentage to be more readable for very small values
    let percentageDisplay;
    if (percentage < 0.001) {
      percentageDisplay = "< 0.1%";
    } else if (percentage < 0.01) {
      percentageDisplay = (percentage * 100).toFixed(2) + "%";
    } else {
      percentageDisplay = (percentage * 100).toFixed(1) + "%";
    }
    
    return (
      <div className="bg-white p-2 border rounded shadow-sm">
        <p className="font-medium">{data.name}</p>
        <p className="text-sm">
          ${formatNumber(originalAmount || 0)}
        </p>
        <p className="text-xs text-gray-500">
          {percentageDisplay}
        </p>
      </div>
    );
  }
  return null;
};

// Format the percentage for the legend
const renderLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul className="flex flex-wrap justify-center text-xs gap-2 mt-2">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center">
          <div 
            className="w-3 h-3 mr-1" 
            style={{ backgroundColor: entry.color }}
          />
          <span>{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

export function ExpensePieChart() {
  const [data, setData] = useState<CategoryExpense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExpenseCategories() {
      try {
        setLoading(true);
        const response = await fetch('/api/expenses/categories');
        
        if (!response.ok) {
          throw new Error('Failed to fetch expense categories');
        }
        
        const fetchedData = await response.json();
        
        // Calculate total original amount for accurate percentage calculations
        const totalOriginalAmount = fetchedData.reduce(
          (sum: number, item: any) => sum + (Number(item.originalAmount) || 0), 
          0
        );
        
        // Ensure all data is valid numeric values
        const validData = fetchedData
          .filter((item: any) => item && typeof item === 'object')
          .map((item: any) => ({
            category: item.category || 'Uncategorized',
            amount: isNaN(Number(item.amount)) ? 0 : Number(item.amount),
            originalAmount: isNaN(Number(item.originalAmount)) ? 0 : Number(item.originalAmount),
            totalOriginalAmount: totalOriginalAmount // Add total to each item for tooltip context
          }))
          .filter((item: CategoryExpense) => item.amount > 0);
        
        setData(validData);
      } catch (err) {
        console.error('Error fetching expense categories:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchExpenseCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-80 text-muted-foreground">
        <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-80 text-muted-foreground">
        <p>Error loading expense data: {error}</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-80 text-muted-foreground">
        <p>No expense data available</p>
      </div>
    );
  }

  // Calculate total for the pie chart
  const total = data.reduce((sum, item) => sum + item.amount, 0);
  
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={70}
            fill="#8884d8"
            dataKey="amount"
            nameKey="category"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

