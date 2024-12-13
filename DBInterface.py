import sqlite3
import logging

conn = sqlite3.connect('./data/db.db')

def writeUser(fName, lName, username):
    cursor = conn.cursor() 
    insertion = "INSERT INTO USERS VALUES ('" + fName + "','" + lName + "',NULL,'" + username + "');"
    cursor.execute(insertion)
    conn.commit()
    cursor.close()
    
def validateUser(username) -> bool:
    cursor = conn.cursor() 
    cursor.execute("SELECT 1 FROM USERS WHERE (Username == '" + username + "')")
    rows = cursor.fetchall()
    
    if not rows:
        logging.info("No user found")
        return False

    return True

def makeRecommendation(username, destination, movieTitle):
    if not validateUser(username):
        logging.info("User does not exist")
        return 400
    
    if not validateUser(destination):
        logging.info("Friend does not exist")
        return 400
    
    cursor = conn.cursor() 
    insertion = "INSERT INTO RECOMMENDATIONS VALUES ('" + username + "','" + destination + "','" + movieTitle + "')"
    cursor.execute(insertion)
    conn.commit()
    cursor.close()

def getRecommendations(username) -> list:
    if not validateUser(username):
        logging.info("User does not exist")
        return []
    
    cursor = conn.cursor()
    cursor.execute("SELECT MovieTitle, REcommenderUsername FROM recommendations WHERE RecomendeeUsername = ?", (username,))
    #movies = cursor.fetchall()
    # movies = [row[0] for row in movies]
    movies = [{"recommender": row[1], "movieTitle": row[0]} for row in cursor.fetchall()]
    
    return movies

def getUserID(user):
    cursor = conn.cursor() 
    selection = "SELECT UserID FROM Users WHERE Username = ? LIMIT 1;"
    cursor.execute(selection, (user,))
    userRow = cursor.fetchone()
    cursor.close()
    if userRow is None:
        return -1
    else:
        return userRow[0]
    
def writeFriend(user, friend):
    if not validateUser(user):
        return 0
    elif not validateUser(friend):
        return -1
    userID = getUserID(user)
    friendID = getUserID(friend)

    if userID > friendID:
        userID, friendID = friendID, userID
    
    cursor = conn.cursor() 
    insertion = "INSERT INTO FRIENDSHIPS VALUES ( ? , ? );"
    cursor.execute(insertion, (userID, friendID))
    conn.commit()
    cursor.close()
    return 1

def removeFriend(user, friend):
    if not validateUser(user):
        return 0
    elif not validateUser(friend):
        return -1
    userID = getUserID(user)
    friendID = getUserID(friend)

    if userID > friendID:
        userID, friendID = friendID, userID

    cursor = conn.cursor()
    deletion =  "DELETE FROM FRIENDSHIPS WHERE UserID1 = ? AND UserID2 = ? "
    cursor.execute(deletion, (userID, friendID))
    conn.commit()
    cursor.close()
    return 1

def getFriends(user):
    if validateUser(user):
        userID = getUserID(user)
        cursor = conn.cursor()
        query = """
            SELECT CASE
                    WHEN UserID1 = ? THEN UserID2
                    ELSE UserID1
                END AS FriendID
            FROM Friendships
            WHERE UserID1 = ? OR UserID2 = ?;
        """

        cursor.execute(query, (userID, userID, userID))
        friends = [row[0] for row in cursor.fetchall()]
        cursor.close()
        result = {
            "user": user,
            "friendsIDs": friends
        }
        return result
    
    logging.info("User does not exist")
    return {}

def getUserInfoById(userID):
    cursor = conn.cursor()
    query = "SELECT * FROM Users WHERE UserID = ?"
    cursor.execute(query, (userID,))
    row = cursor.fetchone()
    cursor.close()
    if row is None:
        logging.info("User ID does not exist")
        return {}
    result = {
        "firstName": row[0],
        "lastName": row[1],
        "userID": row[2],
        "username": row[3]
    }
    return result