import { type SelectHTMLAttributes } from 'react';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ className = '', ...props }: SelectProps) {
  return (
    <select
      className={`w-full rounded-2xl border border-zinc-300 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950 ${className}`}
      {...props}
    />
  );
}
