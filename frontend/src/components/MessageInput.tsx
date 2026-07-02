import React, { useState, useRef } from 'react';
import { useChatStore } from '../store/chatStore';
import { sendMessage } from '../api/chatApi';
import './MessageInput.css';

const MessageInput: React.FC = () => {
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { sessionId, addMessage, setLoading, setError } = useChatStore();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const messageText = input;
    const messageImage = image;

    setLoading(true);
    setError(null);

    addMessage({
      role: 'user',
      content: messageText,
      imageUrl: messageImage || undefined,
      timestamp: new Date()
    });

    setInput('');
    setImage(null);

    try {
      const response = await sendMessage({
        message: messageText,
        session_id: sessionId,
        image_url: messageImage || undefined
      });

      addMessage({
        role: 'assistant',
        content: response.content,
        timestamp: new Date(response.created_at)
      });
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || err.message || 'Failed to get response. Check if backend is running.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="input-container">
      {image && (
        <div className="image-preview">
          <img src={image} alt="preview" />
          <button
            className="remove-image"
            onClick={() => setImage(null)}
            type="button"
          >
            ✕
          </button>
        </div>
      )}
      <div className="input-group">
        <button
          onClick={() => fileRef.current?.click()}
          className="image-button"
          type="button"
          title="Upload image"
        >
          📷
        </button>
        <input
          type="file"
          ref={fileRef}
          onChange={handleImageSelect}
          accept="image/*"
          hidden
        />
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message... (Shift+Enter for new line)"
          className="input-field"
          rows={3}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="send-button"
          type="button"
          title="Send message"
        >
          ⤴
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
