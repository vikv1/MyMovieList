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

# returns dictionary {"user":username, "friendsIDs":friendsUserIDs[]}
@app.route('/getfriends', methods=["GET", "POST"])
def getFriends():
    if request.method == "GET":
        user = request.args.get("user")
    elif request.method == "POST":
        user = request.json.get("user")
    if not user:
        return "Username is required", 400
    friends = DBInterface.getFriends(user)
    return friends

# returns dictionary {"firstName":name, "lastName":name, "userID":id, "username":username}
@app.route('/getprofilebyid', methods=["GET", "POST"])
def getProfile():
    if request.method == "GET":
        userID = request.args.get("userid") 
    elif request.method == "POST":
        userID = request.json.get("userid") 

    if not userID:
        return "User ID is required", 400
    
    profile = DBInterface.getUserInfoById(userID)
    if not profile:
        return "Not valid user ID", 400
    return profile, 200

# returns {"existing":bool}
@app.route('/isuser', methods=["GET", "POST"])
def checkIsUser():
    if request.method == "GET":
        user = request.args.get("user")
    elif request.method == "POST":
        user = request.json.get("user")
    if not user:
        return "Username is required", 400
    
    isUser = DBInterface.validateUser(user)
    result = {"existing": isUser}
    return result, 200
