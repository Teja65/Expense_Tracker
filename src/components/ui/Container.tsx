import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className='mx-auto max-w-7xl px-6 py-6 sm:px-8'>{children}</div>;
}
