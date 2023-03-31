import React, { useState, useEffect } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

const SignOut = () => {
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: function () {
      Router.push("/");
    },
  });
  useEffect(() => {
    doRequest();
  }, []);

  return <div className="container">Signing you out...</div>;
};

export default SignOut;
