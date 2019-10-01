export const AUTH0_DOMAIN_ID = "dev-zujxkjwf.eu.auth0.com";
export const AUTH0_CLIENT_ID = "05CezgzFjN5bgl2ZcXIAkMb0TwiAkH3o";
export const CALLBACK_URL =
  process.env.NODE_ENV === "production"
    ? "https://modest-jennings-c57cc9.netlify.com/#/callback"
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
