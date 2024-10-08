from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
import os
import toml

app = Flask(__name__)
CORS(app)

client = OpenAI(api_key=toml.load("secrets.toml")["OPENAI_API_KEY"])


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()

    if not data or "message" not in data:
        return jsonify({"error": "Invalid input"})

    response = (
        client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": data["message"],
                }
            ],
        )
        .choices[0]
        .message.content
    )

    return jsonify({"response": response})


if __name__ == "__main__":
    app.run()
