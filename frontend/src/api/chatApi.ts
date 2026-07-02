import axios from 'axios';
const API = axios.create({baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000'});
export const sendMessage = async (payload: any) => {const res = await API.post('/api/chat/message', payload); return res.data;};
export const getChatHistory = async (sessionId: string) => {const res = await API.get(`/api/chat/history/${sessionId}`); return res.data;};
