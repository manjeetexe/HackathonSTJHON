from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
api_key = os.getenv("API_KEY")
os.environ["GOOGLE_API_KEY"] = api_key

# Initialize FastAPI app
app = FastAPI()

# Load the Gemini model
llm = ChatGoogleGenerativeAI(model="gemini-pro")

# Store chat history
chat_history = []

class ProblemRequest(BaseModel):
    problem: str

# Function to solve problem with chat history
def solve_problem(question):
    """Handles chat with memory using structured history."""
    global chat_history

    # Format chat history
    history_text = "\n".join([f"User: {h['user']}\nAI: {h['ai']}" for h in chat_history])
    full_prompt = f"{history_text}\nUser: {question}\nAI:"

    # Get AI response
    response = llm.invoke(full_prompt)
    ai_response = response.content if hasattr(response, "content") else str(response)

    # Append to chat history
    chat_history.append({"user": question, "ai": ai_response})

    return ai_response


@app.get("/")
def home():
    return {"message": "Hello, FastAPI is working!"}

@app.post("/solve")
def solve_math_physics_problem(request: ProblemRequest):
    if not request.problem:
        raise HTTPException(status_code=400, detail="Problem cannot be empty")
    
    solution = solve_problem(request.problem)
    return {"solution": solution}