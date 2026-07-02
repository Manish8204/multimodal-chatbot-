export interface Message {
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
  timestamp?: Date;
}

export interface MessageRequest {
  message: string;
  session_id?: string;
  image_url?: string;
}

export interface MessageResponse {
  role: string;
  content: string;
  image_url?: string;
  created_at: string;
}
