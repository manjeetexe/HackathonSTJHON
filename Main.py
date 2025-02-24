from Model.langchain_solver import solve_problem

user_question = input("Enter a math or physics problem: ")

solution = solve_problem(user_question)

print("\n🔍 Solution:\n", solution)