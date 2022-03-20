import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Vehicle 
        LandingPage
      </h1>
      <Button href="/login" variant="contained" color="success">
        <Link href="/login"></Link>
        Sign in
      </Button>
    </div>
  );
};

export default LandingPage;
