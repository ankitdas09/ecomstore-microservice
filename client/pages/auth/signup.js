import React, { useState } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: function () {
      Router.push("/");
    },
  });

  async function onSubmit(e) {
    e.preventDefault();
    await doRequest();
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        <div className="form-group">
          <label>Email Address</label>
          <input
            className="form-control"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {errors}
        <button className="btn btn-primary my-2">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
