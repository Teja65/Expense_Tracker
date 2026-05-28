import type { LucideIcon } from 'lucide-react';

import { Heading2, Paragraph } from '../ui/Text';

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className='animate-rise rounded-3xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-zinc-900'>
      <Icon className='text-emerald-600' />

      <Heading2 className='mt-5 text-2xl font-bold'>{title}</Heading2>

      <Paragraph className='mt-3 text-zinc-500'>{description}</Paragraph>
    </div>
  );
}
