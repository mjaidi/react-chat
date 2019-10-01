## About this project

This project was built with:
  -  [Create React App](https://github.com/facebook/create-react-app).
  -  [Hasura GraphQL Api hosted on Heroku](https://hasura.io)
  -  [Auth0 for user authentication](https://auth0.com/)
  -  [Netlify](https://www.netlify.com)

### Purpose

This project was built as part of a 1 day front end development test to showcase how to build a *SPA CHAT APP* with *REACT*

## Available Scripts

In order to run this project in development you will need to add a *constants.js* file in the /src directory

Format of the file:
```javascript
export const AUTH0_DOMAIN_ID = "<YOUR AUTH0 DOMAIN ID>";
export const AUTH0_CLIENT_ID = "<YOUR AUTH0 CLIENT ID>";
export const CALLBACK_URL =
  process.env.NODE_ENV === "production"
    ? "<YOUR PRODUCTION URL>/callback"
    : "http://localhost:3000/callback";

const HASURA_GRAPHQL_ENGINE_HOSTNAME = "hasura-chat-backend.herokuapp.com";

const scheme = proto => {
  return window.location.protocol === "https:" ? `${proto}s` : proto;
};

export const GRAPHQL_URL = `${scheme(
  "http"
)}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;

export const REALTIME_GRAPHQL_URL = `${scheme(
  "ws"
)}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;

```
Use *yarn start* to run the project in development mode
<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

