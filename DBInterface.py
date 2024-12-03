import sqlite3

conn = sqlite3.connect('./data/db.db')

def writeUser(fName, lName):
    cursor = conn.cursor() 
    insertion = "INSERT INTO USERS VALUES ('" + fName + "','" + lName + "',NULL);"
    cursor.execute(insertion)
    conn.commit()
    cursor.close()