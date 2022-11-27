import React, { Fragment, useState } from "react";
import axios from "axios";
import { Button, Container } from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { getConfig } from "../config";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  Input,
  Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap";
import { FaArrowRight } from "react-icons/fa";

export const Database = () => {
  const { apiOrigin, audience } = getConfig();

  const { isAuthenticated, user } = useAuth0();

  const [state, setState] = useState({
    createItem: "",
    updateItem: "",
    createDbItem: "",
    readDbItem: "",
    updateDbItem: "",
    deleteDbItem: "",
    error: null,
    createOpen: false,
    readOpen: false,
    updateOpen: false,
    deleteOpen: false,
  });

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const close = (open) => {
    setState({ ...state, [open]: false });
  };

  const { getAccessTokenSilently } = useAuth0();

  const dbCreate = async () => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        method: "POST",
        url: `${apiOrigin}/api`,
        headers: {
          authorization: `Bearer ${token}`,
        },
        contentType: "application/json",
        data: { item: state.createItem, email: user.email },
      };

      let responseData = null;

      try {
        responseData = await axios(options);
      } catch (error) {
        console.log(error);
      }

      setState({
        ...state,
        createDbItem: responseData.data.item,
        createOpen: true,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
      console.log(error);
    }
  };

  const dbRead = async () => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        method: "GET",
        url: `${apiOrigin}/api/${user.email}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
        contentType: "application/json",
      };

      let responseData = null;

      try {
        responseData = await axios(options);
      } catch (error) {
        console.log(error);
      }
      setState({
        ...state,
        readDbItem: responseData.data.item,
        readOpen: true,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
      console.log(error);
    }
  };

  const dbUpdate = async () => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        method: "PUT",
        url: `${apiOrigin}/api`,
        headers: {
          authorization: `Bearer ${token}`,
        },
        contentType: "application/json",
        data: { item: state.updateItem, email: user.email },
      };

      let responseData = null;

      try {
        responseData = await axios(options);
      } catch (error) {
        console.log(error);
      }
      setState({
        ...state,
        updateDbItem: responseData.data.item,
        updateOpen: true,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
      console.log(error);
    }
  };

  const dbDelete = async () => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        method: "DELETE",
        url: `${apiOrigin}/api`,
        headers: {
          authorization: `Bearer ${token}`,
        },
        contentType: "application/json",
        data: { email: user.email },
      };

      let responseData = null;

      try {
        responseData = await axios(options);
      } catch (error) {
        console.log(error);
      }
      setState({
        ...state,
        deleteDbItem: responseData.data.item,
        deleteOpen: true,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
      console.log(error);
    }
  };

  return (
    <Fragment>
      <h2>Perform Basic Database CRUD Operations</h2>
      <p className="lead">
        MongoDB Atlas Database accessed through Express Server
      </p>
      <Container className="cards">
        <Row lg="4">
          <Col xs="12">
            <Card className="display-card" color="light">
              <CardBody>
                <CardTitle tag="h5">Create</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {isAuthenticated
                    ? "Create a database entry by filling out the form and clicking on the button below."
                    : "Login to access the database"}
                </CardSubtitle>
                <Input
                  onChange={onChange}
                  name="createItem"
                  className="input-field"
                />
                <Button
                  color="success"
                  onClick={dbCreate}
                  disabled={
                    !audience || !isAuthenticated || state.createItem === ""
                  }
                >
                  Create
                </Button>
                {state.createDbItem !== "" && (
                  <Toast isOpen={state.createOpen} className="message">
                    <ToastHeader
                      toggle={() => close("createOpen")}
                      icon="success"
                    >
                      Data Created
                    </ToastHeader>
                    <ToastBody>{state.createDbItem}</ToastBody>
                  </Toast>
                )}
              </CardBody>
            </Card>
          </Col>
          <Col xs="12">
            <Card className="display-card" color="light">
              <CardBody>
                <CardTitle tag="h5">Read</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {isAuthenticated
                    ? "Read the most recent database entry by clicking on the button below."
                    : "Login to access the database"}
                </CardSubtitle>
                <Button
                  color="primary"
                  onClick={dbRead}
                  disabled={!audience || !isAuthenticated}
                >
                  Read
                </Button>
                {state.readDbItem !== "" && (
                  <Toast isOpen={state.readOpen} className="message">
                    <ToastHeader
                      toggle={() => close("readOpen")}
                      icon="primary"
                    >
                      Data Read
                    </ToastHeader>
                    <ToastBody>{state.readDbItem}</ToastBody>
                  </Toast>
                )}
              </CardBody>
            </Card>
          </Col>
          <Col xs="12">
            <Card className="display-card" color="light">
              <CardBody>
                <CardTitle tag="h5">Update</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {isAuthenticated
                    ? "First read a database entry then update it by editing the form and clicking on the button below."
                    : "Login to access the database"}
                </CardSubtitle>
                <Input
                  onChange={onChange}
                  name="updateItem"
                  className="input-field"
                  placeholder={state.readDbItem}
                />
                <Button
                  color="warning"
                  onClick={dbUpdate}
                  disabled={
                    !audience || !isAuthenticated || state.updateItem === ""
                  }
                >
                  Update
                </Button>
                {state.updateDbItem !== "" && (
                  <Toast isOpen={state.updateOpen} className="message">
                    <ToastHeader
                      toggle={() => close("updateOpen")}
                      icon="warning"
                    >
                      Data Updated
                    </ToastHeader>
                    <ToastBody>
                      {state.updateDbItem} <FaArrowRight /> {state.updateItem}
                    </ToastBody>
                  </Toast>
                )}
              </CardBody>
            </Card>
          </Col>
          <Col xs="12">
            <Card className="display-card" color="light">
              <CardBody>
                <CardTitle tag="h5">Delete</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {isAuthenticated
                    ? "Delete a database entry by clicking on the button below."
                    : "Login to access the database"}
                </CardSubtitle>
                <Input
                  onChange={onChange}
                  name="updateItem"
                  className="input-field"
                  value={state.readDbItem}
                  disabled={true}
                />
                <Button
                  color="danger"
                  onClick={dbDelete}
                  disabled={!audience || !isAuthenticated}
                >
                  Delete
                </Button>
                {state.deleteDbItem !== "" && (
                  <Toast isOpen={state.deleteOpen} className="message">
                    <ToastHeader
                      toggle={() => close("deleteOpen")}
                      icon="danger"
                    >
                      Data Deleted
                    </ToastHeader>
                    <ToastBody>
                      <s>{state.deleteDbItem}</s>
                    </ToastBody>
                  </Toast>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Database;
