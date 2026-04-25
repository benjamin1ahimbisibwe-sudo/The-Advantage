import { Navbar as NavbarStyled } from './Navbar.styles';

interface NavbarProps {
  onAddIncome: () => void;
  onAddExpense: () => void;
}

export function Navbar({ onAddIncome, onAddExpense }: NavbarProps) {
  return (
    <NavbarStyled>
      <div className="navbar__content">
        <div className="navbar__brand">
          <h1>The Advantage</h1>
        </div>
        <div className="navbar__actions">
          <button className="navbar__button" onClick={onAddIncome}>
            Log Work
          </button>
          <button className="navbar__button navbar__button--secondary" onClick={onAddExpense}>
            Add Expense
          </button>
        </div>
      </div>
    </NavbarStyled>
  );
}
