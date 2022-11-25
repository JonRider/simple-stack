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
  CardText,
  CardHeader,
  Row,
  Col,
} from "reactstrap";

export const ExternalApiComponent = () => {
  const { apiOrigin = "http://localhost:3001", audience } = getConfig();

  const { user, isAuthenticated } = useAuth0();

  const [state, setState] = useState({
    showResult: false,
    apiMessage: {},
    error: null,
  });

  const { getAccessTokenSilently } = useAuth0();

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        method: "POST",
        url: `${apiOrigin}/api/external/test`,
        headers: {
          authorization: `Bearer ${token}`,
        },
        contentType: "application/json",
        data: { user: user },
      };

      let responseData = null;

      try {
        responseData = await axios(options);
      } catch (error) {
        console.log(error);
      }

      setState({
        ...state,
        showResult: true,
        apiMessage: responseData.data,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }
  };

  return (
    <Fragment>
      <h2>Access an External API</h2>
      <p className="lead">Node Express API Protected by Auth0</p>
      <Container className="cards">
        <Row lg="2">
          <Col xs="12">
            <Card className="display-card" color="light">
              <CardBody>
                <CardTitle tag="h5">API Access</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {isAuthenticated
                    ? "Access the external API by clicking the button below."
                    : "Login to access the external API."}
                </CardSubtitle>
                <CardText>
                  Use this feature to make calls to an external API using a
                  bearer token.
                </CardText>
                <Button
                  color="warning"
                  onClick={callApi}
                  disabled={!audience || !isAuthenticated}
                >
                  Ping API
                </Button>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12">
            {state.showResult && (
              <Card className="display-card" color="warning">
                <CardHeader>API Call Result</CardHeader>
                <p>
                  <span className="bold-text">Username:</span>{" "}
                  {state.apiMessage.name}
                </p>
                <p>
                  <span className="bold-text">Email:</span>{" "}
                  {state.apiMessage.email}
                </p>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ExternalApiComponent;
