## About this project

This project was built with:
  -  [Create React App](https://github.com/facebook/create-react-app).
  -  [Hasura GraphQL Api hosted on Heroku](https://hasura.io)
  -  [Auth0 for user authentication](https://auth0.com/)
  -  [Netlify](https://www.netlify.com)

### Purpose

This project was built as part of a 1 day front end development test to showcase how to build a **SPA CHAT APP** with **REACT**

## Running the Project

In order to run this project in development and production you will need to update the **constants.js** file in the **/src directory** with the corresponding data for your app

Format of the file:
```javascript
export const AUTH0_DOMAIN_ID = "<YOUR AUTH0 DOMAIN ID>";
export const AUTH0_CLIENT_ID = "<YOUR AUTH0 CLIENT ID>";
export const CALLBACK_URL =
  process.env.NODE_ENV === "production"
    ? "<YOUR PRODUCTION URL>/callback"
    : "http://localhost:3000/callback";

const HASURA_GRAPHQL_ENGINE_HOSTNAME = "<YOUR HASURA URL>";

[...]

```
Use **yarn start** to run the project in development mode
<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

