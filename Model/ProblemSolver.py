import google.generativeai as genai

# Configure API key (replace with your actual key)
genai.configure(api_key="AIzaSyARVGWfgplQMxVb2Xp2gXwQ4s4ukjJHy-o")

# Initialize the Gemini model
model = genai.GenerativeModel("gemini-pro")

def solve_problem(problem):
    """Generate a step-by-step solution for a given problem."""
    response = model.generate_content(f"Solve the following step by step:\n\n{problem}")
    return response.text

# Example usage
if __name__ == "__main__":
    problem = "Find the force exerted on a 5kg object accelerating at 2m/s²."
    solution = solve_problem(problem)
    print(solution)