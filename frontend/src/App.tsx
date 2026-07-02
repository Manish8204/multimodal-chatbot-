import React from 'react';
import {useChatStore} from './store/chatStore';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import './App.css';
const App: React.FC = () => {const initSession = useChatStore((s) => s.initSession); React.useEffect(() => initSession(), [initSession]); return (<div className="app"><header className="header"><h1>Multimodal Chatbot</h1><p>Text & Image</p></header><ChatWindow/><MessageInput/></div>);};
export default App;
