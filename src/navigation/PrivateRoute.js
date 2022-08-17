import { AuthContext } from "context/AuthProvider";
import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
