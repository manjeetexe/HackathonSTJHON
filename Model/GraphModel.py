from flask import Flask, request, jsonify
import numpy as np
import sympy as sp

app = Flask(__name__)

@app.route("/generate-graph", methods=["POST"])
def generate_graph():
    data = request.json
    function_str = data.get("function")

    if not function_str:
        return jsonify({"error": "No function provided"}), 400

    try:
        x = sp.symbols('x')  # Define the variable
        expression = sp.sympify(function_str)  # Convert string to symbolic expression

        # For log(x), ensure x > 0 to avoid math errors
        if "log" in function_str or "ln" in function_str:
            x_values = np.linspace(0.1, 10, 100)  # Start from 0.1 instead of negative values
        else:
            x_values = np.linspace(-10, 10, 100)

        y_values = [float(expression.subs(x, val)) for val in x_values]  # Compute y values

        graph_data = [{"x": float(x), "y": y} for x, y in zip(x_values, y_values)]
        return jsonify(graph_data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)