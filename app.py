import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
#################################################
# Flask Routes
#################################################
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/index.html")
def welcome():
    message = "The Reaper Project"
    return render_template("index.html", message=message)

@app.route("/Marion.html")
def vanderburgh():
    return render_template("Marion.html")

@app.route("/Monroe.html")
def vanderburgh():
    return render_template("Monroe.html")

@app.route("/StJoseph.html")
def vanderburgh():
    return render_template("StJoseph.html")

if __name__ == '__main__':
    app.run(debug=True)