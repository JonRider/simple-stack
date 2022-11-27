# Simple-Stack

A model full stack webapp that can be used as a starting point for projects.

Built with React, MongoDB Atlas / Mongoose, Auth0, Node and Express.

## Tech Stack

**Client:** React, Auth0, Reactstrap

**Server:** Node, Express, MongoDB Atlas, Mongooose

## Demo

Coming soon on Heroku

## Installation

Install dependencies

```bash
  npm install
```

Create an [Auth0](https://auth0.com/) application and configure it in **auth_config.json**

Make sure you also set an appOrigin and apiOrigin for cors policy compliance.

```bash
{
  "domain": "YOUR_AUTH0_DOMAIN",
  "clientId": "AUTH0_APPLICATION_CLIENT_ID",
  "audience": "YOUR_API_IDENTIFIER",
  "appOrigin": "APP_ORIGIN",
  "apiOrigin": "API_ORIGIN"
}
```

## Environment Variables

Create and link a [MongoDB Atlas](https://account.mongodb.com/) database and add the uri to a .env file.

`MONGO_URI`

## Authors

- [@JonRider](https://github.com/JonRider)
