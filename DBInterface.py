import sqlite3

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
        print("No user found")
        return False

    return True

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

