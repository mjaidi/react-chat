import React from "react";
import { Route, Router } from "react-router-dom";
import App from "components/App";
import Home from "components/Home";
import Conversation from "components/Conversation";
import Loader from "components/Loader";
import Auth from "auth/auth0";
import history from "./history";
import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { WebSocketLink } from "apollo-link-ws";
import { setContext } from "apollo-link-context";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";

import { GRAPHQL_URL, REALTIME_GRAPHQL_URL } from "./constants";

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  const token = localStorage.getItem("auth0:id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const wsLink = new WebSocketLink({
  uri: REALTIME_GRAPHQL_URL,
  options: {
    lazy: true,
    timeout: 3000,
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

const httpLink = createHttpLink({
  uri: GRAPHQL_URL
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
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
