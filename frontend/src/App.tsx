import React from 'react';
import { useChatStore } from './store/chatStore';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import './App.css';

const App: React.FC = () => {
  const initSession = useChatStore((state) => state.initSession);

  React.useEffect(() => {
    initSession();
  }, [initSession]);

  return (
    <div className="app">
      <header className="header">
        <h1>🤖 Multimodal Chatbot</h1>
        <p>Chat with AI - Text & Image Support</p>
      </header>
      <ChatWindow />
      <MessageInput />
    </div>
  );
};

export default App;
