import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../utils/formatting';

export function BalanceDisplay() {
  const { getCurrentBalance, getTotalIncome, getTotalExpenses } = useFinance();

  const balance = getCurrentBalance();
  const income = getTotalIncome();
  const expenses = getTotalExpenses();

  return (
    <div className="section">
      <div className="section__header">
        <span className="section__label">Current Balance</span>
      </div>
      <div className="balance-display">
        <div className="balance-display__primary">
          <span className="balance-display__amount">{formatCurrency(balance)}</span>
        </div>
        <div className="balance-display__stats">
          <div className="stat-item">
            <span className="stat-item__label">INCOME</span>
            <span className="stat-item__value stat-item__value--positive">
              +{formatCurrency(income)}
            </span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-item__label">EXPENSES</span>
            <span className="stat-item__value stat-item__value--negative">
              −{formatCurrency(expenses)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
