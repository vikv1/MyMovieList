import sqlite3

conn = sqlite3.connect('./data/db.db')

def writeUser(fName, lName):
    cursor = conn.cursor() 
    insertion = "INSERT INTO USERS VALUES ('" + fName + "','" + lName + "',NULL);"
    cursor.execute(insertion)
    conn.commit()
    cursor.close()

def getUserID(user):
    cursor = conn.cursor() 
    selection = "SELECT * FROM Users WHERE FIRST NAME = " + user + " LIMIT 1;"
    cursor.execute(selection)
    userRow = cursor.fetchone()
    cursor.close()
    if userRow is None:
        return -1
    else:
        return userRow[2]
    
def writeFriend(user, friend):
    userID = getUserID(user)
    friendID = getUserID(friend)
    if(userID == -1):
        return 0
    elif(friendID == -1):
        return -1
    else:
        cursor = conn.cursor() 
        insertion = "INSERT INTO FRIENDSHIPS VALUES ('" + userID + "','" + friendID + "');"
        cursor.execute(insertion)
        conn.commit()
        cursor.close()
        return 1

