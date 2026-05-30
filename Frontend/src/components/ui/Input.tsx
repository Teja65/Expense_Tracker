import { forwardRef, type InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full rounded-2xl border border-zinc-300 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950 ${className}`}
      {...props}
    />
  ),
);

Input.displayName = 'Input';

export default Input;
