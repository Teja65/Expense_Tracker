import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-cyan-500 text-slate-950 hover:bg-cyan-400',
  secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700',
  ghost:
    'bg-transparent border border-slate-700 text-slate-100 hover:bg-slate-900/60',
};

export default function Button({
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      type={props.type ?? 'button'}
      className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
}
