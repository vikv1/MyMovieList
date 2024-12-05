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