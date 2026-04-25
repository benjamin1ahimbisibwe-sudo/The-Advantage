import { FinanceProvider } from './context/FinanceContext';
import { Navbar } from './components/Navbar';
import { BalanceDisplay } from './components/BalanceDisplay';
import { ActivityFeed } from './components/ActivityFeed';
import { IncomeModal } from './components/IncomeModal';
import { ExpenseModal } from './components/ExpenseModal';
import { useState } from 'react';

function AppContent() {
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  return (
    <>
      <Navbar 
        onAddIncome={() => setShowIncomeModal(true)}
        onAddExpense={() => setShowExpenseModal(true)}
      />
      <main className="workspace">
        <BalanceDisplay />
        <ActivityFeed />
      </main>
      {showIncomeModal && <IncomeModal onClose={() => setShowIncomeModal(false)} />}
      {showExpenseModal && <ExpenseModal onClose={() => setShowExpenseModal(false)} />}
    </>
  );
}

export default function App() {
  return (
    <FinanceProvider>
      <AppContent />
    </FinanceProvider>
  );
}
