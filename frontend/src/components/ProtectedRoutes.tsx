import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ children }) => {
  const userDetails = useAppSelector(userSelector);

  const isLoggedIn = userDetails.loggedIn;

  if (!isLoggedIn) {
    return <Navigate to="/sign-in" />;
  }
  return <>{children}</>;
};

export default ProtectedRoutes;
