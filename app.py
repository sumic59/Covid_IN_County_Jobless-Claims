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

@app.route("/Allen.html")
def Allen():
    return render_template("Allen.html")

@app.route("/Boone.html")
def Boone():
    return render_template("Boone.html")

@app.route("/Decatur.html")
def Decatur():
    return render_template("Decatur.html")

@app.route("/Hamilton.html")
def Hamilton():
    return render_template("Hamilton.html")

@app.route("/Hendricks.html")
def Hendricks():
    return render_template("Hendricks.html")

@app.route("/Johnson.html")
def Johnson():
    return render_template("Johnson.html")

@app.route("/Lake.html")
def Lake():
    return render_template("Lake.html")

@app.route("/Marion.html")
def vanderburgh():
    return render_template("Marion.html")

@app.route("/Monroe.html")
def Monroe():
    return render_template("Monroe.html")

@app.route("/StJoseph.html")
def StJoseph():
    return render_template("StJoseph.html")

@app.route("/Vanderburgh.html")
def Vanderburgh():
    return render_template("Vanderburgh.html")

@app.route("/Warrick.html")
def Warrick():
    return render_template("Warrick.html")

if __name__ == '__main__':
    app.run(debug=True)