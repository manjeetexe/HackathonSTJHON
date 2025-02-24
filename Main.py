from Model.langchain_solver import solve_problem

# Get user input
user_question = input("Enter a math or physics problem: ")

# Get solution
solution = solve_problem(user_question)

# Print step-by-step explanation
print("\n🔍 Solution:\n", solution)