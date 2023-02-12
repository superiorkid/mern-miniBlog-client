import React, { FC, ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
  children: ReactElement;
}

const PublicRoute: FC<Props> = ({ children }) => {
  const location = useLocation();
  const auth = localStorage.getItem("token");

  if (auth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PublicRoute;
