import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If user exists, render the children (protected routes)
  // Else redirect to login with 'replace' to avoid back-navigation to protected page
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
