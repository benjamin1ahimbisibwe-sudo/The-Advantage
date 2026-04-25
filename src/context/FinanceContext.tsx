import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Job {
  id: string;
  name: string;
  hourlyRate: number;
}

export interface WorkLog {
  id: string;
  jobId: string;
  hours: number;
  date: string;
}

export interface Expense {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
}

export interface Activity {
  id: string;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  date: string;
  balanceAfter: number;
}

interface FinanceState {
  startingBalance: number;
  jobs: Job[];
  workLogs: WorkLog[];
  expenses: Expense[];
}

interface FinanceContextType {
  state: FinanceState;
  addJob: (name: string, hourlyRate: number) => void;
  removeJob: (jobId: string) => void;
  addWorkLog: (jobId: string, hours: number, date: string) => void;
  addExpense: (description: string, category: string, amount: number, date: string) => void;
  getTotalIncome: () => number;
  getTotalExpenses: () => number;
  getCurrentBalance: () => number;
  getActivities: () => Activity[];
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const STORAGE_KEY = 'finance-workspace-v1';

const DEFAULT_STATE: FinanceState = {
  startingBalance: 1000,
  jobs: [
    { id: '1', name: 'Café Job', hourlyRate: 15 },
    { id: '2', name: 'Freelance', hourlyRate: 50 }
  ],
  workLogs: [
    { id: 'w1', jobId: '1', hours: 3.5, date: '2026-04-24' },
    { id: 'w2', jobId: '1', hours: 2, date: '2026-04-23' },
    { id: 'w3', jobId: '2', hours: 2, date: '2026-04-22' }
  ],
  expenses: [
    { id: 'e1', description: 'Groceries', category: 'Food', amount: 68.90, date: '2026-04-24' },
    { id: 'e2', description: 'Gas', category: 'Transportation', amount: 35.00, date: '2026-04-23' },
    { id: 'e3', description: 'Internet Bill', category: 'Utilities', amount: 14.50, date: '2026-04-22' }
  ]
};

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FinanceState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_STATE;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addJob = (name: string, hourlyRate: number) => {
    setState(prev => ({
      ...prev,
      jobs: [...prev.jobs, {
        id: generateId(),
        name,
        hourlyRate
      }]
    }));
  };

  const removeJob = (jobId: string) => {
    setState(prev => ({
      ...prev,
      jobs: prev.jobs.filter(j => j.id !== jobId),
      workLogs: prev.workLogs.filter(w => w.jobId !== jobId)
    }));
  };

  const addWorkLog = (jobId: string, hours: number, date: string) => {
    setState(prev => ({
      ...prev,
      workLogs: [...prev.workLogs, {
        id: generateId(),
        jobId,
        hours,
        date
      }]
    }));
  };

  const addExpense = (description: string, category: string, amount: number, date: string) => {
    setState(prev => ({
      ...prev,
      expenses: [...prev.expenses, {
        id: generateId(),
        description,
        category,
        amount,
        date
      }]
    }));
  };

  const getTotalIncome = (): number => {
    return state.workLogs.reduce((total, log) => {
      const job = state.jobs.find(j => j.id === log.jobId);
      return total + (job ? log.hours * job.hourlyRate : 0);
    }, 0);
  };

  const getTotalExpenses = (): number => {
    return state.expenses.reduce((total, exp) => total + exp.amount, 0);
  };

  const getCurrentBalance = (): number => {
    return state.startingBalance + getTotalIncome() - getTotalExpenses();
  };

  const getActivities = (): Activity[] => {
    const activities: Activity[] = [];

    // Add income activities
    state.workLogs.forEach(log => {
      const job = state.jobs.find(j => j.id === log.jobId);
      if (job) {
        const income = log.hours * job.hourlyRate;
        activities.push({
          id: `income-${log.id}`,
          type: 'income',
          description: `Worked ${log.hours} hours at ${job.name}`,
          amount: income,
          date: log.date,
          balanceAfter: 0 // Will be calculated below
        });
      }
    });

    // Add expense activities
    state.expenses.forEach(expense => {
      activities.push({
        id: `expense-${expense.id}`,
        type: 'expense',
        description: `${expense.description} (${expense.category})`,
        amount: expense.amount,
        date: expense.date,
        balanceAfter: 0 // Will be calculated below
      });
    });

    // Sort by date (newest first)
    activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Calculate running balances
    let runningBalance = state.startingBalance;
    const sortedByDateOldest = [...activities].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const balanceMap = new Map<string, number>();
    sortedByDateOldest.forEach(activity => {
      if (activity.type === 'income') {
        runningBalance += activity.amount;
      } else {
        runningBalance -= activity.amount;
      }
      balanceMap.set(activity.id, runningBalance);
    });

    // Apply calculated balances
    activities.forEach(activity => {
      activity.balanceAfter = balanceMap.get(activity.id) || state.startingBalance;
    });

    return activities;
  };

  return (
    <FinanceContext.Provider
      value={{
        state,
        addJob,
        removeJob,
        addWorkLog,
        addExpense,
        getTotalIncome,
        getTotalExpenses,
        getCurrentBalance,
        getActivities
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance(): FinanceContextType {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider');
  }
  return context;
}
