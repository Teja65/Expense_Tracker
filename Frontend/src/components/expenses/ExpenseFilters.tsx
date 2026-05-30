import { EXPENSE_CATEGORIES, SORT_OPTIONS } from '../../types/constants';
import en from '../../en.json';
import Input from '../ui/Input';
import Select from '../ui/Select';

type Props = {
  search: string;

  setSearch: (value: string) => void;

  category: string;

  setCategory: (value: string) => void;

  sort: string;

  setSort: (value: string) => void;
};

const filterText = en.expenses.filters;

export default function ExpenseFilters({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
}: Props) {
  return (
    <div className='grid gap-4 rounded-3xl bg-white p-6 shadow-xl dark:bg-zinc-900 md:grid-cols-3'>
      <Input
        type='text'
        placeholder={filterText.search}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value=''>{filterText.allCategories}</option>

        {EXPENSE_CATEGORIES.map((expenseCategory) => (
          <option key={expenseCategory} value={expenseCategory}>
            {expenseCategory}
          </option>
        ))}
      </Select>

      <Select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        {SORT_OPTIONS.map((sortOption) => (
          <option key={sortOption.value} value={sortOption.value}>
            {sortOption.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
