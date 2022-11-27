import React from "react";
import { Container } from "reactstrap";
import Api from "../components/Api";
import Database from "../components/Database";
import About from "../components/About";
import Login from "../components/Login";

const Home = () => {
  return (
    <Container className="main">
      <About />
      <hr></hr>
      <Login />
      <hr></hr>
      <Api />
      <hr></hr>
      <Database />
    </Container>
  );
};

export default Home;
