import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoutes = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/validation" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
