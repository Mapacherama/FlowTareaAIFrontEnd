import { defineStore } from 'pinia';
import axios from 'axios';

interface AuthState {
  token: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state): boolean => !!state.token,
  },
  actions: {
    async login(username: string, password: string): Promise<void> {
      try {
        const response = await axios.post<{ access: string }>(
          'http://localhost:8000/api/token/',
          { username, password }
        );
        this.token = response.data.access;
        localStorage.setItem('token', this.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      } catch (error) {
        console.error('Login failed', error);
      }
    },
    logout(): void {
      this.token = null;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },
  },
});
