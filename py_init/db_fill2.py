import copy
import datetime
import random

import requests
from requests.exceptions import ConnectTimeout

api = "http://localhost:8084"

session = requests.Session()

try:
    response = session.get(api + '/actuator/health', timeout=5)
except Exception:
    api = "http://172.22.0.1:8084"

try:
    response = session.get(api + '/actuator/health', timeout=5)
except Exception:
    api = "http://172.17.0.1:8084"

users = [
    {"firstName": "John", "lastName": "Doe", "email": "john.doe@example.com", "password": "password"}]


jwts = []
for user_json in users:
    response = session.post(api + "/api/auth/register", json=user_json)
    print(f"register request repsonse: {response.status_code}")
    jwts.append(response.json()['token'])
    print(f"User {user_json['firstName']} created")
    print(response.text)

response = session.get(api+'/api/user', headers={'Authorization': 'Bearer ' + jwts[0]})
user_id = response.json()['id']
print(user_id)
response_code = 200
project_id = 1
while response_code == 200:
    response = session.put(api + "/api/project/addUser",
                        json={
                            "projectID": project_id,
                            "userId": user_id
                        }, headers={'Authorization': 'Bearer ' + jwts[0]})
    print(response.status_code)
    print(response.text)
    response_code = response.status_code
    project_id += 1
