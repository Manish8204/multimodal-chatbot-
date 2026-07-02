import React, {useRef, useEffect} from 'react';
import {useChatStore} from '../store/chatStore';
import './ChatWindow.css';
const ChatWindow: React.FC = () => {const {messages, loading, error} = useChatStore(); const ref = useRef<HTMLDivElement>(null); useEffect(() => {ref.current?.scrollIntoView();}, [messages, loading]); return (<div className="chat-window">{messages.length === 0 ? <div className="empty">Start chatting...</div> : messages.map((m, i) => (<div key={i} className={`msg msg-${m.role}`}>{m.imageUrl && <img src={m.imageUrl} alt="uploaded" className="msg-image"/>}<p>{m.content}</p></div>))}{loading && (<div className="msg msg-assistant"><div className="typing"><span></span><span></span><span></span></div></div>)}{error && (<div className="msg msg-error"><p>{error}</p></div>)}<div ref={ref}/></div>);};
export default ChatWindow;
