export const getCurrentMonth = () => {
  return new Date().toLocaleString('default', {
    month: 'long',
  });
};

export const getCurrentYear = () => {
  return new Date().getFullYear();
};

export const isThisMonth = (date: string) => {
  const currentDate = new Date();

  const targetDate = new Date(date);

  return (
    currentDate.getMonth() === targetDate.getMonth() &&
    currentDate.getFullYear() === targetDate.getFullYear()
  );
};

export const isThisYear = (date: string) => {
  return new Date(date).getFullYear() === new Date().getFullYear();
};

export const sortByLatest = <T extends { date: string }>(items: T[]) => {
  return [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

export const sortByOldest = <T extends { date: string }>(items: T[]) => {
  return [...items].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
};
