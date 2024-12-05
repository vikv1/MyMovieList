import sqlite3
import pytest

conn = sqlite3.connect('./data/db.db')

def test_username_search(username = "flaskuser"):
    cursor = conn.cursor() 
    cursor.execute("SELECT 1 FROM USERS WHERE (Username == '" + username + "')")
    rows = cursor.fetchall()
    
    assert rows
    
def test_user_not_in_db(username = "bro"):
    cursor = conn.cursor() 
    cursor.execute("SELECT 1 FROM USERS WHERE (Username == '" + username + "')")
    rows = cursor.fetchall()
    
    assert not rows
