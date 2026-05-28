import { Link, type LinkProps } from 'react-router-dom';

export default function AppLink({ className = '', ...props }: LinkProps) {
  return <Link className={`transition ${className}`} {...props} />;
}
