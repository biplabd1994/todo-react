import React, { useEffect, useState } from "react";
import { getAuthTokens } from "../../libraries/auth";
import { useNavigate } from "react-router-dom";
import { getAuthUserService } from "../../services/auth.service.js";
import Header from "../include/header";

const WithAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {
    const accessToken = getAuthTokens();
    console.log("accessToken", accessToken);
    const navigate = useNavigate();

    useEffect(() => {
      if (!accessToken) {
        navigate("/");
      } else {
        getAuthUser();
      }
    }, []);

    const getAuthUser = async () => {
      const response = await getAuthUserService();
      //   console.log("response", response);
      if (response.status === 200) {
        const user = response.data.data;
      }
    };

    return (
      <>
        <Header />
        <WrappedComponent {...props} />
      </>
    );
  };

  return WithAuthComponent;
};

export default WithAuth;
