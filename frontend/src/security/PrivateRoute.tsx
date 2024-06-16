import Spinner from "@src/components/shared/Spinner";
import React, { Suspense, ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
};

export default PrivateRoute;
