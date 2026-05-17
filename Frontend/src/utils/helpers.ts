export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',

    currency: 'INR',
  }).format(amount);
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',

    month: 'short',

    day: 'numeric',
  });
};

export const generateId = () => {
  return crypto.randomUUID();
};

export const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
