import type { FormHTMLAttributes } from 'react';

type FormProps = FormHTMLAttributes<HTMLFormElement>;

export default function Form({ className = '', ...props }: FormProps) {
  return <form className={className} {...props} />;
}
