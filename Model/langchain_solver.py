from langchain_core.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
import google.generativeai as genai
import os

# Set API Key (replace with your actual API key)
os.environ["GOOGLE_API_KEY"] = "AIzaSyARVGWfgplQMxVb2Xp2gXwQ4s4ukjJHy-o"

# Initialize Gemini LLM using LangChain wrapper
llm = ChatGoogleGenerativeAI(model="gemini-pro")

# Define a structured prompt
prompt = PromptTemplate.from_template(
    "Solve this problem step by step and explain clearly:\n\n{question}"
)

# Chain LLM with the prompt
def solve_problem(question):
    """Takes a math/physics problem and returns a structured solution."""
    chain = prompt | llm  # Combine the prompt with the LLM
    response = chain.invoke({"question": question})

    # Extract only the content (clean output)
    return response.content if hasattr(response, "content") else str(response)

# Example usage
if __name__ == "__main__":
    problem = "A ball is thrown vertically upward with a velocity of 20 m/s. Find the time taken to reach the highest point."
    solution = solve_problem(problem)
    print(solution)