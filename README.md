# Fullstack MERN TodoList

This project consists of two create-react-app projects one for the api(todos_api) and one for the frontend in react(todosfrontend)

We allow the react frontend to communicate with the api backend by adding the entry of  `"proxy": "http://localhost:3000"` into the package.json or the react project. This will route the api calls through localhost:3000

1. CD into both directories and run `npm start`
2. open up a browser in http://localhost:8080/ for the react frontend
3. open up a browser in http://localhost:3000/ for the api
