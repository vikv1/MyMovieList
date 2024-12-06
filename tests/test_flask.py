import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client
        
def test_home(client):
    response = client.get('/')
    assert response.status_code == 200

def test_signup_page(client):
    response = client.get('/signup')
    assert response.status_code == 200

def test_make_rec_page(client):
    response = client.get('/makeRecommendation')
    assert response.status_code == 200
    
def test_view_rec_page_without_user(client):
    response = client.get('/viewRecommendations')
    assert response.status_code == 400

def test_view_rec_page_with_user(client):
    response = client.get('/viewRecommendations?user_name=mockUser1')
    assert response.status_code == 200

def test_add_friend_page(client):
    response = client.get('/addfriend')
    assert response.status_code == 200