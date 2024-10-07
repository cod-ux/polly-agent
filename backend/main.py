from flask import Flask, jsonify, request
import openai
import os

app = Flask(__name__)

openai.api_key = os.getenv("OPENAI_API_KEY")


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()

    if not data or "message" not in data:
        return jsonify({"error": "Invalid input"})

    response = openai.Completion.create(
        model="gpt-4o-mini",
        messages={
            "role": "user",
            "content": data["message"],
        },
    )
    return jsonify({"response": response.choices[0].message.content})


if __name__ == "__main__":
    app.run()
