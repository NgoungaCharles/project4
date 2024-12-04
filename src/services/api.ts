import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

export async function login(username: string, password: string) {
  const { data } = await api.post('/auth/login', { username, password });
  const token = data.token;
  localStorage.setItem('token', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return data;
}

export async function logout() {
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
}

export async function executeQuery(input: string) {
  const { data } = await api.post('/query', { input });
  return data;
}

export async function getSuggestions(input: string) {
  const { data } = await api.get('/query/suggestions', { params: { input } });
  return data;
}