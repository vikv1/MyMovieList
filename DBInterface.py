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
    cursor.execute("SELECT MovieTitle FROM recommendations WHERE RecomendeeUsername = ?", (username,))
    movies = cursor.fetchall()
    movies = [row[0] for row in movies]
    
    return movies