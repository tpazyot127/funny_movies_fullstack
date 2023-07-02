import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://funny-movies-fullstack-backend.vercel.app',
});
