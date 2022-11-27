import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { getConfig } from "../config";
import Loading from "./Loading";

const Login = () => {
  const {
    user,
    isAuthenticated,
    logout,
    loginWithRedirect,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const [state, setState] = useState({
    userInfo: null,
    error: null,
  });

  const createOrGetUser = async () => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        method: "POST",
        url: `${apiOrigin}/api/user`,
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
        userInfo: responseData.data,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
      console.log(error);
    }
  };

  // const getUser = async () => {
  //   try {
  //     const token = await getAccessTokenSilently();
  //     const options = {
  //       method: "GET",
  //       url: `${apiOrigin}/api/user/${user.email}`,
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //       contentType: "application/json",
  //     };
  //     let responseData = null;

  //     try {
  //       responseData = await axios(options);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setState({
  //       ...state,
  //       userInfo: responseData.data,
  //     });
  //   } catch (error) {
  //     setState({
  //       ...state,
  //       error: error.error,
  //     });
  //     console.log(error);
  //   }
  // };

  // Load user info from database on login
  useEffect(() => {
    if (isAuthenticated) {
      createOrGetUser();
    }
    //eslint-disable-next-line
  }, [isAuthenticated]);

  const { apiOrigin } = getConfig();

  if (isLoading) {
    return <Loading />;
  }

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <div>
      <h2>Login Functionality</h2>
      <p className="lead">Authentication by Auth0</p>
      {!isAuthenticated && (
        <div>
          <h6>Login to load user profile</h6>
          <Button color="dark" onClick={() => loginWithRedirect()}>
            Login
          </Button>
        </div>
      )}
      {isAuthenticated && (
        <div>
          <h6>Welcome {user.name}!</h6>
          <img src={user.picture} alt={user.name} className="profile" />
          <p>{user.email}</p>
        </div>
      )}
      {isAuthenticated && (
        <Button color="dark" onClick={() => logoutWithRedirect()}>
          Logout
        </Button>
      )}
    </div>
  );
};

export default Login;
