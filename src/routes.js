import React from "react";
import { Route, Router } from "react-router-dom";
import Auth from "auth/auth0";
import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { WebSocketLink } from "apollo-link-ws";
import { setContext } from "apollo-link-context";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";

import history from "./history";
import { GRAPHQL_URL, REALTIME_GRAPHQL_URL } from "./constants";

// Components for Routes
import App from "views/App";
import Home from "views/Home";
import Conversation from "views/Conversation";
import Loader from "components/Loader";

// get the authentication token from local storage if it exists
// return the headers to the context so httpLink can read them
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("auth0:id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const httpLink = createHttpLink({
  uri: GRAPHQL_URL
});

// get authentication token from headers and setup link for websocket connection
const wsLink = new WebSocketLink({
  uri: REALTIME_GRAPHQL_URL,
  options: {
    lazy: true,
    timeout: 30000,
    reconnect: true,
    connectionParams: () => {
      const token = localStorage.getItem("auth0:id_token");
      return {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      };
    }
  }
});

// Split links based on type of operation (HTTP vs WS)
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

// Create new apollo client with appropriate link
const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: false
  })
});

const provideClient = component => {
  return <ApolloProvider client={client}>{component}</ApolloProvider>;
};

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

// main routes including callback for auth0 authentication on login
export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <div id="main">
        <Route
          path="/"
          render={props => provideClient(<App auth={auth} {...props} />)}
        />
        <Route
          path="/home"
          render={props =>
            provideClient(<Home client={client} auth={auth} {...props} />)
          }
        />
        <Route
          path="/conversations/:id"
          render={props =>
            provideClient(
              <Conversation client={client} auth={auth} {...props} />
            )
          }
        />
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Loader {...props} />;
          }}
        />
      </div>
    </Router>
  );
};
