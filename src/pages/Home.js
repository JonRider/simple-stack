import React, { Fragment } from "react";
import { Button, Container } from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";
import Api from "../components/Api";
import Database from "../components/Database";
import {
  SiMongodb,
  SiAuth0,
  SiNodedotjs,
  SiBootstrap,
  SiReact,
} from "react-icons/si";

const Home = () => {
  const { user, isAuthenticated, loginWithRedirect, logout, isLoading } =
    useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <Container className="main">
      <h1>
        Simple <span className="highlight">Stack</span>
      </h1>

      <p className="intro">
        A barebones fullstack web application that demonstrates how all these
        tools can be connected and used together. Simple Stack can serve as a
        starting point for building a full fledged webapp in React with a
        backend API and database.
      </p>
      <p className="lead">Built with:</p>
      <h4>
        <SiReact className="icon" />
        React
      </h4>
      <h4>
        <SiMongodb className="icon" />
        Mongoose/MongoDB
      </h4>
      <h4>
        <SiAuth0 className="icon" />
        Auth0
      </h4>
      <h4>
        <SiNodedotjs className="icon" />
        Node/Express
      </h4>
      <h4>
        <SiBootstrap className="icon" />
        Reactstrap
      </h4>

      <hr></hr>

      <div>
        <h2>Login Functionality</h2>
        <p className="lead">Authentication by 0Auth</p>
        {!isAuthenticated && (
          <Fragment>
            <h6>Login to load user profile</h6>
            <Button color="dark" onClick={() => loginWithRedirect()}>
              Login
            </Button>
          </Fragment>
        )}
        {isAuthenticated && (
          <Fragment>
            <h6>Welcome {user.name}!</h6>
            <img src={user.picture} alt={user.name} className="profile" />
            <p>{user.email}</p>
          </Fragment>
        )}
        {isAuthenticated && (
          <Button color="dark" onClick={() => logoutWithRedirect()}>
            Logout
          </Button>
        )}
      </div>
      <hr></hr>
      <Api />
      <hr></hr>
      <Database />
    </Container>
  );
};

export default Home;
