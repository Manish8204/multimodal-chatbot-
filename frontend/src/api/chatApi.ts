import axios from 'axios';
import { MessageRequest } from '../types';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000'
});

export const sendMessage = async (payload: MessageRequest) => {
  const res = await API.post('/api/chat/message', payload);
  return res.data;
};

export const getChatHistory = async (sessionId: string) => {
  const res = await API.get(`/api/chat/history/${sessionId}`);
  return res.data;
};

export const createNewSession = async () => {
  const res = await API.post('/api/chat/new-session');
  return res.data;
};

export const healthCheck = async () => {
  const res = await API.get('/health');
  return res.data;
};
