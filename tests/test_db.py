import sqlite3
import pytest

@pytest.fixture
def mock_db():
    conn = sqlite3.connect(':memory:')
    cursor = conn.cursor()
    
    # create mock tables
    cursor.execute("""
       CREATE TABLE "Friendships" (
        "UserID1"	INT NOT NULL,
        "UserID2"	INT NOT NULL,
        FOREIGN KEY("UserID1") REFERENCES "Users"("UserID"),
        FOREIGN KEY("UserID2") REFERENCES "Users"("UserID"),
        PRIMARY KEY("UserID1","UserID2"),
        CHECK("UserID1" < "UserID2"));                        
    """)
    
    cursor.execute("""
        CREATE TABLE "Recommendations" (
	    "RecommenderID"	INT NOT NULL,
	    "RecomendeeID"	INT NOT NULL,
	    "MovieTitle"	TEXT NOT NULL,
	    FOREIGN KEY("RecomendeeID") REFERENCES "Users"("UserID"),
	    FOREIGN KEY("RecommenderID") REFERENCES "Users"("UserID"));
    """)
    
    cursor.execute("""
        CREATE TABLE "Users" (
	    "fName"	TEXT,
	    "lName"	TEXT,
	    "UserID"	INTEGER,
	    "Username"	TEXT,
	    PRIMARY KEY("UserID" AUTOINCREMENT));
    """)
    
    
    # add mock data
    insertions = [
        "INSERT INTO USERS VALUES ('mock_user','lName',NULL,'mockUser');"
    ]
    
    for insertion in insertions:
        cursor.execute(insertion)
    
    conn.commit()
    
    yield conn
    
    conn.close()
    

def test_username_search(mock_db):
    username = "mockUser"
    cursor = mock_db.cursor()
    cursor.execute("SELECT 1 FROM USERS WHERE (Username == '" + username + "')")
    rows = cursor.fetchall()
    
    assert rows
    
def test_user_not_in_db(mock_db):
    username = "bro"
    cursor = mock_db.cursor()
    cursor.execute("SELECT 1 FROM USERS WHERE (Username == '" + username + "')")
    rows = cursor.fetchall()
    
    assert not rows
