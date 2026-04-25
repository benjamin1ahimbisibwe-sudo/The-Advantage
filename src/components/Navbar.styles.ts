import styled from '@emotion/styled';

export const Navbar = styled.nav`
  background-color: var(--surface-secondary);
  border-bottom: 1px solid var(--border-color);
  padding: 0 var(--spacing-lg);
  position: sticky;
  top: 0;
  z-index: 100;

  .navbar__content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md) 0;
  }

  .navbar__brand {
    h1 {
      font-size: var(--font-size-lg);
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
      letter-spacing: -0.5px;
    }
  }

  .navbar__actions {
    display: flex;
    gap: var(--spacing-md);
  }

  .navbar__button {
    background-color: var(--accent-green);
    color: var(--surface-primary);
    border: none;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: 4px;
    font-size: var(--font-size-sm);
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #45a366;
    }
  }

  .navbar__button--secondary {
    background-color: var(--border-color);
    color: var(--text-secondary);

    &:hover {
      background-color: var(--text-tertiary);
    }
  }
`;
