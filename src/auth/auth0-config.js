import { AUTH0_DOMAIN_ID, AUTH0_CLIENT_ID } from "../constants";

export const AUTH_CONFIG = {
  domain: AUTH0_DOMAIN_ID,
  clientId: AUTH0_CLIENT_ID,
  callbackUrl: "http://localhost:3000/callback"
};
