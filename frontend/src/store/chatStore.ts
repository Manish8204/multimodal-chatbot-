import create from 'zustand';

interface ChatStore {
  sessionId: string;
  messages: any[];
  loading: boolean;
  error: string | null;
  initSession: () => void;
  addMessage: (msg: any) => void;
  setLoading: (l: boolean) => void;
  setError: (e: string | null) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  sessionId: '',
  messages: [],
  loading: false,
  error: null,
  
  initSession: () => {
    const sid = localStorage.getItem('chatbot_sid') || `session_${Date.now()}`;
    localStorage.setItem('chatbot_sid', sid);
    set({ sessionId: sid });
  },
  
  addMessage: (msg) => set((state) => ({ 
    messages: [...state.messages, msg],
    error: null 
  })),
  
  setLoading: (l) => set({ loading: l }),
  setError: (e) => set({ error: e }),
  clearChat: () => {
    localStorage.removeItem('chatbot_sid');
    set({ sessionId: '', messages: [], error: null });
  }
}));
