import configJson from "./auth_config.json";

export function getConfig() {
  // Configuration for Auth0 and API server

  // Set Origins to localhost for development
  const apiOrigin =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : configJson.apiOrigin;

  const appOrigin =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : configJson.appOrigin;

  return {
    domain: configJson.domain,
    clientId: configJson.clientId,
    audience: configJson.audience,
    appOrigin: appOrigin,
    apiOrigin: apiOrigin,
  };
}
