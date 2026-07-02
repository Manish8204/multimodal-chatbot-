import openai
import os
from typing import Optional

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY not set")

client = openai.OpenAI(api_key=api_key)

async def process_message(message: str, image_url: Optional[str] = None, session_id: Optional[str] = None) -> str:
    content = [{"type": "text", "text": message}]
    if image_url:
        content.append({"type": "image_url", "image_url": {"url": image_url}})
    try:
        response = client.chat.completions.create(model="gpt-4-vision-preview", messages=[{"role": "user", "content": content}], max_tokens=1024)
        return response.choices[0].message.content
    except Exception as e:
        if "gpt-4-vision" in str(e):
            response = client.chat.completions.create(model="gpt-4-turbo", messages=[{"role": "user", "content": content}], max_tokens=1024)
            return response.choices[0].message.content
        raise e
