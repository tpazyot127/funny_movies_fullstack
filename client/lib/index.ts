import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL === 'DEV' ? 'http://locahost:4000' : 'https://wandering-sky-219.fly.dev/'
});


