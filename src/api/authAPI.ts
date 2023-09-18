import type { User } from '@/models';

const FAKE_USER: User = {
  username: "admin",
  password: "password123",
};

export const authenticate = (username: string, password: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (username === FAKE_USER.username && password === FAKE_USER.password) {
      resolve(true);
    } else {
      reject(new Error("Invalid username or password"));
    }
  });
};

export const logout = (): void => {
  localStorage.removeItem('isAuthenticated');
};

