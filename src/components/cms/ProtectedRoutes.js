import { Navigate, Outlet } from "react-router-dom";
import { CMSContext } from "./CMS";
import { useContext } from "react";


const useAuth = () => {
  const authContext = useContext(CMSContext)
  return authContext.auth.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/admin/" />;
};

export default ProtectedRoutes;
