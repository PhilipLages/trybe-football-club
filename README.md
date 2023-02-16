
# Trybe Football Club REST API

Project developed during the studies of the Back-End module of [Trybe](https://www.betrybe.com/)'s Full-Stack Web Development Course.

## Table of Contents

-   [Technologies Used](#technologies-used)
-   [Overview](#overview)
-   [Endpoints](#endpoints)
-   [Running the Application Locally](#running-the-application-locally)
-   [Conclusion](#conclusion)

## Technologies Used

-   Node.js
-   TypeScript
-   MySQL
-   Sequelize
-   Docker 
-   Jest
-   Mocha
-   Chai
-   Sinon

## Overview

This REST API was developed as part of the Back-End module of [Trybe](https://www.betrybe.com/)'s Web Development course, providing a comprehensive solution for managing soccer matches and championship standings. The API is built using Node.js, a powerful and efficient server-side JavaScript platform, and makes use of modern technologies such as Docker, MySQL, Sequelize ORM, Typescript, and follows POO and SOLID principles to ensure high quality and maintainable code. The front-end is provided by Trybe.

In addition, the API implements a secure authentication system using JSON Web Tokens (JWT), with the /login endpoint providing a POST method for logging in and returning a token that can be used to authenticate subsequent API requests.


## Endpoints

### Login

-   **URL**
    
    `/login`
    
-   **Method**
    
    `POST`
    
-   **Description**
    
    This endpoint is used to authenticate users and return a token created with jsonwebtoken.
    

### Validate Token

-   **URL**
    
    `/login/validate`
    
-   **Method**
    
    `GET`
    
-   **Description**
    
    This endpoint checks for a token in the headers and returns the user's role, whether administrator or not. The returned data will be in the format: `{"role": "admin"}`

----------
    

### Matches

-   **URL**
    
    `/matches`
    
-   **Method**
    
    `GET`
    
-   **Description**
    
    This endpoint returns an array of matches and can be filtered by in-progress or finished matches. The returned data will be in the format:
    <details>

    ```json
    [
      {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Gremio"
        }
      },
      {
        "id": 2,
        "homeTeamId": 9,
        "homeTeamGoals": 1,
        "awayTeamId": 14,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Internacional"
        },
        "awayTeam": {
          "teamName": "Santos"
        }
      },
    ] 
    ```
----------
### Create a Match

-   **URL**
    
    `/matches`
    
-   **Method**
    
    `POST`
    
-   **Description**
    
    This endpoint creates a new soccer match based on the information provided in the request body. The request body must be in the following format:
    <details>

    ```json
    {
      "homeTeamid": 1, 
      "awayTeamid": 2, 
      "homeTeamGoals": 3, 
      "awayTeamGoals": 1
    }
    ```
- **Response**

  The endpoint will return a JSON object with the following properties:
  <details>

    ```json
    {
      "id": 1,
      "homeTeamid": 1, 
      "awayTeamid": 2, 
      "homeTeamGoals": 3, 
      "awayTeamGoals": 1
    }
  ```
----------

### Update a Match

-   **URL**
    
    `/matches/:id`
    
-   **Method**
    
    `PATCH`
    
-   **Description**
    
    This endpoint updates the information of a soccer match that is currently in progress. The match can only be updated if its `inProgress` property is set to `true`.
    
-   **Response**
    
    If the match is successfully updated, the API will return a JSON object similar to the following:
    ```json
    {
      "message": "updated"
    }
    ```        

----------

### Finish a Match

-   **URL**
    
    `/matches/:id/finish`
    
-   **Method**
    
    `PATCH`
    
-   **Description**
    
    This endpoint finishes a soccer match that is currently in progress. The match can only be finished if its `inProgress` property is set to `true`.
    
-   **Response**
    
    If the match is successfully finished, the API will return a JSON object similar to the following:
    ```json
    {
      "message": "Finished"
    }
    ```    
----------
### Get Teams

-   **URL**
    
    `/teams`
    
-   **Method**
    
    `GET`
    
-   **Description**
    
    This endpoint returns an array of objects representing all the soccer teams in the database.
    
-   **Response**
    
    The API will return a JSON array of objects, where each object represents a team. A example will look like this:
    <details>

    ```json
    [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },
      {
        "id": 4,
        "teamName": "Corinthians"
      },
      {
        "id": 5,
        "teamName": "Cruzeiro"
      },
    ]
    ```
  ----------

### Get a Team

-   **URL**
    
    `/teams/:id`
    
-   **Method**
    
    `GET`
    
-   **Description**
    
    This endpoint returns information for a specific soccer team, identified by its `id`.
    
-   **Response**
    
    The API will return a JSON object representing the requested team, with properties such as `id` and `teamName`. An example response may look like this:
    ```json
    {
      "id": 1,
      "teamName": "Avaí/Kindermann"
    }
    ```
----------

### Get Championship Standings

-   **URL**
    
    `/leaderboard`
    
-   **Method**
    
    `GET`
    
-   **Description**
    
    This endpoint returns the championship standings, including information about each team's performance in the tournament.
    
-   **Response**
    
    The API will return a JSON array of objects, where each object represents a team and its standings in the championship. The response will look like this:
    <details>

    ```json
    [
      {
        "name": "Palmeiras",
        "totalPoints": 13,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 1,
        "totalLosses": 0,
        "goalsFavor": 17,
        "goalsOwn": 5,
        "goalsBalance": 12,
        "efficiency": "86.67"
      },
      {
        "name": "Corinthians",
        "totalPoints": 12,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 0,
        "totalLosses": 1,
        "goalsFavor": 12,
        "goalsOwn": 3,
        "goalsBalance": 9,
        "efficiency": "80.00"
      },
    ]
    ```

    Note: The teams are sorted primary by points, with other properties being used as tie-breakers if necessary.

---


### Get Home or Away Championship Standings

-   **URL**
    
    `/leaderboard/home` or `/leaderboard/away`
    
-   **Method**
    
    `GET`
    
-   **Description**
    
    This endpoint returns the championship standings, filtered by whether the matches were played at home or away.
    
-   **Response**
    
    The API will return a JSON array of objects, where each object represents a team and its standings in the championship. The response will look the same way as the one from `/leaderboard`.

    Note: The teams are sorted primary by points, with other properties being used as tie-breakers if necessary. The only difference between `/leaderboard/home` and `/leaderboard/away` is the filter applied to the data, showing only matches played at home or away, respectively.

  ---

  ## Running the Application Locally

  1.  Clone the repository containing the application code:

  ```bash
  git clone git@github.com:PhilipLages/trybe-football-club.git
  ```
  2. Navigate to the root of the repository:
  ```bash
  cd trybe-football-club
  ```
  3. Install the required dependencies:
  ```bash
  npm install
  ```
  4. Navigate to app/:
  ```bash
  cd app/
  ```
  5. Initialize the Docker containers with `docker-compose` script:
  ```bash
  npm run compose:up:dev
  ```
  6. The API should now be available at http://localhost:3001/ and the front-end at http://localhost:3000/

  ---

  ## Conclusion

In conclusion, this REST API provides a comprehensive solution for managing soccer matches and championship standings. With its use of modern technologies such as Docker, MySQL, Sequelize, Typescript, NodeJS, and adherence to SOLID and POO principles, the API is well equipped to handle the demands of a large-scale soccer application.

Whether you are looking to retrieve information about matches and teams, or update the results of a match in progress, the API offers a range of endpoints to meet your needs. And with the ability to run the application locally or in a Docker container, the API is easy to set up and use for development or production purposes.

I hope this API serves as a valuable resource for your soccer data management needs.
