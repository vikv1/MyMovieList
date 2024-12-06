import logging
import sqlite3
import DBInterface
import azure.functions as func
from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/signup', methods =["GET", "POST"]) 
def signup():
    if request.method == "POST":
        first_name = request.form.get("fname")
        last_name = request.form.get("lname") 
        username = request.form.get("username") 

        DBInterface.writeUser(first_name, last_name, username)
        
    return render_template('create_user_form.html')

@app.route('/addfriend', methods=["GET", "POST"])
def addFriend():
    if request.method == "POST":
        user_first = request.form.get("user")
        friend_first = request.form.get("friend")
        DBInterface.writeFriend(user_first, friend_first)
    return render_template('add_friend_form.html')
    