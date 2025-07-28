import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import React from "react";

const AccessDenied = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        textAlign: "center",
        color: "#b00020",
        backgroundColor: "#ffebee",
        padding: "20px",
        borderRadius: "8px",
        margin: "40px auto",
        maxWidth: "400px",
        boxShadow: "0 4px 8px rgba(176, 0, 32, 0.2)",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "12px" }}>
        🚫 Access Denied
      </h1>
      <p style={{ fontSize: "1.2rem" }}>
        You do not have permission to view this page.
      </p>
    </div>
  );
};

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") ? true : false;
  const { accountType } = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : {};

  if (!isLoggedIn) {
    return <Navigate to="/login" replace></Navigate>;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(accountType)) {
    return <AccessDenied></AccessDenied>;
  }

  return children;
};

export default ProtectedRoute;
