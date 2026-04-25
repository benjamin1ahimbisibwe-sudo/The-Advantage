import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Modal } from './Modal';

const EXPENSE_CATEGORIES = [
  'Food',
  'Transportation',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Other'
];

interface ExpenseModalProps {
  onClose: () => void;
}

export function ExpenseModal({ onClose }: ExpenseModalProps) {
  const { addExpense } = useFinance();
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description && amount && parseFloat(amount) > 0) {
      addExpense(description, category, parseFloat(amount), date);
      onClose();
    }
  };

  return (
    <Modal title="Add Expense" onClose={onClose}>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label className="form__label">Description</label>
          <input
            className="form__input"
            type="text"
            placeholder="e.g. Groceries, Gas, Internet"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form__group">
          <label className="form__label">Category</label>
          <select
            className="form__input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {EXPENSE_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="form__group">
          <label className="form__label">Amount</label>
          <input
            className="form__input"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form__group">
          <label className="form__label">Date</label>
          <input
            className="form__input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form__actions">
          <button type="button" className="form__button form__button--cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="form__button form__button--primary">
            Add Expense
          </button>
        </div>
      </form>
    </Modal>
  );
}
