import { FC, ReactElement } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

interface Props {
  children: ReactElement;
}

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    return null;
  }
};

const ProtectedRoute: FC<Props> = ({ children }) => {
  const location = useLocation();
  const authToken = localStorage.getItem("token");
  const toast = useToast();

  if (!authToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const decodedJwt = parseJwt(authToken);
  if (decodedJwt.exp * 1000 < Date.now()) {
    toast({
      title: "Yout session is expired. login again..",
      status: "warning",
      isClosable: true,
      duration: 5000,
      position: "bottom-right",
    });
    localStorage.removeItem("token");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
