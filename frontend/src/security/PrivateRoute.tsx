import Spinner from "@src/components/shared/Spinner";
import { useAuth } from "@src/hooks";
import { RootState } from "@src/store/store";
import React, { Suspense, ReactNode } from "react";
import { useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const navigate: NavigateFunction = useNavigate();

  // loader status
  const loader = useSelector((state: RootState) => state.siteConfig.loader);

  // token
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
  }

  // check login
  useAuth();

  console.log('loaderloaderloader', loader);

  return (
    <>
      {loader ? (
        <Spinner />
      ) : (
        <Suspense fallback={<Spinner />}>{children}</Suspense>
      )}
    </>
  );
};

export default PrivateRoute;
