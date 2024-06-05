from locust import HttpUser, task, between
from random import choices
import string




# class QuickstartUser(HttpUser):
#     wait_time = between(1, 2)
#
#     def on_start(self):
#
#         firstName = ''.join(choices(string.ascii_uppercase, k=1)+choices(string.ascii_lowercase, k=8))
#         lastName = ''.join(choices(string.ascii_uppercase, k=1)+choices(string.ascii_lowercase, k=6))
#         email = firstName+'@'+lastName+'.com'
#         password = ''.join(choices(string.ascii_lowercase + string.ascii_uppercase + string.digits, k=12))
#
#         response_code = 400
#         while response_code != 200:
#             response = self.client.post("/api/auth/register",
#                 json={
#                 "firstName": firstName,
#                 "lastName": lastName,
#                 "email": email,
#                 "password": password
#                 }
#                 )
#             response_code = response.status_code
#             if response.status_code == 200:
#                 jwt = response.json()['token']
#
#         # generate new data for filtering stuff
#         self.headers = {'Authorization': 'Bearer ' + jwt}
#
#
#
#     @task
#     def taskEndpoint(self):
#         for item_id in range(10):
#             self.client.get(f"/api/task/getFilteredTasks/{item_id}", headers=self.headers)



class HeavyDataUser(HttpUser):
    wait_time = between(1, 2)

    def on_start(self):

        response = self.client.post("/api/auth/authenticate",
            json={
            "email": "john.doe@example.com",
            "password": "password"
            }
            )
        jwt = response.json()['token']

        # generate new data for filtering stuff
        self.headers = {'Authorization': 'Bearer ' + jwt}


    @task(5)
    def taskEndpoint(self):
        for project_id in range(1,10,1):
            self.client.get(f"/api/task/getEpicsData/{project_id}", headers=self.headers)



    @task(5)
    def taskEndpoint(self):
        for project_id in range(1,10,1):
            self.client.get(f"/api/sprint/getSprintsCompletionData/{project_id}", headers=self.headers)
