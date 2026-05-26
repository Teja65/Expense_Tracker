type Props = {
  search: string;

  setSearch: (value: string) => void;

  category: string;

  setCategory: (value: string) => void;

  sort: string;

  setSort: (value: string) => void;
};

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
      <input
        type='text'
        placeholder='Search expenses'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='rounded-2xl border border-zinc-300 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950'
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className='rounded-2xl border border-zinc-300 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950'
      >
        <option value=''>All Categories</option>

        <option value='Food'>Food</option>

        <option value='Travel'>Travel</option>

        <option value='Shopping'>Shopping</option>

        <option value='Bills'>Bills</option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className='rounded-2xl border border-zinc-300 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950'
      >
        <option value='latest'>Latest</option>

        <option value='oldest'>Oldest</option>

        <option value='asc'>Amount Asc</option>

        <option value='desc'>Amount Desc</option>
      </select>
    </div>
  );
}
