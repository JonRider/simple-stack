import React, { Fragment } from "react";
import {
  SiMongodb,
  SiAuth0,
  SiNodedotjs,
  SiBootstrap,
  SiReact,
} from "react-icons/si";

function About() {
  return (
    <Fragment>
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
    </Fragment>
  );
}

export default About;
