export type User = {
  uid: string;

  email: string;

  name: string;

  picture?: string;
};

export type LoginPayload = {
  email: string;

  password: string;
};

export type SignupPayload = {
  email: string;

  password: string;
};

export type AuthResponse = {
  success: boolean;

  user: User;
};

export type AuthState = {
  user: User | null;

  loading: boolean;

  initialized: boolean;
};
