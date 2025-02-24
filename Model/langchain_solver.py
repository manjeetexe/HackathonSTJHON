from fastapi import FastAPI
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv("/Users/manjeet/Desktop/HackathonSTJHON/.env")

api_key = os.getenv("API_KEY")
os.environ["GOOGLE_API_KEY"] = api_key

# Initialize the AI model
llm = ChatGoogleGenerativeAI(model="gemini-pro")

# FastAPI App
app = FastAPI()

# Chat history storage
chat_history = []

# Request body schema
class QueryRequest(BaseModel):
    question: str

# Format chat history
def get_prompt(question, history):
    history_text = "\n".join([f"User: {h['user']}\nAI: {h['ai']}" for h in history])
    return f"{history_text}\nUser: {question}\nAI:"

# Endpoint to process user query
@app.post("/ask")
async def ask_question(request: QueryRequest):
    global chat_history
    full_prompt = get_prompt(request.question, chat_history)
    response = llm.invoke(full_prompt)
    
    ai_response = response.content if hasattr(response, "content") else str(response)
    chat_history.append({"user": request.question, "ai": ai_response})
    
    return {"answer": ai_response}

# Run the FastAPI server with:
# uvicorn app:app --host 0.0.0.0 --port 8000 --reload