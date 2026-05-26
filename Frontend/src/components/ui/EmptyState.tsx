type Props = {
  title: string;

  description: string;
};

export default function EmptyState({ title, description }: Props) {
  return (
    <div className='rounded-3xl bg-white p-10 text-center shadow-xl dark:bg-zinc-900'>
      <h2 className='text-2xl font-black'>{title}</h2>

      <p className='mt-3 text-zinc-500'>{description}</p>
    </div>
  );
}
