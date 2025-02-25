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

# Request body model
class ProblemRequest(BaseModel):
    problem: str


# ✅ Function to Extract Only the Equation
def extract_equation_and_graph(question):
    """
    Uses Gemini AI to extract the main equation and generate graph data.
    """
    prompt = f"""
    Extract the main equation from this math problem and generate graph data.

    Problem: "{question}"

    - Do NOT include explanations or extra text.
    - Return ONLY a JSON object like this:

    {{
        "equation": "x^2 + 2x + 1",
        "graph_data": [
            {{"x": -5, "y": 25}},
            {{"x": -4, "y": 16}},
            {{"x": -3, "y": 9}},
            {{"x": -2, "y": 4}},
            {{"x": -1, "y": 1}},
            {{"x": 0, "y": 0}},
            {{"x": 1, "y": 1}},
            {{"x": 2, "y": 4}},
            {{"x": 3, "y": 9}},
            {{"x": 4, "y": 16}},
            {{"x": 5, "y": 25}}
        ]
    }}

    If there's no valid equation, return:

    {{
        "equation": "",
        "graph_data": []
    }}
    """

    try:
        response = llm.invoke(prompt)
        ai_response = response.content.strip()

        print("🔍 Raw AI Response:", ai_response)  # Debugging

        # Ensure AI response is valid JSON
        try:
            structured_response = json.loads(ai_response)
        except json.JSONDecodeError:
            print("⚠️ AI returned invalid JSON!")
            return None  # Handle JSON format error

        equation = structured_response.get("equation", "").strip()
        graph_data = structured_response.get("graph_data", [])

        if not equation:
            print("⚠️ No equation detected!")
            return None  # Handle empty equation case

        return {"equation": equation, "graph_data": graph_data}

    except Exception as e:
        print(f"❌ Error in extract_equation_and_graph(): {str(e)}")
        return None  # Handle API errors

# ✅ Function to Get AI Solution Steps
def solve_problem(question):
    """
    Uses Gemini AI to generate a step-by-step solution.
    """
    prompt = f"""
    Solve the following math problem with a step-by-step explanation:

    {question}

    Provide the response in a valid JSON format:
    {{
        "steps": [
            "Step 1: Explain the concept.",
            "Step 2: Apply relevant formulas.",
            "Step 3: Solve step by step.",
            "Final Answer: Provide the final answer here."
        ]
    }}
    """

    try:
        response = llm.invoke(prompt)
        ai_response = response.content.strip()

        # Validate JSON response
        try:
            structured_response = json.loads(ai_response)
            return structured_response.get("steps", [])
        except json.JSONDecodeError:
            return ["Error: AI response not in JSON format."]  # Handle invalid JSON

    except Exception as e:
        return [f"Error: {str(e)}"]  # Handle API failures


# ✅ Function to Generate Graph Data in JavaScript Format

# ✅ API Route: Solve Problem + Generate Graph
@app.post("/solve")
def solve_and_generate_graph(request: ProblemRequest):
    if not request.problem:
        raise HTTPException(status_code=400, detail="Problem cannot be empty")

    # 1️⃣ Extract the equation from AI
    equation_str = extract_equation_and_graph(request.problem)

    if not equation_str:
        return {"error": "AI could not extract the equation from the problem."}

    # 2️⃣ Get AI Solution Steps
    solution_steps = solve_problem(request.problem)

    # 3️⃣ Generate Graph Data
    graph_data = extract_equation_and_graph(equation_str)

    # 4️⃣ Return JSON Response
    return {
        "solution": solution_steps,
        "equation": equation_str,
        "graph_data": graph_data
    }


# ✅ Home Route for Testing
@app.get("/")
def home():
    return {"message": "FastAPI is working!"}


# Run the FastAPI server using: `uvicorn app:app --reload`