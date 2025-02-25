from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from langchain_google_genai import ChatGoogleGenerativeAI
import os
from dotenv import load_dotenv
import json
import numpy as np
import sympy as sp

# Initialize FastAPI app
app = FastAPI()

# Enable CORS (Allow frontend to connect)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load environment variables
load_dotenv()
api_key = os.getenv("API_KEY")
os.environ["GOOGLE_API_KEY"] = api_key

# Load Gemini AI model
llm = ChatGoogleGenerativeAI(model="gemini-pro")

# Store chat history
chat_history = []

# Request body model
class ProblemRequest(BaseModel):
    problem: str


# ✅ Function to Generate Graph Data
def generate_graph(equation_str):
    try:
        x = sp.symbols('x')  # Define the variable
        expression = sp.sympify(equation_str)  # Convert string to symbolic expression

        # Handle log(x) to avoid math errors
        if "log" in equation_str or "ln" in equation_str:
            x_values = np.linspace(0.1, 10, 100)  # Avoid negative values
        else:
            x_values = np.linspace(-10, 10, 100)

        y_values = [float(expression.subs(x, val)) for val in x_values]  # Compute y values

        graph_data = [{"x": float(x), "y": y} for x, y in zip(x_values, y_values)]
        return graph_data

    except Exception as e:
        return {"error": str(e)}


# ✅ AI Prompt to Solve Question & Extract Equation
def solve_problem_and_identify_equation(question):
    global chat_history
    print(chat_history)

    # Create conversation history
    history_text = "\n".join([f"User: {h['user']}\nAI: {h['ai']}" for h in chat_history])

    # AI prompt with JSON structure
    full_prompt = f"""{history_text}
    User: {question}
    AI: Please provide a detailed step-by-step explanation in JSON format like this:

    {{
        "steps": [
            "Step 1: Explain the concept involved.",
            "Step 2: Break down the first part of the solution.",
            "Step 3: Continue solving the problem step by step.",
            "Final Answer: Provide the final answer here."
        ],
        "equation": "Extract the main equation from the problem here."
    }}

    Ensure that the response is a valid JSON object.
    """
    print(full_prompt)
    try:
        response = llm.invoke(full_prompt)
        print(response)

        if not response or not hasattr(response, "content") or not response.content.strip():
            return {"error": "Sorry, I couldn't generate a response. Try rephrasing the question."}

        ai_response = response.content.strip()

        # Validate JSON response
        try:
            structured_response = json.loads(ai_response)
        except json.JSONDecodeError:
            return {"error": "AI response is not in valid JSON format. Try asking again."}

        # Append to chat history
        chat_history.append({"user": question, "ai": structured_response})

        return structured_response

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}


# ✅ Single Route for Solving + Graph Data
@app.post("/solve")
def solve_and_generate_graph(request: ProblemRequest):
    if not request.problem:
        raise HTTPException(status_code=400, detail="Problem cannot be empty")

    # 1️⃣ Ask AI to solve and extract the equation
    ai_response = solve_problem_and_identify_equation(request.problem)

    # 2️⃣ Extract the equation from AI response
    equation_str = ai_response.get("equation")

    if not equation_str or equation_str.strip() == "":
        return {"error": "AI could not extract the equation from the problem."}

    # 3️⃣ Generate graph data from the extracted equation
    graph_data = generate_graph(equation_str)

    # 4️⃣ Return both the AI solution and the graph data
    return {
        "solution": ai_response["steps"],
        "equation": equation_str,
        "graph_data": graph_data
    }


# ✅ Home Route for Testing
@app.get("/")
def home():
    return {"message": "FastAPI is working!"}


# Run the FastAPI server using: `uvicorn app:app --reload`