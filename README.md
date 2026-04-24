# The Advantage

**The Advantage** is a personal finance platform designed to help users track, understand, and grow their money over time. It focuses on honesty, clarity, and long‑term improvement rather than just short‑term budgeting.

Built for students and first‑time earners, The Advantage turns daily money decisions into measurable growth across weekly, monthly, and yearly timelines.

---

## 🚀 What The Advantage Does

### 📊 Dashboard
- Current balance, starting balance, and ending balance
- Growth percentage vs previous periods
- Progress bars and visual comparisons
- Monthly summaries and future projections

### 💼 Income & Jobs
- Add multiple jobs with hourly pay
- Log hours worked per day
- Automatic income calculation
- Track other income sources (cash jobs, bonuses, interest)

### 💸 Expenses
- Log expenses with date and category
- Track cash vs card spending
- View totals daily, weekly, monthly, and yearly

### 💰 Savings
- Optional savings account tracking
- Daily interest calculation
- Monthly and yearly savings growth
- Transfers between balance and savings

### 🏆 Leaderboards
- Friendly competition with friends, school, or globally
- Ranked by growth, savings rate, and consistency
- Designed for learning—not pressure

### 👤 Profiles
- Username + password login (no email required)
- Customizable profiles (avatar, bio, school)
- All data securely tied to each account

---

## 🧠 Core Philosophy

> **Honesty creates the advantage.**

Accurate data leads to better insights, smarter decisions, and real growth.  
The Advantage encourages truthful tracking because this account exists for *your* benefit.

---

## 🎨 Color Scheme & UI Design

The Advantage uses a **dark‑mode‑first design** for focus, clarity, and long‑term usability.

### Color Palette

| Purpose            | Color |
|--------------------|-------|
| Main Background     | `#0f0f0f` |
| Cards / Panels      | `#171717` |
| Borders             | `#262626` |
| Primary Green       | `#22c55e` |
| Green Hover         | `#16a34a` |
| Text (primary)      | `#e5e7eb` |
| Text (muted)        | `#9ca3af` |
| Negative / Expense  | `#ef4444` |

Green is used intentionally for:
- Growth
- Gains
- Primary actions
- Progress indicators

---

## 🧩 Global CSS (Dark Mode + Green Theme)

```css
:root {
  --bg-main: #0f0f0f;
  --bg-card: #171717;
  --border: #262626;

  --green: #22c55e;
  --green-dark: #16a34a;
  --red: #ef4444;
  --yellow: #facc15;

  --text-main: #e5e7eb;
  --text-muted: #9ca3af;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: var(--bg-main);
  color: var(--text-main);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
