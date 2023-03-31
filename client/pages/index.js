import React from "react";
import buildClient from "../api/build-client";

const LandingProps = ({ currentUser }) => {
  return (
    <div>
      {currentUser ? (
        <h1>You are signed in</h1>
      ) : (
        <h1>You are not signed in</h1>
      )}
    </div>
  );
};

LandingProps.getInitialProps = async function (context) {
  try {
    const client = buildClient(context);
    const { data } = await client.get("/api/users/currentUser");
    return data;
  } catch (error) {
    return null;
  }
};

export default LandingProps;
