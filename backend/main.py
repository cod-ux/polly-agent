from flask import Flask, jsonify, request
import openai
import os

app = Flask(__name__)

openai.api_key = os.getenv("OPENAI_API_KEY")
