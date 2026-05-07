import { useState, useEffect } from 'react';
import { useAppSelector } from '../app/hooks';
import Container from '../components/ui/Container';
import ExpenseForm from '../features/expenses/ExpenseForm';
import ExpensesList from '../features/expenses/ExpensesList';
import {
  saveExpensesToStorage,
  exportExpensesAsJSON,
} from '../utils/expenseStorage';

type FilterType = 'all' | 'daily' | 'monthly' | 'yearly' | 'lastYear';

export default function DashboardPage() {
  const userName = useAppSelector((state) => state.auth.user?.displayName);
  const expenses = useAppSelector((state) => state.expenses.expenses);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    if (expenses.length > 0) {
      saveExpensesToStorage(expenses);
    }
  }, [expenses]);

  const filterExpenses = (expenses: any[], filterType: FilterType) => {
    const now = new Date();

    switch (filterType) {
      case 'daily':
        return expenses.filter((expense) => {
          const expenseDate = new Date(expense.date);
          return expenseDate.toDateString() === now.toDateString();
        });
      case 'monthly':
        return expenses.filter((expense) => {
          const expenseDate = new Date(expense.date);
          return (
            expenseDate.getMonth() === now.getMonth() &&
            expenseDate.getFullYear() === now.getFullYear()
          );
        });
      case 'yearly':
        return expenses.filter((expense) => {
          const expenseDate = new Date(expense.date);
          return expenseDate.getFullYear() === now.getFullYear();
        });
      case 'lastYear':
        return expenses.filter((expense) => {
          const expenseDate = new Date(expense.date);
          return expenseDate.getFullYear() === now.getFullYear() - 1;
        });
      default:
        return expenses;
    }
  };

  const filteredExpenses = filterExpenses(expenses, currentFilter);

  const getFilterTitle = (filterType: FilterType) => {
    switch (filterType) {
      case 'daily':
        return "Today's";
      case 'monthly':
        return "This Month's";
      case 'yearly':
        return "This Year's";
      case 'lastYear':
        return "Last Year's";
      default:
        return 'Total';
    }
  };

  return (
    <main className='min-h-screen bg-slate-950 text-slate-100'>
      <Container>
        <section className='py-16'>
          <div className='space-y-8'>
            <div className='rounded-[2rem] border border-slate-800 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/40'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm uppercase tracking-[0.24em] text-cyan-300'>
                    Dashboard
                  </p>
                  <h1 className='mt-4 text-4xl font-semibold'>
                    Welcome back{userName ? `, ${userName}` : ''}.
                  </h1>
                </div>
                {expenses.length > 0 && (
                  <button
                    onClick={() =>
                      exportExpensesAsJSON(expenses, userName || 'user')
                    }
                    className='px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors text-sm font-medium'
                    title='Export expenses as JSON'
                  >
                    Export Data
                  </button>
                )}
              </div>
            </div>

            <div className='grid gap-8 lg:grid-cols-[1fr_400px]'>
              {/* Expense Form */}
              <div className='space-y-6'>
                <div>
                  <h2 className='text-2xl font-semibold text-white'>
                    Add New Expense
                  </h2>
                  <p className='mt-2 text-slate-400'>
                    Record your spending to keep track of your budget.
                  </p>
                </div>
                <ExpenseForm />
              </div>

              {/* Summary Cards */}
              <div className='space-y-6'>
                <div>
                  <h2 className='text-2xl font-semibold text-white'>Summary</h2>
                  <p className='mt-2 text-slate-400'>Your spending overview.</p>
                </div>

                <div className='grid gap-6'>
                  <article className='rounded-3xl bg-slate-950/80 p-6 border border-slate-800'>
                    <h3 className='text-xl font-semibold text-white'>
                      {getFilterTitle(currentFilter)} Expenses
                    </h3>
                    <p className='mt-3 text-3xl font-bold text-cyan-400'>
                      $
                      {filteredExpenses
                        .reduce((total, expense) => total + expense.amount, 0)
                        .toFixed(2)}
                    </p>
                    <p className='mt-2 text-slate-400'>
                      {filteredExpenses.length} transaction
                      {filteredExpenses.length !== 1 ? 's' : ''}
                    </p>
                  </article>

                  <article className='rounded-3xl bg-slate-950/80 p-6 border border-slate-800'>
                    <h3 className='text-xl font-semibold text-white'>
                      Average per Transaction
                    </h3>
                    <p className='mt-3 text-3xl font-bold text-cyan-400'>
                      $
                      {filteredExpenses.length > 0
                        ? (
                            filteredExpenses.reduce(
                              (total, expense) => total + expense.amount,
                              0,
                            ) / filteredExpenses.length
                          ).toFixed(2)
                        : '0.00'}
                    </p>
                    <p className='mt-2 text-slate-400'>
                      Based on {getFilterTitle(currentFilter).toLowerCase()}{' '}
                      transactions
                    </p>
                  </article>
                </div>
              </div>
            </div>

            {/* Expenses List */}
            <div className='mt-8'>
              <ExpensesList
                currentFilter={currentFilter}
                onFilterChange={setCurrentFilter}
              />
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
