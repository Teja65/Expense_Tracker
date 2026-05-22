import axios from '../../services/axios';

export const loginUser = async (token: string) => {
  const response = await axios.post('/auth/login', { token });

  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post('/auth/logout');

  return response.data;
};

export const checkAuthEmail = async (email: string) => {
  const response = await axios.get('/auth/check-email', {
    params: {
      email,
    },
  });

  return response.data as {
    exists: boolean;
    provider: 'password' | 'google' | null;
    providers: string[];
  };
};

export const getProfile = async () => {
  const response = await axios.get('/auth/me');

  return response.data;
};
