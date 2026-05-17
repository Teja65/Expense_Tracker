export type User = {
  uid: string;

  email: string;

  name: string;

  picture?: string;
};

export type AuthState = {
  user: User | null;

  loading: boolean;

  initialized: boolean;
};
