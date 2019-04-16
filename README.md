# ReactJS + Express API + MongoDB + Swagger

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and modified to have a backend API that connects to a MongoDB database.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view the frontend in the browser.  
Open [http://localhost:3001](http://localhost:3001) to ping the backend.  
Open [http://localhost:3001/api-docs/](http://localhost:3001/api-docs/) to open the Swagger definition for the API.  

The React page will reload if you make edits.  
The backend has to be restarted if changes are made.  
You will also see any lint errors in the console.

### `npm run start:client`

Starts the frontend React site.

### `npm run start:server`

Starts the backend API.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Configuration

### `.env` file

> DB_USER = {username}  
> DB_PASSWORD = {password}  
> DB_SERVER = {server}  
> DB_NAME = {db name}  
> DB_PORT = {db port}  
> API_URL = {api url}

## Disclaimer

This app is a test and it is shipped as-is. Pretty sure it's not suitable for a production environment but it can help in learning how these tools interact with each other in a development environment.