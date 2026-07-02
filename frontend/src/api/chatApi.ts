import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const API = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const sendMessage = async (payload: any) => {
  try {
    const res = await API.post('/api/chat/message', payload);
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

export const getChatHistory = async (sessionId: string) => {
  try {
    const res = await API.get(`/api/chat/history/${sessionId}`);
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

export const createNewSession = async () => {
  try {
    const res = await API.post('/api/chat/new-session');
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

export const healthCheck = async () => {
  try {
    const res = await API.get('/health');
    return res.data;
  } catch (error: any) {
    throw error;
  }
};
