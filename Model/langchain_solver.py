from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from langchain_google_genai import ChatGoogleGenerativeAI
import os
from dotenv import load_dotenv
app = FastAPI()
import json

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],  # Restrict methods if needed
    allow_headers=["*"],  
)

# Load environment variables
load_dotenv()
api_key = os.getenv("API_KEY")
os.environ["GOOGLE_API_KEY"] = api_key

# Initialize FastAPI app


# Load the Gemini model
llm = ChatGoogleGenerativeAI(model="gemini-pro")

# Store chat history
chat_history = []

class ProblemRequest(BaseModel):
    problem: str


def solve_problem(question):
    global chat_history

    history_text = "\n".join([f"User: {h['user']}\nAI: {h['ai']}" for h in chat_history])
    
    full_prompt = f"""{history_text}
    User: {question}
     Please provide a detailed step-by-step explanation in JSON format like this:
    
    {{
        "step1": "Explain the concept involved.",
        "step2": "Break down the first part of the solution.",
        "step3": "Continue solving the problem step by step.",
        "final_answer": "Provide the final answer here."
    }}
    
    Ensure that the response is a valid JSON object.
    """

    print("Prompt:", full_prompt)

    try:
        response = llm.invoke(full_prompt)

        if not response or not hasattr(response, "content") or not response.content.strip():
            return {"error": "Sorry, I couldn't generate a response. Try rephrasing the question."}

        ai_response = response.content.strip()
        print(ai_response)

        # Ensure the response is valid JSON
        try:
            structured_response = json.loads(ai_response)
        except json.JSONDecodeError:
            return {"error": "AI response is not in valid JSON format. Try asking again."}

        # Append to chat history
        chat_history.append({"user": question, "ai": structured_response})

        return structured_response

    except Exception as e:
        print("Error calling Gemini API:", str(e))
        return {"error": "An error occurred while generating a response."}


@app.get("/")
def home():
    return {"message": "Hello, FastAPI is working!"}

@app.post("/solve")
def solve_math_physics_problem(request: ProblemRequest):
    if not request.problem:
        raise HTTPException(status_code=400, detail="Problem cannot be empty")
    
    solution = solve_problem(request.problem)
    return {"solution": solution}