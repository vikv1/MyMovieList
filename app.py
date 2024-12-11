import DBInterface
from flask import Flask, request, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html'), 200

@app.route('/signup', methods =["GET", "POST"]) 
def signup():
    if request.method == "POST":
        first_name = request.json.get("fname")
        last_name = request.json.get("lname") 
        username = request.json.get("username") 

        DBInterface.writeUser(first_name, last_name, username)
        
    return render_template('create_user_form.html'), 200

@app.route('/makeRecommendation', methods = ["GET", "POST"])
def makeRecommendation():
    if request.method == "POST":
        sender = request.form.get("username")
        dest = request.form.get("friend_username") 
        movieTitle = request.form.get("movie-title") 

        DBInterface.makeRecommendation(sender, dest, movieTitle)
        
    return render_template('recommend_form.html')

@app.route('/viewRecommendations', methods=["GET"])
def viewRecommendations():
    user_name = request.args.get('user_name')
    if not user_name:
        return "Please provide a user name.", 400
    
    movies = DBInterface.getRecommendations(user_name)
    
    return render_template('recommendations.html', user_name=user_name, movies=movies)

@app.route('/addfriend', methods=["GET", "POST"])
def addFriend():
    if request.method == "POST":
        user_first = request.json.get("user")
        friend_first = request.json.get("friend")
        friendship = DBInterface.writeFriend(user_first, friend_first)
        if friendship == 0:
            return "Please provide a valid username", 400
        elif friendship == -1:
            return "Please provide valid friend username", 400
    return render_template('add_friend_form.html')

@app.route('/removefriend', methods=["GET", "POST"])
def removeFriend():
    if request.method == "POST":
        user_first = request.json.get("user")
        friend_first = request.json.get("friend")
        friendship = DBInterface.removeFriend(user_first, friend_first)
        if friendship == 0:
            return "Please provide a valid username", 400
        elif friendship == -1:
            return "Please provide valid friend username", 400
    return render_template('remove_friend_form.html')
    