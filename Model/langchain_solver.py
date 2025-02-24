from langchain_core.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv("/Users/manjeet/Desktop/HackathonSTJHON/.env")

api_key = os.getenv("API_KEY")
os.environ["GOOGLE_API_KEY"] = api_key
llm = ChatGoogleGenerativeAI(model="gemini-pro")

# Initialize chat history as an empty list
chat_history = []

# Define a structured prompt that includes chat history
def get_prompt(question, history):
    """Formats chat history and the current question for continuity."""
    history_text = "\n".join([f"User: {h['user']}\nAI: {h['ai']}" for h in history])
    return f"{history_text}\nUser: {question}\nAI:"

# Function to solve a problem while remembering past interactions
def solve_problem(question):
    """Handles chat with memory using a structured history."""
    global chat_history

    # Format prompt with history
    full_prompt = get_prompt(question, chat_history)

    # Invoke LLM with history
    response = llm.invoke(full_prompt)

    # Extract response content
    ai_response = response.content if hasattr(response, "content") else str(response)

    # Append conversation to history
    chat_history.append({"user": question, "ai": ai_response})

    return ai_response

# Interactive Chat Loop
if __name__ == "__main__":
    print("Type 'exit' to end the chat.")
    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            break
        solution = solve_problem(user_input)
        print(f"AI: {solution}")

    # Print chat history at the end
    print("\n---- Chat History ----")
    for chat in chat_history:
        print(f"User: {chat['user']}\nAI: {chat['ai']}\n")